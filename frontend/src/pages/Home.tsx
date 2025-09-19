import Hero from "../components/Hero";
import StatBar from "../components/StatBar";
import LiveTicker from "../components/LiveTicker";
import StorySection from "../components/StorySection";
import Timeline from "../components/Timeline";
import PitchCard from "../components/PitchCard";
import CallToAction from "../components/CallToAction";
import { useEffect } from "react";
import { usePitches } from "../store/pitches";

export default function Home() {
  const fetchTrending = usePitches((s) => s.fetchTrending);
  const fetchLatest = usePitches((s) => s.fetchLatest);
  const trendingRaw = usePitches((s) => s.trending);
  const latestRaw = usePitches((s) => s.latest);
  const trending = Array.isArray(trendingRaw) ? trendingRaw : [];
  const latest = Array.isArray(latestRaw) ? latestRaw : [];

  useEffect(() => {
    fetchTrending();
    fetchLatest(1);
  }, [fetchTrending, fetchLatest]);

  return (
    <div>
      <Hero />
      <StatBar />
      <LiveTicker />
      <StorySection />
      <Timeline />

      {/* Refined Trending & Fresh Pitches Section */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Trending */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-2xl font-black text-gray-900">Trending now</h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            <div className="grid gap-4">
              {trending.map((p) => (
                <PitchCard key={p._id} pitch={p} />
              ))}
            </div>
          </div>

          {/* Fresh */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-2xl font-black text-gray-900">Fresh pitches</h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            <div className="grid gap-4">
              {latest.map((p) => (
                <PitchCard key={p._id} pitch={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
