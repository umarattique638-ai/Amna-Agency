"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  contactSchema,
  type ContactErrors,
} from "@/lib/validations/contact";
import { PillGroup, TextAreaField, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";
type Service = (typeof SERVICE_OPTIONS)[number];
type Budget = (typeof BUDGET_OPTIONS)[number];

export function ContactForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [services, setServices] = useState<Service[]>([]);
  const [budget, setBudget] = useState<Budget[]>([]);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      message: fd.get("message"),
      website: fd.get("website"),
      services,
      budget: budget[0],
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0]])) as ContactErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as { success: boolean; error?: { message?: string } };
      if (!res.ok || !json.success) throw new Error(json.error?.message ?? "Something went wrong");
      setStatus("success");
      setMessage("Thank you — we'll reply within one business day.");
      form.reset();
      setServices([]);
      setBudget([]);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <div className="grid gap-10 sm:grid-cols-2">
        <TextField id="name" name="name" label="Your name" placeholder="Jane Doe" autoComplete="name" error={errors.name} />
        <TextField id="email" name="email" type="email" label="Email" placeholder="jane@company.com" autoComplete="email" defaultValue={defaultEmail} error={errors.email} />
      </div>
      <TextField id="company" name="company" label="Company (optional)" placeholder="Company Ltd." autoComplete="organization" />

      <PillGroup legend="I'm interested in" name="services" multiple options={SERVICE_OPTIONS} value={services} onChange={setServices} error={errors.services} />
      <PillGroup legend="Budget" name="budget" options={BUDGET_OPTIONS} value={budget} onChange={setBudget} error={errors.budget} />

      <TextAreaField id="message" name="message" label="Tell us about the project" placeholder="Goals, timeline, links…" error={errors.message} />

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry ↗"}
        </Button>
        <p role="status" aria-live="polite" className={status === "error" ? "text-sm text-red-600" : "text-sm text-fg/70"}>
          {message}
        </p>
      </div>
    </form>
  );
}
