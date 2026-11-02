import type { Metadata } from "next";
import Link from "next/link";
import { BlogExplorer } from "@/components/sections/blog/BlogExplorer";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getPublishedPosts } from "@/lib/server/api";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical advice on websites, MERN development, social media, design and digital marketing for growing businesses.",
};
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return (
    <>
      <section className="hero-wash">
        <div className="container-x max-w-[1000px] pt-28">
          <nav aria-label="Breadcrumb" className="text-[12px] text-mute">
            <Link href="/" className="hover:text-accent">Home</Link> <span aria-hidden>›</span> <span aria-current="page">Blog</span>
          </nav>
        </div>
        <header className="container-x max-w-2xl pt-14 pb-10 text-center">
          <Eyebrow>Axiom blog</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2rem,4vw,2.9rem)]">
            <span className="text-outline-red">Digital</span> Growth, <span className="text-accent">Explained.</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-mute">
            Practical advice on websites, social media, branding and ads — from the team that builds and runs them every day.
          </p>
        </header>
        <BlogExplorer posts={posts} />
      </section>
      <CtaBanner title={<>Reading about growth is good. <span className="serif text-accent">Getting it done is better.</span></>} text="Let our team build, design and market for you — starting with a free consultation." />
    </>
  );
}
