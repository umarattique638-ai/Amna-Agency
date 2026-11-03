"use client";

import { toast } from "@/lib/toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { apiError, useLoginMutation, useRegisterMutation, useResendVerificationMutation } from "@/store/api";
import { Btn, FieldWrap, Input } from "@/components/dashboard/controls";

type Mode = "login" | "register";
type Errors = Partial<Record<"name" | "email" | "password", string>>;

/** "Check your inbox" screen with a resend button (also used when login hits an unverified account). */
function CheckInbox({ email, devUrl }: { email: string; devUrl?: string }) {
  const [resend, { isLoading, isSuccess }] = useResendVerificationMutation();
  const [link, setLink] = useState(devUrl);
  return (
    <div className="text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-3xl">✉</span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Check your inbox</h1>
      <p className="mt-2 text-mute">
        We sent a verification link to <b className="text-fg">{email}</b>. Click it to activate your account — the link expires in 24 hours.
      </p>
      <Btn
        variant="secondary"
        className="mt-6"
        loading={isLoading}
        onClick={async () => {
          const r = await resend(email).unwrap().catch(() => null);
          if (r?.devVerifyUrl) setLink(r.devVerifyUrl);
        }}
      >
        {isSuccess ? "Sent again ✓" : "Resend link"}
      </Btn>
      {link && (
        <p className="mt-6 rounded-xl border border-dashed border-line bg-surface p-3 text-left text-xs text-mute">
          <b className="text-fg">Development mode:</b> email isn&apos;t configured yet (SMTP), so here is your link:{" "}
          <a href={link} className="break-all font-semibold text-accent">{link}</a>
        </p>
      )}
      <p className="mt-6 text-sm text-mute">
        Already verified? <Link href="/login" className="font-semibold text-accent">Sign in</Link>
      </p>
    </div>
  );
}

/** Login / register. Tokens arrive as httpOnly cookies — nothing sensitive is stored in JS. */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next")?.startsWith("/") ? params.get("next")! : "/dashboard";
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pending, setPending] = useState<{ email: string; devUrl?: string } | null>(null);
  const [login, loginState] = useLoginMutation();
  const [register, registerState] = useRegisterMutation();
  const loading = loginState.isLoading || registerState.isLoading;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = (mode === "login" ? loginSchema : registerSchema).safeParse(values);
    if (!parsed.success) {
      const fe = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])));
      toast.error("Please check the highlighted fields");
      return;
    }
    setErrors({});
    try {
      if (mode === "register") {
        const r = await register(parsed.data as z.infer<typeof registerSchema>).unwrap();
        setPending({ email: r.email, devUrl: r.devVerifyUrl });
        toast.success("Account created", `We sent a verification link to ${r.email}.`);
        return;
      }
      const { user } = await login(parsed.data).unwrap();
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      router.replace(next);
      router.refresh();
    } catch (err) {
      const { message: msg, code, fields } = apiError(err);
      if (code === "EMAIL_NOT_VERIFIED") {
        toast.info("Please verify your email first", "Check your inbox for the verification link.");
        return setPending({ email: parsed.data.email });
      }
      setErrors(fields);
      setMessage(msg);
      toast.error(mode === "login" ? "Sign in failed" : "Sign up failed", msg);
    }
  }

  if (pending) return <CheckInbox email={pending.email} devUrl={pending.devUrl} />;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-mute">
          {mode === "login" ? "Sign in to manage your website content." : "We'll email you a link to verify your address."}
        </p>
      </div>

      {params.get("verified") === "expired" && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Your verification link expired. Sign in to get a new one.
        </p>
      )}
      {message && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>}

      {mode === "register" && (
        <FieldWrap label="Full name" htmlFor="name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
        </FieldWrap>
      )}
      <FieldWrap label="Email" htmlFor="email" error={errors.email}>
        <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
      </FieldWrap>
      <FieldWrap label="Password" htmlFor="password" error={errors.password} hint={mode === "register" ? "8+ characters with upper, lower case and a number" : undefined}>
        <div className="relative">
          <Input id="password" name="password" type={showPw ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} aria-invalid={!!errors.password} className="pr-16" />
          <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute inset-y-0 right-3 text-xs font-semibold text-accent">
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
      </FieldWrap>

      <Btn type="submit" loading={loading} className="w-full rounded-full py-3">
        {mode === "login" ? "Sign in" : "Create account"}
      </Btn>

      <p className="text-center text-sm text-mute">
        {mode === "login" ? (
          <>New here? <Link href="/register" className="font-semibold text-accent">Create an account</Link></>
        ) : (
          <>Already have an account? <Link href="/login" className="font-semibold text-accent">Sign in</Link></>
        )}
      </p>
    </form>
  );
}
