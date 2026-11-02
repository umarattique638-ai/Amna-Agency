import { Frame } from "./Frame";

/** Product dashboard mock used as the showcase "hero object". */
export function DashboardVisual() {
  return (
    <Frame glow="70% 60%">
      <div className="absolute inset-[7%] flex overflow-hidden rounded-xl border border-white bg-white shadow-[0_40px_80px_-30px_rgba(6,13,31,0.45)]">
        <aside className="hidden w-[18%] flex-col gap-3 border-r border-line p-4 sm:flex">
          <span className="mb-3 h-2.5 w-14 rounded bg-accent" />
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`h-2 rounded ${i === 1 ? "w-4/5 bg-accent/80" : "w-3/5 bg-fg/10"}`} />
          ))}
        </aside>
        <div className="flex flex-1 flex-col gap-4 p-[3%]">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Revenue", "$84.2k"],
              ["Orders", "1,284"],
              ["Uptime", "99.99%"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-surface p-3">
                <p className="label text-[8px] text-mute">{k}</p>
                <p className="display mt-1 text-[clamp(1rem,2vw,1.8rem)] text-fg">{v}</p>
              </div>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-lg border border-line bg-white">
            <svg viewBox="0 0 400 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#2b7cff" stopOpacity="0.4" />
                  <stop offset="1" stopColor="#2b7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 130 C40 120 60 90 100 96 S160 60 200 70 S260 30 300 40 S360 14 400 18 V160 H0Z" fill="url(#dash-fill)" />
              <path d="M0 130 C40 120 60 90 100 96 S160 60 200 70 S260 30 300 40 S360 14 400 18" fill="none" stroke="#2b7cff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-2 rounded-lg border border-line bg-surface p-3">
                <span className="block h-1.5 w-2/3 rounded bg-fg/15" />
                <span className="block h-1.5 w-1/2 rounded bg-fg/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
