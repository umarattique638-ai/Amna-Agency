"use client";

import { useMemo, useState } from "react";
import { apiError, useDeleteLeadMutation, useLeadsQuery, useUpdateLeadMutation } from "@/store/api";
import { Badge, EmptyState, Input, PageHeader, Select, Skeleton } from "@/components/dashboard/controls";
import { useConfirm, useToast } from "@/components/dashboard/feedback";
import { cn } from "@/lib/utils";
import type { LeadDTO } from "@/types/api";

const STATUSES = ["new", "contacted", "won", "lost"] as const;

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "";

const waLink = (phone: string) => `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

/** Every contact-form enquiry with ALL submitted details visible at a glance. */
export default function LeadsPage() {
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");
  const { data, isLoading: loading } = useLeadsQuery(filter || undefined);
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const toast = useToast();
  const confirm = useConfirm();

  const leads = useMemo(() => {
    const term = q.trim().toLowerCase();
    const all = data?.leads ?? [];
    if (!term) return all;
    return all.filter((l) => [l.name, l.email, l.phone, l.company, l.message, ...l.services].join(" ").toLowerCase().includes(term));
  }, [data, q]);

  const update = async (lead: LeadDTO, status: string) => {
    try {
      await updateLead({ id: lead.id, status: status as LeadDTO["status"] }).unwrap();
      toast("Status updated");
    } catch (e) {
      toast(apiError(e).message, "error");
    }
  };

  const remove = async (lead: LeadDTO) => {
    if (!(await confirm({ title: "Delete this lead?", text: `The enquiry from ${lead.name} will be removed.` }))) return;
    try {
      await deleteLead(lead.id).unwrap();
      toast("Lead deleted");
    } catch (e) {
      toast(apiError(e).message, "error");
    }
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied");
    } catch {
      toast("Could not copy", "error");
    }
  };

  return (
    <>
      <PageHeader
        title="Leads"
        description={`Every enquiry sent through the website contact form${data ? ` · ${data.leads.length} total` : ""}.`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, service…" aria-label="Search leads" className="w-60" />
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter leads" className="w-40">
              <option value="">All leads</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </Select>
          </div>
        }
      />

      {loading ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-48" />)}</div>
      ) : !leads.length ? (
        <EmptyState
          title={q || filter ? "No matching leads" : "No leads yet"}
          text={q || filter ? "Try a different search or filter." : "When someone fills in the contact form, every detail they enter shows up here."}
        />
      ) : (
        <ul className="space-y-4">
          {leads.map((l) => (
            <li key={l.id} className={cn("overflow-hidden rounded-2xl border bg-page", l.status === "new" ? "border-accent/50 shadow-[0_12px_30px_-20px_rgba(43,124,255,0.6)]" : "border-line")}>
              {/* header */}
              <div className="flex flex-col gap-3 border-b border-line bg-surface/60 px-5 py-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1b6fff] to-[#3b89ff] font-bold text-white">
                    {l.name.trim()[0]?.toUpperCase() ?? "?"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[16px] font-bold">
                      {l.name}
                      {l.company && <span className="font-normal text-mute"> · {l.company}</span>}
                    </p>
                    <p className="text-xs text-mute">Received {fmtDate(l.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Badge value={l.status} />
                  <Select value={l.status} onChange={(e) => update(l, e.target.value)} aria-label={`Change status for ${l.name}`} className="w-36 py-1.5">
                    {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </Select>
                  <button onClick={() => remove(l)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </div>

              {/* every field from the form */}
              <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                <dl className="grid content-start gap-3 text-sm sm:grid-cols-[110px_1fr]">
                  <dt className="text-mute">Email</dt>
                  <dd className="flex flex-wrap items-center gap-2 break-all">
                    <a href={`mailto:${l.email}`} className="font-semibold text-accent hover:underline">{l.email}</a>
                    <button onClick={() => copy(l.email)} className="text-xs text-mute hover:text-fg">Copy</button>
                  </dd>

                  <dt className="text-mute">Phone</dt>
                  <dd className="flex flex-wrap items-center gap-2">
                    {l.phone ? (
                      <>
                        <a href={`tel:${l.phone}`} className="font-semibold hover:text-accent">{l.phone}</a>
                        <a href={waLink(l.phone)} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">WhatsApp</a>
                      </>
                    ) : (
                      <span className="text-mute">—</span>
                    )}
                  </dd>

                  <dt className="text-mute">Company</dt>
                  <dd>{l.company || <span className="text-mute">—</span>}</dd>

                  <dt className="text-mute">Budget</dt>
                  <dd>{l.budget ? <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold">{l.budget}</span> : <span className="text-mute">—</span>}</dd>

                  <dt className="text-mute">Services</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {l.services.length ? l.services.map((s) => <span key={s} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{s}</span>) : <span className="text-mute">—</span>}
                  </dd>
                </dl>

                <div className="flex flex-col">
                  <p className="text-sm text-mute">Message</p>
                  <p className="mt-2 flex-1 rounded-xl bg-surface-2 p-4 text-[14.5px] leading-relaxed whitespace-pre-wrap">{l.message}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${l.email}?subject=${encodeURIComponent("Re: your enquiry — Axiom Digital Studio")}`}
                      className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-white hover:bg-accent-deep"
                    >
                      Reply by email
                    </a>
                    {l.phone && (
                      <a href={waLink(l.phone)} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700">
                        Reply on WhatsApp
                      </a>
                    )}
                    {l.status === "new" && (
                      <button onClick={() => update(l, "contacted")} className="rounded-full border border-line px-4 py-2 text-xs font-semibold hover:border-accent hover:text-accent">
                        Mark as contacted
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
