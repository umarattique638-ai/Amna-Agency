"use client";

import { toast } from "@/lib/toast";
import { useState } from "react";

/** Small newsletter sign-up (UI only — connect to Mailchimp/Brevo etc. in onSubmit). */
export function NewsletterForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        toast.success("You're subscribed!", "Monthly marketing tips are on their way.");
      }}
      className="space-y-2"
    >
      <label htmlFor="newsletter" className="text-xs text-white/50">
        Monthly marketing tips
      </label>
      <div className="flex overflow-hidden rounded-xl border border-white/15 focus-within:border-white/50">
        <input
          id="newsletter"
          type="email"
          required
          placeholder="Your email"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/35"
        />
        <button type="submit" className="bg-accent px-4 text-sm font-semibold transition-colors hover:bg-accent-deep">
          Join
        </button>
      </div>
      {sent && <p role="status" className="text-xs text-emerald-300">Thanks — you&apos;re subscribed!</p>}
    </form>
  );
}
