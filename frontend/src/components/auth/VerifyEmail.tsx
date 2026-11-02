"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { apiError, useVerifyEmailMutation } from "@/store/api";

/** Landing page for the emailed link: verifies the token, signs the user in, goes to the dashboard. */
export function VerifyEmail() {
  const token = useSearchParams().get("token") ?? "";
  const router = useRouter();
  const [verify] = useVerifyEmailMutation();
  const [state, setState] = useState<{ status: "loading" | "ok" | "error"; message?: string }>({ status: "loading" });
  const ran = useRef(false); // tokens are single-use: never call twice (StrictMode double effects)

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    if (!token) {
      setState({ status: "error", message: "This link is missing its token." }); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    verify(token)
      .unwrap()
      .then(() => {
        setState({ status: "ok" });
        setTimeout(() => {
          router.replace("/dashboard");
          router.refresh();
        }, 1200);
      })
      .catch((e) => setState({ status: "error", message: apiError(e).message }));
  }, [token, verify, router]);

  return (
    <div className="text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-3xl">
        {state.status === "loading" ? <span className="size-6 animate-spin rounded-full border-2 border-accent border-t-transparent" /> : state.status === "ok" ? "✓" : "!"}
      </span>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight">
        {state.status === "loading" ? "Verifying your email…" : state.status === "ok" ? "Email verified!" : "We couldn't verify that link"}
      </h1>
      <p className="mt-2 text-mute">
        {state.status === "ok" ? "Your account is active. Taking you to the dashboard…" : state.message ?? "One moment please."}
      </p>
      {state.status === "error" && (
        <p className="mt-6 text-sm">
          <Link href="/login" className="font-semibold text-accent">Sign in to request a new link →</Link>
        </p>
      )}
    </div>
  );
}
