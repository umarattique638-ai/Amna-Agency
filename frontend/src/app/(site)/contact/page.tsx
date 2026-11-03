import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { Accent, Red } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get a free quote for website development, social media marketing, graphic design or digital marketing. We reply within 24 hours.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  return (
    <>
      <PageHero
        title={<>Let&apos;s <Red>Talk</Red> About Your <Accent>Project.</Accent></>}
        description="Free consultation, honest advice and a clear quote — usually within 24 hours."
      />
      <ContactSection defaultEmail={typeof email === "string" ? email.slice(0, 120) : undefined} />
    </>
  );
}
