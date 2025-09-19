import { useEffect, useState } from "react";
import { usePitches } from "../store/pitches";
import { auth } from "../lib/firebase";
import Button from "./ui/Button";

export default function VoteButtons({ pitchId, votes }: { pitchId: string; votes: number }) {
  const getMyVote = usePitches(s => s.getMyVote);
  const vote = usePitches(s => s.vote);
  const [my, setMy] = useState<0 | 1 | -1>(0);
  const [count, setCount] = useState(votes);

  useEffect(() => {
    let mounted = true;
    getMyVote(pitchId).then((v) => {
      if (mounted) setMy(v);
    });
    setCount(votes);
    return () => { mounted = false; };
  }, [pitchId, votes, getMyVote]);

  const doVote = async (delta: 1 | -1) => {
    if (!auth.currentUser) {
      alert("Please sign in to vote.");
      return;
    }
    // toggle logic
    const next = my === delta ? 0 : delta;
    // optimistic
    setCount(prev => prev - my + next);
    setMy(next);
    try {
      await vote(pitchId, next);
    } catch {
      // revert on error
      setCount(prev => prev - next + my);
      setMy(my);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="neutral"
        size="sm"
        className={`px-2 ${my === 1 ? "border-brand-300 text-brand-700" : ""}`}
        onClick={() => doVote(1)}
      >
        ▲
      </Button>
      <div className="min-w-[2.5rem] text-center text-sm font-semibold text-gray-900">{count}</div>
      <Button
        variant="neutral"
        size="sm"
        className={`px-2 ${my === -1 ? "border-brand-300 text-brand-700" : ""}`}
        onClick={() => doVote(-1)}
      >
        ▼
      </Button>
    </div>
  );
}
