"use client";

import { ImageUploader } from "./ImageUploader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { z } from "zod";
import { apiError, useCreateServiceMutation, useUpdateServiceMutation } from "@/store/api";
import { serviceInputSchema } from "@/lib/validations/service";
import { Btn, Card, FieldWrap, Input, PageHeader, Textarea } from "./controls";
import { useToast } from "./feedback";
import type { ServiceDTO } from "@/types/api";

type Form = z.input<typeof serviceInputSchema>;
type Errors = Partial<Record<keyof Form, string>>;

export function ServiceEditor({ service }: { service?: ServiceDTO }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<Form>({
    title: service?.title ?? "",
    slug: service?.slug ?? "",
    summary: service?.summary ?? "",
    description: service?.description ?? "",
    deliverables: service?.deliverables ?? [],
    image: service?.image ?? "",
    imageAlt: service?.imageAlt ?? "",
    highlightValue: service?.highlightValue ?? "",
    highlightLabel: service?.highlightLabel ?? "",
    order: service?.order ?? 0,
    published: service?.published ?? true,
  });
  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [createService, createState] = useCreateServiceMutation();
  const [updateService, updateState] = useUpdateServiceMutation();
  const saving = createState.isLoading || updateState.isLoading;
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const addTag = (e?: KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter" && e.key !== ",") return;
    e?.preventDefault();
    const v = tag.trim().replace(/,$/, "");
    if (v && !(form.deliverables ?? []).includes(v)) set("deliverables", [...(form.deliverables ?? []), v]);
    setTag("");
  };

  async function save() {
    const parsed = serviceInputSchema.safeParse(form);
    if (!parsed.success) {
      const fe = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])));
      toast("Please fix the highlighted fields", "error");
      return;
    }
    setErrors({});
    try {
      const res = service
        ? await updateService({ id: service.id, body: parsed.data }).unwrap()
        : await createService(parsed.data).unwrap();
      toast("Service saved — the website is updated");
      if (!service) router.replace(`/dashboard/services/${res.service.id}`);
    } catch (e) {
      const { message, fields } = apiError(e);
      setErrors(fields);
      toast(message, "error");
    }
  }

  return (
    <>
      <PageHeader
        title={service ? "Edit service" : "New service"}
        description="Services appear on the Home page and the Services page."
        actions={
          <>
            <Link href="/dashboard/services"><Btn variant="ghost">Cancel</Btn></Link>
            <Btn onClick={save} loading={saving}>Save service</Btn>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldWrap label="Service name" htmlFor="title" error={errors.title}>
              <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Website Development" aria-invalid={!!errors.title} />
            </FieldWrap>
            <FieldWrap label="URL slug" htmlFor="slug" error={errors.slug} hint="Used for /services#slug — auto if empty">
              <Input id="slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto" />
            </FieldWrap>
          </div>
          <FieldWrap label="Short summary" htmlFor="summary" error={errors.summary} hint="One line, shown on the Home page cards">
            <Input id="summary" value={form.summary} onChange={(e) => set("summary", e.target.value)} aria-invalid={!!errors.summary} />
          </FieldWrap>
          <FieldWrap label="Full description" htmlFor="description" error={errors.description}>
            <Textarea id="description" value={form.description} onChange={(e) => set("description", e.target.value)} className="min-h-36" aria-invalid={!!errors.description} />
          </FieldWrap>
          <FieldWrap label="What's included" htmlFor="tag" hint="Type an item and press Enter">
            <div className="flex flex-wrap gap-2 rounded-xl border border-line p-2 focus-within:border-accent">
              {(form.deliverables ?? []).map((d) => (
                <span key={d} className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  {d}
                  <button type="button" aria-label={`Remove ${d}`} onClick={() => set("deliverables", (form.deliverables ?? []).filter((x) => x !== d))}>×</button>
                </span>
              ))}
              <input id="tag" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={addTag} onBlur={() => addTag()} className="min-w-32 flex-1 bg-transparent px-2 py-1 text-sm outline-none" placeholder="e.g. Responsive design" />
            </div>
          </FieldWrap>
          <div className="grid gap-5 sm:grid-cols-3">
            <FieldWrap label="Highlight value" htmlFor="hv" hint="e.g. 98 or 3.4x">
              <Input id="hv" value={form.highlightValue} onChange={(e) => set("highlightValue", e.target.value)} />
            </FieldWrap>
            <FieldWrap label="Highlight label" htmlFor="hl" hint="e.g. Lighthouse score">
              <Input id="hl" value={form.highlightLabel} onChange={(e) => set("highlightLabel", e.target.value)} />
            </FieldWrap>
            <FieldWrap label="Display order" htmlFor="order" hint="Lower shows first">
              <Input id="order" type="number" min={0} value={String(form.order ?? 0)} onChange={(e) => set("order", Number(e.target.value))} />
            </FieldWrap>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="space-y-4">
            <p className="font-semibold">Image</p>
            <ImageUploader id="image" folder="services" value={form.image} onChange={(url) => set("image", url)} alt={form.imageAlt} error={errors.image} />
            <FieldWrap label="Alt text" htmlFor="imageAlt">
              <Input id="imageAlt" value={form.imageAlt} onChange={(e) => set("imageAlt", e.target.value)} />
            </FieldWrap>
          </Card>
          <Card>
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block font-semibold">Show on website</span>
                <span className="text-xs text-mute">Hidden services stay in the dashboard only</span>
              </span>
              <input type="checkbox" checked={!!form.published} onChange={(e) => set("published", e.target.checked)} className="peer sr-only" />
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-line transition-colors peer-checked:bg-accent after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5 peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20" />
            </label>
          </Card>
        </div>
      </div>
    </>
  );
}
