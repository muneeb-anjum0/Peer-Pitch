import { useEffect } from "react";
import { usePitches } from "../store/pitches";
import Hero from "../components/Hero";
import StatBar from "../components/StatBar";
import LiveTicker from "../components/LiveTicker";
import FeatureGrid from "../components/FeatureGrid";
import Steps from "../components/Steps";
import PitchCard from "../components/PitchCard";
import CallToAction from "../components/CallToAction";

export default function Home() {
  const fetchTrending = usePitches((s) => s.fetchTrending);
  const fetchLatest = usePitches((s) => s.fetchLatest);
  const trending = usePitches((s) => s.trending);
  const latest = usePitches((s) => s.latest);
  const loadingTrending = usePitches((s) => s.loadingTrending);
  const loadingLatest = usePitches((s) => s.loadingLatest);

  useEffect(() => {
    fetchTrending();
    fetchLatest(1);
  }, [fetchTrending, fetchLatest]);

  return (
    <div>
      <Hero />

      {/* quick social proof & numbers */}
      <StatBar />

      {/* live ticker */}
      <LiveTicker />

      {/* features */}
      <FeatureGrid />

      {/* How it works */}
      <Steps />

      {/* Content columns */}
      <section className="mx-auto max-w-6xl gap-8 px-4 pb-16 pt-4 lg:grid lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-2xl font-black text-gray-900">🔥 Trending now</h2>
          <div className="space-y-3">
            {loadingTrending && <div className="text-sm text-gray-500">Loading…</div>}
            {!loadingTrending && trending.length === 0 && (
              <div className="text-sm text-gray-500">No trending pitches yet.</div>
            )}
            {trending.map((p) => (
              <PitchCard key={p._id} pitch={p} />
            ))}
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <h2 className="mb-3 text-2xl font-black text-gray-900">🆕 Fresh pitches</h2>
          <div className="space-y-3">
            {loadingLatest && <div className="text-sm text-gray-500">Loading…</div>}
            {!loadingLatest && latest.length === 0 && (
              <div className="text-sm text-gray-500">No new pitches yet.</div>
            )}
            {latest.map((p) => (
              <PitchCard key={p._id} pitch={p} />
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
