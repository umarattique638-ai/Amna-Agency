"use client";

import { useState } from "react";
import { apiError, useDeleteLeadMutation, useLeadsQuery, useUpdateLeadMutation } from "@/store/api";
import { Badge, EmptyState, PageHeader, Select, Skeleton } from "@/components/dashboard/controls";
import { useConfirm, useToast } from "@/components/dashboard/feedback";
import type { LeadDTO } from "@/types/api";

const STATUSES = ["new", "contacted", "won", "lost"] as const;

export default function LeadsPage() {
  const [filter, setFilter] = useState("");
  const { data, isLoading: loading } = useLeadsQuery(filter || undefined);
  const [updateLead] = useUpdateLeadMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const [open, setOpen] = useState<string | null>(null);
  const toast = useToast();
  const confirm = useConfirm();

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

  return (
    <>
      <PageHeader
        title="Leads"
        description="Every enquiry sent through the website contact form."
        actions={
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter leads" className="w-44">
            <option value="">All leads</option>
            {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
          </Select>
        }
      />
      {loading ? (
        <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20" />)}</div>
      ) : !data?.leads.length ? (
        <EmptyState title="No leads yet" text="When someone fills in the contact form, their message shows up here." />
      ) : (
        <ul className="space-y-3">
          {data.leads.map((l) => (
            <li key={l.id} className="rounded-2xl border border-line bg-page p-5">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <button className="min-w-0 text-left" onClick={() => setOpen(open === l.id ? null : l.id)} aria-expanded={open === l.id}>
                  <p className="font-semibold">{l.name} {l.company && <span className="font-normal text-mute">· {l.company}</span>}</p>
                  <p className="text-sm text-mute">{l.email} · {l.createdAt ? new Date(l.createdAt).toLocaleString() : ""}</p>
                </button>
                <div className="flex items-center gap-3">
                  <Badge value={l.status} />
                  <Select value={l.status} onChange={(e) => update(l, e.target.value)} aria-label="Change status" className="w-36 py-1.5">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  <button onClick={() => remove(l)} className="text-xs font-semibold text-red-600">Delete</button>
                </div>
              </div>
              {open === l.id && (
                <div className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
                  <p className="whitespace-pre-wrap">{l.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {l.services.map((s) => <span key={s} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{s}</span>)}
                    {l.budget && <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold">Budget: {l.budget}</span>}
                  </div>
                  <a href={`mailto:${l.email}`} className="inline-block font-semibold text-accent">Reply by email →</a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
