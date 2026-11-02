import { unsplash } from "@/lib/unsplash";
import type { Photo } from "@/types";

/**
 * Central photo library (free Unsplash License photos, hot-linked from Unsplash's CDN).
 * Swap any `src` for your own work — e.g. "/images/my-project.jpg" placed in /public.
 */
export const photos = {
  teamLaughing: { src: unsplash("photo-1522202176988-66273c2fd55f"), alt: "Agency team laughing together around a table with laptops" },
  teamOpenOffice: { src: unsplash("photo-1531973576160-7125cd663d86"), alt: "Three colleagues collaborating in a bright open office" },
  teamWhiteboard: { src: unsplash("photo-1557804506-669a67965ba0"), alt: "Team watching a strategy session at a whiteboard" },
  teamPresenting: { src: unsplash("photo-1542744173-8e7e53415bb0"), alt: "Strategist presenting to a team seated with laptops" },
  teamUnity: { src: unsplash("photo-1600880292089-90a7e086ee0c"), alt: "Team members joining hands in a unity gesture" },
  teamLaptops: { src: unsplash("photo-1519389950473-47ba0277781c"), alt: "People working together at a table with several laptops" },

  codeMacbook: { src: unsplash("photo-1498050108023-c5249f4df085"), alt: "MacBook showing lines of code on a developer's desk" },
  codeReact: { src: unsplash("photo-1619410283995-43d9134e7656"), alt: "Code editor displaying React source code" },
  codeDesk: { src: unsplash("photo-1605379399642-870262d3d051"), alt: "Developer desk with monitors full of code" },
  codeHtml: { src: unsplash("photo-1542831371-29b0f74f9713"), alt: "Close-up of HTML code on a screen" },

  socialIcons: { src: unsplash("photo-1611162617213-7d7a39e9b1d7"), alt: "Social media app icons arranged in a grid" },
  socialPhone: { src: unsplash("photo-1611926653458-09294b3142bf"), alt: "Smartphone showing social media apps" },
  laptopPhone: { src: unsplash("photo-1563986768494-4dee2763ff3f"), alt: "Person using a laptop and a smartphone together" },

  designSwatches: { src: unsplash("photo-1561070791-2526d30994b5"), alt: "Pantone colour swatch book used by graphic designers" },
  designTablet: { src: unsplash("photo-1572044162444-ad60f128bdea"), alt: "Designer drawing on a tablet with colour swatches and markers" },
  designIpad: { src: unsplash("photo-1561070791-36c11767b26a"), alt: "iPad showing a colourful gradient artwork" },
  designImac: { src: unsplash("photo-1626785774573-4b799315345d"), alt: "Designer's iMac workstation" },

  analyticsLaptop: { src: unsplash("photo-1460925895917-afdab827c52f"), alt: "Laptop showing marketing analytics charts" },
  analyticsChart: { src: unsplash("photo-1686061592689-312bbfb5c055"), alt: "Analytics dashboard with a bar chart" },
  marketingDesk: { src: unsplash("photo-1557838923-2985c318be48"), alt: "Digital marketing concept on a wooden desk" },
  videoEditing: { src: unsplash("photo-1574717024653-61fd2cf4d44d"), alt: "Video editor working on a timeline in editing software" },
  videoCamera: { src: unsplash("photo-1492691527719-9d1e07e534b4"), alt: "Camera recording a video shoot" },
  macbookUser: { src: unsplash("photo-1553877522-43269d4ea984"), alt: "Marketer working on a MacBook" },
} satisfies Record<string, Photo>;
