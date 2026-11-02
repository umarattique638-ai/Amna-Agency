"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiError, useLogoutAllMutation, useRevokeSessionMutation, useSessionsQuery } from "@/store/api";
import { useAppDispatch, useCurrentUser } from "@/store/hooks";
import { loggedOut } from "@/store/authSlice";
import { Badge, Btn, Card, PageHeader, Skeleton } from "@/components/dashboard/controls";
import { useConfirm, useToast } from "@/components/dashboard/feedback";
import type { SessionDTO } from "@/types/api";

function device(ua: string) {
  const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Browser";
  const os = /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "Unknown OS";
  return `${browser} on ${os}`;
}

export default function AccountPage() {
  const router = useRouter();
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const sessions = useSessionsQuery();
  const [revokeSession] = useRevokeSessionMutation();
  const [logoutAllRequest] = useLogoutAllMutation();
  const toast = useToast();
  const confirm = useConfirm();
  const [busy, setBusy] = useState(false);

  const revoke = async (s: SessionDTO) => {
    try {
      await revokeSession(s.id).unwrap();
      toast("Device signed out");
    } catch (e) {
      toast(apiError(e).message, "error");
    }
  };

  const logoutAll = async () => {
    if (!(await confirm({ title: "Sign out everywhere?", text: "Every device, including this one, will need to log in again.", confirmLabel: "Sign out all" }))) return;
    setBusy(true);
    await logoutAllRequest().unwrap().catch(() => null);
    dispatch(loggedOut());
    router.replace("/login");
    router.refresh();
  };

  return (
    <>
      <PageHeader title="Account & security" description="Your profile and the devices signed in to this dashboard." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          {!user ? (
            <Skeleton className="h-32" />
          ) : (
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-accent text-xl font-bold text-white">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-mute">{user.email}</p>
                <div className="mt-2"><Badge value={user.role} /></div>
              </div>
            </div>
          )}
          <div className="mt-6 rounded-xl bg-surface p-4 text-sm text-mute">
            <p className="font-semibold text-fg">How your session is protected</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Short-lived access token (15 min) in an httpOnly cookie</li>
              <li>Refresh token rotates on every use; reuse ends the session</li>
              <li>Logging out blacklists the token immediately</li>
            </ul>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-semibold">Active sessions</p>
            <Btn variant="danger" onClick={logoutAll} loading={busy}>Sign out all devices</Btn>
          </div>
          {sessions.isLoading ? (
            <Skeleton className="h-40" />
          ) : (
            <ul className="divide-y divide-line">
              {sessions.data?.sessions.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">
                      {device(s.userAgent)} {s.current && <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">This device</span>}
                    </p>
                    <p className="text-xs text-mute">IP {s.ip} · last active {s.lastUsedAt ? new Date(s.lastUsedAt).toLocaleString() : "—"}</p>
                  </div>
                  {!s.current && <button onClick={() => revoke(s)} className="text-xs font-semibold text-red-600">Sign out</button>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
