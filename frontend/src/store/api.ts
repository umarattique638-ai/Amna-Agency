import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { DashboardStats, LeadDTO, Paginated, PostDTO, ServiceDTO, SessionDTO, UploadedImage, UserDTO } from "@/types/api";
import type { PostInput } from "@/lib/validations/post";
import type { ServiceInput } from "@/lib/validations/service";
import type { LoginInput, RegisterInput } from "@/lib/validations/auth";
import { loggedOut, setUser } from "./authSlice";

/** Same-origin `/api/*` is proxied by Next.js to the Express backend (cookies included). */
const rawBaseQuery = fetchBaseQuery({ baseUrl: "/api", credentials: "same-origin" });

/** Unwraps the `{ success, data }` envelope returned by the API. */
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
  const result = await rawBaseQuery(args, api, extra);
  if (result.data && typeof result.data === "object" && "data" in result.data) {
    return { ...result, data: (result.data as { data: unknown }).data };
  }
  return result;
};

/**
 * On 401: refresh the session once (concurrent requests share the same refresh call),
 * then retry. If refreshing fails, the user is logged out client-side.
 */
let refreshing: Promise<boolean> | null = null;
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  const url = typeof args === "string" ? args : args.url;
  if (result.error?.status === 401 && !url.startsWith("/auth/")) {
    refreshing ??= Promise.resolve(baseQuery({ url: "/auth/refresh", method: "POST" }, api, extra))
      .then((r) => {
        if (r.data) api.dispatch(setUser((r.data as { user: UserDTO }).user));
        return !r.error;
      })
      .finally(() => setTimeout(() => (refreshing = null), 0));
    if (await refreshing) result = await baseQuery(args, api, extra);
    else {
      api.dispatch(loggedOut());
      // hard navigation on purpose: clears all client state after the session ends
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      if (typeof window !== "undefined") window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "Service", "Lead", "Stats", "Session", "Me"],
  endpoints: (b) => ({
    /* ── auth ── */
    login: b.mutation<{ user: UserDTO }, LoginInput>({ query: (body) => ({ url: "/auth/login", method: "POST", body }) }),
    register: b.mutation<{ email: string; message: string; devVerifyUrl?: string }, RegisterInput>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    verifyEmail: b.mutation<{ user: UserDTO }, string>({ query: (token) => ({ url: "/auth/verify-email", method: "POST", body: { token } }) }),
    resendVerification: b.mutation<{ message: string; devVerifyUrl?: string }, string>({
      query: (email) => ({ url: "/auth/resend-verification", method: "POST", body: { email } }),
    }),
    logout: b.mutation<void, void>({ query: () => ({ url: "/auth/logout", method: "POST" }) }),
    logoutAll: b.mutation<{ revoked: number }, void>({ query: () => ({ url: "/auth/logout-all", method: "POST" }) }),
    me: b.query<{ user: UserDTO }, void>({ query: () => "/auth/me", providesTags: ["Me"] }),
    sessions: b.query<{ sessions: SessionDTO[] }, void>({ query: () => "/auth/sessions", providesTags: ["Session"] }),
    revokeSession: b.mutation<void, string>({ query: (id) => ({ url: `/auth/sessions/${id}`, method: "DELETE" }), invalidatesTags: ["Session"] }),

    /* ── dashboard ── */
    stats: b.query<DashboardStats, void>({ query: () => "/dashboard/stats", providesTags: ["Stats"] }),
    /* ── uploads (Cloudinary) ── */
    uploadImage: b.mutation<{ image: UploadedImage }, { file: File; folder: "posts" | "services" | "misc" }>({
      query: ({ file, folder }) => {
        const body = new FormData();
        body.append("image", file);
        return { url: `/uploads/image?folder=${folder}`, method: "POST", body };
      },
    }),
    seed: b.mutation<{ posts: number; services: number }, void>({
      query: () => ({ url: "/dashboard/seed", method: "POST" }),
      invalidatesTags: ["Stats", "Post", "Service"],
    }),

    /* ── posts ── */
    posts: b.query<Paginated<PostDTO>, void>({
      query: () => "/posts?scope=all&limit=100",
      providesTags: (r) => [...(r?.items.map((p) => ({ type: "Post" as const, id: p.id })) ?? []), { type: "Post", id: "LIST" }],
    }),
    post: b.query<{ post: PostDTO }, string>({ query: (id) => `/posts/${id}`, providesTags: (_r, _e, id) => [{ type: "Post", id }] }),
    createPost: b.mutation<{ post: PostDTO }, PostInput>({
      query: (body) => ({ url: "/posts", method: "POST", body }),
      invalidatesTags: [{ type: "Post", id: "LIST" }, "Stats"],
    }),
    updatePost: b.mutation<{ post: PostDTO }, { id: string; body: Partial<PostInput> }>({
      query: ({ id, body }) => ({ url: `/posts/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Post", id }, { type: "Post", id: "LIST" }, "Stats"],
    }),
    deletePost: b.mutation<void, string>({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Post", id: "LIST" }, "Stats"],
    }),

    /* ── services ── */
    services: b.query<{ services: ServiceDTO[] }, void>({
      query: () => "/services?scope=all",
      providesTags: (r) => [...(r?.services.map((s) => ({ type: "Service" as const, id: s.id })) ?? []), { type: "Service", id: "LIST" }],
    }),
    service: b.query<{ service: ServiceDTO }, string>({ query: (id) => `/services/${id}`, providesTags: (_r, _e, id) => [{ type: "Service", id }] }),
    createService: b.mutation<{ service: ServiceDTO }, ServiceInput>({
      query: (body) => ({ url: "/services", method: "POST", body }),
      invalidatesTags: [{ type: "Service", id: "LIST" }, "Stats"],
    }),
    updateService: b.mutation<{ service: ServiceDTO }, { id: string; body: Partial<ServiceInput> }>({
      query: ({ id, body }) => ({ url: `/services/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Service", id }, { type: "Service", id: "LIST" }],
    }),
    deleteService: b.mutation<void, string>({
      query: (id) => ({ url: `/services/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Service", id: "LIST" }, "Stats"],
    }),

    /* ── leads ── */
    leads: b.query<{ leads: LeadDTO[] }, string | void>({
      query: (status) => (status ? `/leads?status=${status}` : "/leads"),
      providesTags: ["Lead"],
    }),
    updateLead: b.mutation<{ lead: LeadDTO }, { id: string; status: LeadDTO["status"] }>({
      query: ({ id, status }) => ({ url: `/leads/${id}`, method: "PATCH", body: { status } }),
      invalidatesTags: ["Lead", "Stats"],
    }),
    deleteLead: b.mutation<void, string>({ query: (id) => ({ url: `/leads/${id}`, method: "DELETE" }), invalidatesTags: ["Lead", "Stats"] }),
  }),
});

export const {
  useLoginMutation, useRegisterMutation, useVerifyEmailMutation, useResendVerificationMutation, useLogoutMutation, useLogoutAllMutation, useMeQuery, useSessionsQuery, useRevokeSessionMutation,
  useStatsQuery, useSeedMutation, useUploadImageMutation,
  usePostsQuery, usePostQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation,
  useServicesQuery, useServiceQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation,
  useLeadsQuery, useUpdateLeadMutation, useDeleteLeadMutation,
} = api;

/** Pull a readable message + field errors out of an RTK Query error. */
export function apiError(err: unknown): { message: string; code?: string; fields: Record<string, string> } {
  const e = err as { data?: { error?: { code?: string; message?: string; details?: Record<string, string[] | undefined> } }; error?: string };
  const details = e?.data?.error?.details ?? {};
  return {
    code: e?.data?.error?.code,
    message: e?.data?.error?.message ?? e?.error ?? "Something went wrong",
    fields: Object.fromEntries(Object.entries(details).map(([k, v]) => [k, v?.[0] ?? ""])),
  };
}
