import { siteConfig } from "@/config/site";

export const contactMethods = [
  { icon: "mail", title: "Email us", text: "We reply within 24 hours", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: "phone", title: "Call or WhatsApp", text: "Mon–Sat, 10am–7pm", value: siteConfig.phone, href: siteConfig.whatsapp },
  { icon: "pin", title: "Visit the studio", text: "By appointment", value: siteConfig.location, href: undefined },
];

export const nextSteps = [
  { title: "We read your message", text: "A real person reviews your project — usually the same day." },
  { title: "Free 20-minute call", text: "We discuss your goals, timeline and budget, with honest advice." },
  { title: "Clear proposal", text: "You get a written plan and fixed quote. No obligation." },
];
