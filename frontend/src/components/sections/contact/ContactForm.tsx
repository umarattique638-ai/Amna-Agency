"use client";

import { toast } from "@/lib/toast";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  formatBudget,
  SERVICE_OPTIONS,
  contactSchema,
  type ContactErrors,
} from "@/lib/validations/contact";
import { PillGroup, TextAreaField, TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { LineIcon } from "@/components/ui/LineIcon";
import { BudgetSlider } from "./BudgetSlider";

type Status = "idle" | "submitting" | "success" | "error";
type Service = (typeof SERVICE_OPTIONS)[number];

export function ContactForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [services, setServices] = useState<Service[]>([]);
  const [budget, setBudget] = useState(300);
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
      phone: fd.get("phone"),
      company: fd.get("company"),
      message: fd.get("message"),
      website: fd.get("website"),
      services,
      budget: formatBudget(budget),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0]])) as ContactErrors);
      toast.error("Please check the form", "A few fields need your attention.");
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
      // a misconfigured proxy returns HTML/text, not JSON — show a friendly message instead of a parse error
      const json = (await res.json().catch(() => null)) as { success: boolean; error?: { message?: string } } | null;
      if (!json) throw new Error("Our server is not reachable right now. Please email or WhatsApp us instead.");
      if (!res.ok || !json.success) throw new Error(json.error?.message ?? "Something went wrong");
      setStatus("success");
      toast.success("Enquiry sent!", "Thank you — we'll reply within one business day.");
      setMessage("Thank you — we'll reply within one business day.");
      form.reset();
      setServices([]);
      setBudget(300);
    } catch (err) {
      setStatus("error");
      toast.error("Couldn't send your enquiry", err instanceof Error ? err.message : undefined);
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="name" name="name" label="Your name *" placeholder="Jane Doe" autoComplete="name" error={errors.name} icon={<LineIcon name="user" className="size-[18px]" />} />
        <TextField id="email" name="email" type="email" label="Email *" placeholder="jane@company.com" autoComplete="email" defaultValue={defaultEmail} error={errors.email} icon={<LineIcon name="mail" className="size-[18px]" />} />
        <TextField id="phone" name="phone" type="tel" label="Phone / WhatsApp" placeholder="+92 300 1234567" autoComplete="tel" error={errors.phone} icon={<LineIcon name="phone" className="size-[18px]" />} />
        <TextField id="company" name="company" label="Company" placeholder="Company Ltd." autoComplete="organization" icon={<LineIcon name="building" className="size-[18px]" />} />
      </div>

      <PillGroup legend="I'm interested in *" name="services" multiple options={SERVICE_OPTIONS} value={services} onChange={setServices} error={errors.services} />

      <div className="grid gap-5 md:grid-cols-[1fr_1.25fr] md:items-start">
        <div className="rounded-2xl border border-line bg-surface/60 px-4 pt-3.5 pb-3">
          <BudgetSlider value={budget} onChange={setBudget} error={errors.budget} />
        </div>
        <TextAreaField id="message" name="message" label="Tell us about the project *" placeholder="Goals, timeline, links…" rows={4} error={errors.message} />
      </div>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="min-w-52">
          {status === "submitting" ? (
            <>
              <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending…
            </>
          ) : (
            "Send enquiry ↗"
          )}
        </Button>
        <p role="status" aria-live="polite" className={status === "error" ? "text-sm text-red-600" : "text-sm text-fg/70"}>
          {message}
        </p>
      </div>
    </form>
  );
}
