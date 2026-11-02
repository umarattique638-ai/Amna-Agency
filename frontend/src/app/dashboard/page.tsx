"use client";

import Link from "next/link";
import { apiError, useSeedMutation, useStatsQuery } from "@/store/api";
import { Badge, Btn, Card, PageHeader, Skeleton } from "@/components/dashboard/controls";
import { useToast } from "@/components/dashboard/feedback";

export default function OverviewPage() {
  const { data, isLoading: loading } = useStatsQuery();
  const toast = useToast();
  const [runSeed, { isLoading: seeding }] = useSeedMutation();

  const seed = async () => {
    try {
      const r = await runSeed().unwrap();
      toast(`Imported ${r.posts} posts and ${r.services} services`);
    } catch (e) {
      toast(apiError(e).message, "error");
    }
  };

  const cards = [
    { label: "Published posts", value: data?.posts.published, sub: `${data?.posts.drafts ?? 0} drafts`, href: "/dashboard/posts", tone: "from-accent to-[#3b89ff]" },
    { label: "Services", value: data?.services, sub: "shown on the website", href: "/dashboard/services", tone: "from-sky-500 to-cyan-400" },
    { label: "Total leads", value: data?.leads.total, sub: `${data?.leads.new ?? 0} new`, href: "/dashboard/leads", tone: "from-emerald-500 to-teal-400" },
  ];
  const empty = data && data.posts.total === 0 && data.services === 0;

  return (
    <>
      <PageHeader
        title="Overview"
        description="Everything happening on your website at a glance."
        actions={
          <>
            <Link href="/dashboard/posts/new"><Btn>+ New post</Btn></Link>
            <Link href="/" target="_blank"><Btn variant="secondary">View site ↗</Btn></Link>
          </>
        }
      />

      {empty && (
        <Card className="mb-6 flex flex-col items-start justify-between gap-4 border-accent/30 bg-accent-soft md:flex-row md:items-center">
          <div>
            <p className="font-semibold">Your database is empty</p>
            <p className="text-sm text-mute">Import the starter blog posts and services, then edit them to make them yours.</p>
          </div>
          <Btn onClick={seed} loading={seeding}>Import starter content</Btn>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="group relative overflow-hidden rounded-2xl border border-line bg-page p-6 transition-shadow hover:shadow-lg">
            <span aria-hidden className={`absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br ${c.tone} opacity-15 transition-opacity group-hover:opacity-25`} />
            <p className="text-sm text-mute">{c.label}</p>
            {loading ? <Skeleton className="mt-3 h-9 w-16" /> : <p className="mt-2 text-4xl font-bold tracking-tight">{c.value ?? 0}</p>}
            <p className="mt-1 text-xs text-mute">{c.sub}</p>
          </Link>
        ))}
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Latest enquiries</h2>
          <Link href="/dashboard/leads" className="text-sm font-semibold text-accent">View all →</Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-12" />)}</div>
        ) : data?.recentLeads.length ? (
          <ul className="divide-y divide-line">
            {data.recentLeads.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{l.name} <span className="font-normal text-mute">· {l.email}</span></p>
                  <p className="truncate text-sm text-mute">{l.message}</p>
                </div>
                <Badge value={l.status} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-mute">No enquiries yet. They appear here when someone uses the contact form.</p>
        )}
      </Card>
    </>
  );
}
