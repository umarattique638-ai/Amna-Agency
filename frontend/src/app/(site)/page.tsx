import { Hero } from "@/components/sections/home/Hero";
import { TechStrip } from "@/components/sections/home/TechStrip";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { StackSection } from "@/components/sections/home/StackSection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { WhyChoose } from "@/components/sections/home/WhyChoose";
import { WorkSection } from "@/components/sections/home/WorkSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { getServices } from "@/lib/server/api";

export const revalidate = 300;

export default async function HomePage() {
  const services = await getServices();
  return (
    <>
      <Hero />
      <TechStrip />
      <ServicesSection services={services} />
      <StackSection />
      <AboutSection />
      <StatsSection />
      <WhyChoose />
      <WorkSection />
      <ProcessSection />
      <CtaBanner />
      <HomeFaq />
    </>
  );
}
