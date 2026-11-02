"use client";

import Link from "next/link";
import { apiError, useDeleteServiceMutation, useServicesQuery } from "@/store/api";
import { Badge, Btn, EmptyState, PageHeader, Skeleton } from "@/components/dashboard/controls";
import { useConfirm, useToast } from "@/components/dashboard/feedback";
import type { ServiceDTO } from "@/types/api";

export default function ServicesAdminPage() {
  const { data, isLoading: loading } = useServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const toast = useToast();
  const confirm = useConfirm();

  const remove = async (s: ServiceDTO) => {
    if (!(await confirm({ title: "Delete this service?", text: `“${s.title}” will disappear from the website.` }))) return;
    try {
      await deleteService(s.id).unwrap();
      toast("Service deleted");
    } catch (e) {
      toast(apiError(e).message, "error");
    }
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="What you offer — shown on the Home and Services pages, in this order."
        actions={<Link href="/dashboard/services/new"><Btn>+ New service</Btn></Link>}
      />
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-72" />)}</div>
      ) : !data?.services.length ? (
        <EmptyState title="No services yet" text="Add your first service, or import the starter content from the Overview page." action={<Link href="/dashboard/services/new"><Btn>Add a service</Btn></Link>} />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.services.map((s) => (
            <li key={s.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-page">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail */}
              <img src={s.image.includes("unsplash") ? `${s.image}?w=600&q=60&auto=format` : s.image} alt="" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{s.title}</p>
                  <Badge value={s.published ? "published" : "hidden"} />
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-mute">{s.summary}</p>
                <div className="mt-auto flex items-center justify-between pt-4 text-xs">
                  <span className="text-mute">Order {s.order}</span>
                  <span>
                    <Link href={`/dashboard/services/${s.id}`} className="mr-3 font-semibold text-accent">Edit</Link>
                    <button onClick={() => remove(s)} className="font-semibold text-red-600">Delete</button>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
