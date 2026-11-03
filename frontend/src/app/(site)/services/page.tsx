import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ServiceNav } from "@/components/sections/services/ServiceNav";
import { ServiceDetails } from "@/components/sections/services/ServiceDetails";
import { MernStack } from "@/components/sections/services/MernStack";
import { Packages } from "@/components/sections/services/Packages";
import { ServicesFaq } from "@/components/sections/services/ServicesFaq";
import { Accent, Red } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { reelVideo } from "@/content/videos";
import { getServices } from "@/lib/server/api";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, MERN stack apps, social media marketing, graphic designing and digital marketing (SEO, Google & Meta Ads).",
};

export const revalidate = 300;

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        title={<><Red>Development,</Red> Marketing, Design &amp; <Accent>Video.</Accent></>}
        description="Services that work even better together. Hire us for one, or let one team handle your website, social media, brand and ads."
        media={
          <div className="relative mx-auto w-full max-w-[380px] lg:mr-0">
            <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-accent/25 to-[#9cc3ff]/10 blur-2xl" />
            <VideoCard clip={reelVideo} caption={false} className="relative" />
          </div>
        }
      />
      <ServiceNav services={services} />
      <ServiceDetails services={services} />
      <MernStack />
      <Packages />
      <ServicesFaq />
      <CtaBanner title={<>Not sure which service <span className="serif text-accent">you need?</span></>} text="Book a free 20-minute call and we'll recommend the right mix for your goals and budget." />
    </>
  );
}
