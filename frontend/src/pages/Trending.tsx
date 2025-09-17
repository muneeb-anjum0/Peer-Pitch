import { useEffect } from "react";
import { usePitches } from "../store/pitches";
import PitchCard from "../components/PitchCard";

export default function Trending() {
  const fetchTrending = usePitches((s) => s.fetchTrending);
  const trending = usePitches((s) => s.trending);
  const loading = usePitches((s) => s.loadingTrending);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Trending Pitches</h1>
      <div className="space-y-3">
        {loading && <div className="text-sm text-neutral-400">Loading…</div>}
        {!loading && trending.length === 0 && (
          <div className="text-sm text-neutral-400">No trending pitches yet.</div>
        )}
        {trending.map((p) => (
          <PitchCard key={p._id} pitch={p} />
        ))}
      </div>
    </div>
  );
}
