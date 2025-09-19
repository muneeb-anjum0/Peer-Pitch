// Extend Window type for SSR hydration
declare global {
  interface Window {
    __LATEST_PITCHES__?: import("../types").Pitch[];
  }
}
import { useEffect, useRef, useState } from "react";
import { usePitches } from "../store/pitches";
import PitchCard from "../components/PitchCard";

/* Small inline icons, consistent stroke + size */
function SparkIcon() {
  return (
    <svg className="h-4 w-4 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7L3 9h7z" />
    </svg>
  );
}

export default function New() {
  // Use hydration method directly from store
  const latestRaw = usePitches((s) => s.latest);
  const latest = Array.isArray(latestRaw) ? latestRaw : [];
  const loadingLatest = usePitches((s) => s.loadingLatest);

  const [filter, setFilter] = useState<"newest" | "rising" | "discussed">("newest");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slider, setSlider] = useState<{ left: number; width: number }>({ left: 0, width: 0 });


  useEffect(() => {
    // SSR hydration: use window.__LATEST_PITCHES__ if available
    if (Array.isArray(window.__LATEST_PITCHES__)) {
  usePitches.getState().fetchLatest(window.__LATEST_PITCHES__);
    } else {
  usePitches.getState().fetchLatest();
    }
  }, []);

  useEffect(() => {
    const idx = ["newest", "rising", "discussed"].indexOf(filter);
    const el = btnRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      setSlider({ left: rect.left - parentRect.left, width: rect.width });
    }
  }, [filter]);

  return (
    <div className="relative">
      {/* Header: LEFT aligned to differentiate from Trending */}
      <header className="mx-auto max-w-6xl px-4 pt-24 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-brand-500" />
          Fresh on PulseProof
        </div>
        <h1 className="mt-2 text-4xl font-black text-gray-900 sm:text-5xl">
          Discover the newest ideas
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">
          Raw, unfiltered, and ready for your first proof. Be the earliest signal.
        </p>

        {/* Tag scroller (exploration vibes) */}
        <div className="mt-6 no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {["All", "AI", "Education", "Community", "Productivity", "Health", "Design", "SaaS", "Tools"].map((t) => (
            <button
              key={t}
              className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm hover:border-gray-300"
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Sticky subheader: filter with adaptive underline (distinct structure vs Trending) */}
      <div className="sticky top-16 z-30 border-y border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <SparkIcon />
            <span>
              {latest.length} fresh ideas today
            </span>
          </div>

          <div className="relative flex gap-8">
            {[
              { key: "newest", label: "Newest" },
              { key: "rising", label: "Rising" },
              { key: "discussed", label: "Discussed" },
            ].map((opt, i) => (
              <button
                key={opt.key}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => setFilter(opt.key as any)}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  filter === (opt.key as any) ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <span
              className="absolute bottom-0 h-[2px] rounded-full bg-brand-500 transition-all duration-300 ease-in-out"
              style={{ left: slider.left, width: slider.width }}
            />
          </div>
        </div>
      </div>

      {/* Distinct container canvas for the list */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        {/* Date separator for freshness */}
        <div className="mt-8 mb-4 flex items-center gap-3 text-xs font-semibold text-gray-700">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm">
            New today
          </span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white/70 p-4 shadow-[0_18px_60px_rgba(16,24,40,.06)] sm:p-6">
          {/* Loading state */}
          {loadingLatest && latest.length === 0 && (
            <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
              Loading fresh ideas…
            </div>
          )}

          {/* Discovery grid: slightly tighter and more “flowy” than Trending */}
          <div className="grid gap-4 sm:gap-5">
            {!loadingLatest && latest.map((p) => <PitchCard key={p._id} pitch={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
