import type { Metadata } from "next";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { Different, FounderNote, Journey, Mission, TeamsSection, WhatWeDo } from "@/components/sections/about/AboutSections";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Axiom — a team of developers, designers and marketers helping businesses grow online since 2019.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <WhatWeDo />
      <Different />
      <Journey />
      <TeamsSection />
      <FounderNote />
      <CtaBanner title={<>Let&apos;s build something <span className="serif text-accent">great together.</span></>} />
    </>
  );
}
