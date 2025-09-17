import { useEffect } from "react";
import { usePitches } from "../store/pitches";
import PitchCard from "../components/PitchCard";

export default function New() {
  const fetchLatest = usePitches((s) => s.fetchLatest);
  const latest = usePitches((s) => s.latest);
  const loading = usePitches((s) => s.loadingLatest);

  useEffect(() => {
    fetchLatest(1);
  }, [fetchLatest]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Newest Pitches</h1>
      <div className="space-y-3">
        {loading && <div className="text-sm text-neutral-400">Loading…</div>}
        {!loading && latest.length === 0 && (
          <div className="text-sm text-neutral-400">No new pitches yet.</div>
        )}
        {latest.map((p) => (
          <PitchCard key={p._id} pitch={p} />
        ))}
      </div>
    </div>
  );
}
