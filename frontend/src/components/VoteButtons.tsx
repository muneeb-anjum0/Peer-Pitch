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

  // Animation for vote count
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 350);
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl border bg-gradient-to-br from-gray-50 via-white to-brand-50 p-3 shadow-md"
      tabIndex={0}
      aria-label="Vote controls"
    >
      <Button
        variant="neutral"
        size="sm"
        className={`transition-all duration-150 px-2 py-1 rounded-lg focus:ring-2 focus:ring-brand-300 focus:outline-none ${my === 1 ? "bg-brand-100 text-brand-700 border-brand-300 shadow-lg" : "text-gray-500"} hover:bg-brand-50 hover:text-brand-700`}
        onClick={() => doVote(1)}
        aria-label="Upvote"
      >
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 6l7 10H7l7-10z" fill="currentColor" />
        </svg>
      </Button>
      <div
        className={`min-w-[2.5rem] text-center text-base font-semibold text-gray-900 select-none transition-transform duration-300 ${animate ? "scale-110 text-brand-700" : "scale-100"}`}
        aria-live="polite"
      >
        {count}
      </div>
      <Button
        variant="neutral"
        size="sm"
        className={`transition-all duration-150 px-2 py-1 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none ${my === -1 ? "bg-red-100 text-red-600 border-red-300 shadow-lg" : "text-gray-500"} hover:bg-red-50 hover:text-red-600`}
        onClick={() => doVote(-1)}
        aria-label="Downvote"
      >
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 22l-7-10h14l-7 10z" fill="currentColor" />
        </svg>
      </Button>
    </div>
  );
}
