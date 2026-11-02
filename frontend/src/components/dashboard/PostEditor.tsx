"use client";

import { ImageUploader } from "./ImageUploader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { z } from "zod";
import { apiError, useCreatePostMutation, useUpdatePostMutation } from "@/store/api";
import { postInputSchema, POST_CATEGORIES } from "@/lib/validations/post";
import { estimateReadTime } from "@/lib/markdown";
import { Markdown } from "@/components/ui/Markdown";
import { Btn, Card, FieldWrap, Input, PageHeader, Select, Textarea } from "./controls";
import { useToast } from "./feedback";
import { cn } from "@/lib/utils";
import type { PostDTO } from "@/types/api";

type Form = z.input<typeof postInputSchema>;
type Errors = Partial<Record<keyof Form, string>>;

const empty: Form = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Web Development",
  coverImage: "",
  coverAlt: "",
  status: "draft",
};

const tools = [
  { label: "H2", insert: "\n\n## Heading\n\n" },
  { label: "B", insert: "**bold text**" },
  { label: "• List", insert: "\n\n- First point\n- Second point\n\n" },
  { label: "1. List", insert: "\n\n1. First step\n2. Second step\n\n" },
  { label: "❝ Quote", insert: "\n\n> A memorable quote\n\n" },
  { label: "Link", insert: "[link text](https://example.com)" },
];

export function PostEditor({ post }: { post?: PostDTO }) {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<Form>(
    post
      ? { title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, coverImage: post.coverImage, coverAlt: post.coverAlt, status: post.status }
      : empty,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [createPost, createState] = useCreatePostMutation();
  const [updatePost, updateState] = useUpdatePostMutation();
  const saving = createState.isLoading || updateState.isLoading;
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const insert = (snippet: string) => {
    const el = contentRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const next = form.content.slice(0, s) + snippet + form.content.slice(e);
    set("content", next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = s + snippet.length;
    });
  };

  async function save(status?: "draft" | "published") {
    const payload = { ...form, status: status ?? form.status };
    const parsed = postInputSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])));
      toast("Please fix the highlighted fields", "error");
      return;
    }
    setErrors({});
    try {
      const res = post
        ? await updatePost({ id: post.id, body: parsed.data }).unwrap()
        : await createPost(parsed.data).unwrap();
      setForm((f) => ({ ...f, status: res.post.status, slug: res.post.slug }));
      toast(res.post.status === "published" ? "Published — it's live on the blog" : "Draft saved");
      if (!post) router.replace(`/dashboard/posts/${res.post.id}`);
    } catch (e) {
      const { message, fields } = apiError(e);
      setErrors(fields);
      toast(message, "error");
    }
  }

  const err = (k: keyof Form) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <>
      <PageHeader
        title={post ? "Edit post" : "New post"}
        description={post ? `Last saved ${post.updatedAt ? new Date(post.updatedAt).toLocaleString() : ""}` : "Write in plain text — use the toolbar for headings and lists."}
        actions={
          <>
            <Link href="/dashboard/posts"><Btn variant="ghost">Cancel</Btn></Link>
            <Btn variant="secondary" onClick={() => save("draft")} loading={saving && form.status === "draft"}>Save draft</Btn>
            <Btn onClick={() => save("published")} loading={saving && form.status === "published"}>
              {form.status === "published" && post ? "Update" : "Publish"}
            </Btn>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card className="space-y-5">
            <FieldWrap label="Title" htmlFor="title" error={errors.title}>
              <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. 5 ways to grow on Instagram" className="text-base font-semibold" {...err("title")} />
            </FieldWrap>
            <FieldWrap label="Excerpt" htmlFor="excerpt" error={errors.excerpt} hint={`${form.excerpt.length}/320 — shown on blog cards and Google`}>
              <Textarea id="excerpt" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className="min-h-20" maxLength={320} {...err("excerpt")} />
            </FieldWrap>
          </Card>

          <Card className="p-0">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2">
              <div role="tablist" className="flex gap-1">
                {(["write", "preview"] as const).map((t) => (
                  <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("rounded-lg px-3 py-1.5 text-sm font-medium capitalize", tab === t ? "bg-accent-soft text-accent" : "text-mute hover:text-fg")}>
                    {t}
                  </button>
                ))}
              </div>
              {tab === "write" && (
                <div className="flex flex-wrap gap-1">
                  {tools.map((t) => (
                    <button key={t.label} type="button" onClick={() => insert(t.insert)} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-mute hover:bg-surface hover:text-fg">
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4">
              {tab === "write" ? (
                <>
                  <label htmlFor="content" className="sr-only">Content</label>
                  <Textarea id="content" ref={contentRef} value={form.content} onChange={(e) => set("content", e.target.value)} className="min-h-[460px] border-0 p-0 font-mono text-[13px] focus:ring-0" placeholder={"Start writing…\n\n## A heading\n\nA paragraph of text.\n\n- A list item"} {...err("content")} />
                  {errors.content && <p id="content-error" className="text-xs text-red-600">{errors.content}</p>}
                </>
              ) : (
                <div className="min-h-[460px] text-[15px] leading-relaxed text-fg/80">
                  {form.content ? <Markdown source={form.content} /> : <p className="text-mute">Nothing to preview yet.</p>}
                </div>
              )}
            </div>
            <p className="border-t border-line px-4 py-2 text-xs text-mute">{estimateReadTime(form.content)} · {form.content.split(/\s+/).filter(Boolean).length} words</p>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="space-y-4">
            <p className="font-semibold">Settings</p>
            <FieldWrap label="Category" htmlFor="category" error={errors.category}>
              <Select id="category" value={form.category} onChange={(e) => set("category", e.target.value as Form["category"])}>
                {POST_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </FieldWrap>
            <FieldWrap label="URL slug" htmlFor="slug" error={errors.slug} hint="Leave empty to create from the title">
              <Input id="slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto" {...err("slug")} />
            </FieldWrap>
            <p className="text-xs text-mute">Status: <span className="font-semibold capitalize text-fg">{form.status}</span></p>
          </Card>

          <Card className="space-y-4">
            <p className="font-semibold">Cover image</p>
            <ImageUploader id="coverImage" folder="posts" value={form.coverImage} onChange={(url) => set("coverImage", url)} alt={form.coverAlt} error={errors.coverImage} />
            <FieldWrap label="Alt text" htmlFor="coverAlt" hint="Describe the image for accessibility & SEO">
              <Input id="coverAlt" value={form.coverAlt} onChange={(e) => set("coverAlt", e.target.value)} />
            </FieldWrap>
          </Card>
        </div>
      </div>
    </>
  );
}
