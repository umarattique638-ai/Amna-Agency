import type { ServiceItem } from "@/types";

/** Quick-jump pills to each service on the page. */
export function ServiceNav({ services }: { services: ServiceItem[] }) {
  return (
    <nav aria-label="Jump to a service" className="sticky top-[76px] z-30 border-b border-line bg-page/90 backdrop-blur-lg">
      <ul className="container-x flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
        {services.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.slug}`}
              className="block rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
