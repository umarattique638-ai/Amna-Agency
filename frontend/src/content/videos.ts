/** Showreel clips served from /public/videos. */
export interface Clip {
  src: string;
  poster: string;
  title: string;
  meta: string;
  ratio: string;
}

export const promoVideo: Clip = { src: "/videos/axiom-promo.mp4", poster: "/videos/axiom-promo.jpg", title: "Brand promo film", meta: "16:9 · YouTube & website", ratio: "aspect-video" };
export const reelVideo: Clip = { src: "/videos/axiom-reel.mp4", poster: "/videos/axiom-reel.jpg", title: "Social media reel", meta: "4:5 · Instagram & Facebook", ratio: "aspect-[4/5]" };
