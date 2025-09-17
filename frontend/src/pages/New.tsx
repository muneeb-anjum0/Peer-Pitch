import { useEffect, useRef, useState } from "react";
import { usePitches } from "../store/pitches";
import PitchCard from "../components/PitchCard";

export default function New() {
  const fetchLatest = usePitches((s) => s.fetchLatest);
  const latest = usePitches((s) => s.latest);
  const loadingLatest = usePitches((s) => s.loadingLatest);

  const [filter, setFilter] = useState("newest");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slider, setSlider] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // Demo pitches for preview
  const demoPitches = [
    {
      _id: "demoN1",
      title: "Flash Feedback for Coders",
      body: "Write code, hit 'share snippet', and instantly get feedback from peers around the world. Great for debugging, learning, and improving fast.",
      tags: ["Coding", "Feedback"],
      votes: 12,
      commentCount: 2,
      author: { uid: "u4", name: "Noah" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "demoN2",
      title: "Instant Idea Roulette",
      body: "Spin a wheel of random startup ideas submitted by the community. Great for brainstorming, hackathons, or just inspiration when stuck.",
      tags: ["Creativity", "Brainstorm"],
      votes: 7,
      commentCount: 1,
      author: { uid: "u5", name: "Zara" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "demoN3",
      title: "Neighborhood Tool Library",
      body: "A platform for neighbors to lend and borrow tools, reducing waste and building community. Everything from drills to lawnmowers.",
      tags: ["Community", "Sharing"],
      votes: 19,
      commentCount: 4,
      author: { uid: "u6", name: "Usman" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  // Update underline position on filter change
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
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2f4f7 1px, transparent 1px), linear-gradient(to bottom, #f2f4f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Fade mask */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
        }}
      />

      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
          Fresh pitches
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          The newest ideas, hot off the press — be the first to react.
        </p>

        {/* Filter bar */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex gap-8">
            {[
              { key: "newest", label: "Newest" },
              { key: "rising", label: "Rising" },
              { key: "discussed", label: "Discussed" },
            ].map((opt, i) => (
              <button
                key={opt.key}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => setFilter(opt.key)}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  filter === opt.key ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}

            {/* Underline slider */}
            <span
              className="absolute bottom-0 h-[2px] rounded-full bg-brand-500 transition-all duration-300 ease-in-out"
              style={{ left: slider.left, width: slider.width }}
            />
          </div>
        </div>

        <div className="mt-8 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </header>

      {/* Pitch list */}
      <main className="mx-auto max-w-6xl px-4 pb-20">
        {loadingLatest && latest.length === 0 && demoPitches.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500 shadow-sm">
            Loading new pitches…
          </div>
        )}

        <div className="grid gap-5">
          {demoPitches.map((p) => (
            <PitchCard key={p._id} pitch={p as any} />
          ))}
          {!loadingLatest && latest.map((p) => <PitchCard key={p._id} pitch={p} />)}
        </div>
      </main>
    </div>
  );
}
