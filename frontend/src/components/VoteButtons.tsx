import { usePitches } from "../store/pitches";

export default function VoteButtons({
  pitchId,
  votes,
}: {
  pitchId: string;
  votes: number;
}) {
  const vote = usePitches((s) => s.vote);

  return (
    <div className="flex w-16 select-none flex-col items-center rounded-xl border border-gray-100 bg-white py-2 shadow-soft">
      <button
        onClick={() => vote(pitchId, "up")}
        className="h-8 w-8 rounded-lg transition hover:bg-gray-50"
        title="Upvote"
      >
        ▲
      </button>
      <div className="text-sm font-semibold text-gray-900">{votes}</div>
      <button
        onClick={() => vote(pitchId, "down")}
        className="h-8 w-8 rounded-lg transition hover:bg-gray-50"
        title="Downvote"
      >
        ▼
      </button>
    </div>
  );
}
