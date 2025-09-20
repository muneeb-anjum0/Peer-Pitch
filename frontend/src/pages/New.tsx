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

  const [filter, setFilter] = useState("today");
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
    const idx = ["today", "week", "all"].indexOf(filter);
    const el = btnRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      setSlider({ left: rect.left - parentRect.left, width: rect.width });
    }
  }, [filter]);
  return (
    <div className="relative">
      <header className="mx-auto max-w-6xl px-4 pt-24 pb-6 text-center">
        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">Fresh Pitches</h1>
        <p className="mt-3 text-lg text-gray-600">See the newest ideas and be the first to react.</p>
        <p className="mt-2 text-base italic text-brand-600">“Every idea is a seed-help it grow.”</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <SparkIcon /> {latest.length} ideas today
          </div>
        </div>
        {/* Filter bar with pill-shaped, colorful buttons */}
        <div className="mt-10 flex justify-center">
          <div className="relative flex gap-4">
            {["today", "week", "all"].map((opt, i) => (
              <button
                key={opt}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => setFilter(opt)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors focus:outline-none shadow-sm border-2 ${
                  filter === opt
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-white text-brand-500 border-brand-200 hover:bg-brand-50 hover:border-brand-400"
                }`}
              >
                {opt === "today" ? "Today" : opt === "week" ? "This week" : "All time"}
              </button>
            ))}
            {/* Removed underline slider for filter buttons */}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        {loadingLatest && latest.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
            Loading fresh ideas…
          </div>
        )}
        <div className="grid gap-5">
          {!loadingLatest && latest.map((p) => <PitchCard key={p._id} pitch={p} />)}
        </div>
      </main>
    </div>
  );
}
