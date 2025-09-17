import { useEffect, useRef, useState } from "react";
import { usePitches } from "../store/pitches";
import PitchCard from "../components/PitchCard";

export default function Trending() {
  const fetchTrending = usePitches((s) => s.fetchTrending);
  const trending = usePitches((s) => s.trending);
  const loadingTrending = usePitches((s) => s.loadingTrending);

  const [filter, setFilter] = useState("today");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slider, setSlider] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const demoPitches = [/* keep your demo data */];

  useEffect(() => { fetchTrending(); }, [fetchTrending]);

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
      <header className="mx-auto max-w-6xl px-4 pt-16 pb-6 text-center">
        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
          Trending on PulseProof
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          See which ideas are sparking the biggest conversations right now.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="relative flex gap-8">
            {[
              { key: "today", label: "Today" },
              { key: "week", label: "This week" },
              { key: "all", label: "All time" },
            ].map((opt, i) => (
              <button
                key={opt.key}
                ref={(el) => (btnRefs.current[i] = el)}
                onClick={() => setFilter(opt.key)}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  filter === opt.key ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
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
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20">
        {loadingTrending && trending.length === 0 && demoPitches.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
            Loading trending ideas…
          </div>
        )}
        <div className="grid gap-5">
          {demoPitches.map((p) => <PitchCard key={p._id} pitch={p as any} />)}
          {!loadingTrending && trending.map((p) => <PitchCard key={p._id} pitch={p} />)}
        </div>
      </main>
    </div>
  );
}
