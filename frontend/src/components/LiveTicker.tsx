import { useEffect, useRef } from "react";

const items = [
  { user: "Sara", action: "upvoted", what: "“Instant grocery co-op”" },
  { user: "Ali", action: "commented on", what: "“Solo founder CRM”" },
  { user: "Noah", action: "posted", what: "“AI for Urdu legal docs”" },
  { user: "Maya", action: "upvoted", what: "“One-tap tutor”" },
  { user: "Usman", action: "posted", what: "“Figma → React exporter”" },
];

export default function LiveTicker() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let x = 0;
    let raf: number;
    const step = () => {
      x -= 0.7; // speed
      el.style.transform = `translateX(${x}px)`;
      if (Math.abs(x) > el.scrollWidth / 2) x = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative overflow-hidden border-b border-gray-100 bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white" />

      <div className="mx-auto max-w-6xl px-0">
        <div className="flex gap-4 py-3" ref={trackRef} style={{ willChange: "transform", width: "max-content" }}>
          {[...items, ...items].map((i, idx) => (
            <div key={idx} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              <span className="font-semibold">{i.user}</span>
              <span className="text-gray-500">{i.action}</span>
              <span className="italic"> {i.what}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
