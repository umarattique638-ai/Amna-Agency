import type { BlogBlock } from "@/types";

/** Convert the structured static blog blocks into the markdown-lite format stored in MongoDB. */
export function blocksToMarkdown(blocks: BlogBlock[]) {
  return blocks
    .map((b) =>
      [
        b.heading ? `## ${b.heading}` : "",
        ...(b.paragraphs ?? []),
        ...(b.list ? [b.list.map((i) => `- ${i}`).join("\n")] : []),
      ]
        .filter(Boolean)
        .join("\n\n"),
    )
    .join("\n\n");
}

export type MdNode =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] };

/** Parse markdown-lite into blocks (headings, paragraphs, lists, quotes). */
export function parseMarkdown(src: string): MdNode[] {
  const nodes: MdNode[] = [];
  const chunks = src.replace(/\r\n/g, "\n").split(/\n{2,}/);
  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;
    const lines = chunk.split("\n");
    if (chunk.startsWith("### ")) nodes.push({ type: "h3", text: chunk.slice(4) });
    else if (chunk.startsWith("## ")) nodes.push({ type: "h2", text: chunk.slice(3) });
    else if (lines.every((l) => /^[-*] /.test(l))) nodes.push({ type: "ul", items: lines.map((l) => l.slice(2)) });
    else if (lines.every((l) => /^\d+\. /.test(l))) nodes.push({ type: "ol", items: lines.map((l) => l.replace(/^\d+\. /, "")) });
    else if (chunk.startsWith("> ")) nodes.push({ type: "quote", text: lines.map((l) => l.replace(/^> ?/, "")).join(" ") });
    else nodes.push({ type: "p", text: lines.join(" ") });
  }
  return nodes;
}

export const slugifyHeading = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function estimateReadTime(text: string) {
  return `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`;
}
