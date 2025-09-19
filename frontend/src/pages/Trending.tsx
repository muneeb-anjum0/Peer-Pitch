// Extend Window type for SSR hydration
declare global {
  interface Window {
    __TRENDING_PITCHES__?: import("../types").Pitch[];
  }
}
// Extend Window type for SSR hydration
declare global {
  interface Window {
    __TRENDING_PITCHES__?: import("../types").Pitch[];
  }
}
import { useEffect, useRef, useState } from "react";
import { usePitches } from "../store/pitches";
import PitchCard from "../components/PitchCard";

function LightbulbIcon() {
  return (
    <svg
      className="h-4 w-4 text-brand-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.6 1.3 4.9 3.3 6.2.4.3.7.8.7 1.3v1.5h6v-1.5c0-.5.3-1 .7-1.3A7 7 0 0 0 19 9a7 7 0 0 0-7-7z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="h-4 w-4 text-brand-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="h-4 w-4 text-brand-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63h3.813c.97 0 1.371 1.24.588 1.81l-3.083 2.24 1.18 3.63c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.089 2.008c-.785.57-1.84-.197-1.54-1.118l1.18-3.63-3.083-2.24c-.783-.57-.382-1.81.588-1.81h3.813l1.18-3.63z" />
    </svg>
  );
}

export default function Trending() {
  const fetchTrending = usePitches.getState().fetchTrending;
  const trendingRaw = usePitches((s) => s.trending);
  const trending = Array.isArray(trendingRaw) ? trendingRaw : [];
  const loadingTrending = usePitches((s) => s.loadingTrending);

  const [filter, setFilter] = useState("today");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slider, setSlider] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    // SSR hydration: use window.__TRENDING_PITCHES__ if available
    if (Array.isArray(window.__TRENDING_PITCHES__)) {
  usePitches.getState().fetchTrending(window.__TRENDING_PITCHES__);
    } else {
  usePitches.getState().fetchTrending();
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
        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
          Trending on PulseProof
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          See which ideas are sparking the biggest conversations right now.
        </p>

        {/* Quick stats with SVG icons */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <LightbulbIcon /> {trending.length} ideas live
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <ChatIcon /> Most active idea: Mentor Matching
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <StarIcon /> Top votes today: AI Tutor
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-10 flex justify-center">
          <div className="relative flex gap-8">
            {["today", "week", "all"].map((opt, i) => (
              <button
                key={opt}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => setFilter(opt)}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  filter === opt ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {opt === "today" ? "Today" : opt === "week" ? "This week" : "All time"}
              </button>
            ))}
            <span
              className="absolute bottom-0 h-[2px] rounded-full bg-brand-500 transition-all duration-300 ease-in-out"
              style={{ left: slider.left, width: slider.width }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        {loadingTrending && trending.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
            Loading trending ideas…
          </div>
        )}
        <div className="grid gap-5">
          {!loadingTrending && trending.map((p) => <PitchCard key={p._id} pitch={p} />)}
        </div>
      </main>
    </div>
  );
}
