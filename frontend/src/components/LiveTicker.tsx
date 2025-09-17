import { useEffect, useRef } from "react";

const items = [
  { user: "Sara", action: "upvoted", what: "AI for Urdu legal docs" },
  { user: "Ali", action: "commented on", what: "Solo founder CRM" },
  { user: "Noah", action: "posted", what: "Instant grocery co-op" },
  { user: "Maya", action: "upvoted", what: "One-tap tutor" },
  { user: "Usman", action: "posted", what: "Figma → React exporter" },
];

export default function LiveTicker() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let x = 0;
    let raf: number;
    const step = () => {
      x -= 0.8; // faster, smoother scroll
      el.style.transform = `translateX(${x}px)`;
      if (Math.abs(x) > el.scrollWidth / 2) x = 0;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-gray-100 bg-white">
      {/* gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white"></div>

      <div className="mx-auto max-w-6xl px-0">
        <div
          ref={trackRef}
          className="flex gap-3 py-2.5 will-change-transform"
          style={{ width: "max-content" }}
        >
          {[...items, ...items].map((i, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-sm shadow-sm transition hover:shadow-md"
            >
              {/* smaller pulse dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500"></span>
              </span>
              <span className="font-medium text-gray-900">{i.user}</span>
              <span className="text-gray-500">{i.action}</span>
              <span className="italic text-gray-700">“{i.what}”</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
