import { FormEvent, useState } from "react";
import { useAuth } from "../store/auth";
import { usePitches } from "../store/pitches";

export default function CommentBox({ pitchId, onPosted }: { pitchId: string; onPosted: () => void }) {
  const user = useAuth((s) => s.user);
  const postComment = usePitches((s) => s.postComment);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !body.trim()) return;
    setLoading(true);
    try {
      await postComment(pitchId, body.trim());
      setBody("");
      onPosted();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,.04)]">
      <textarea
        className="min-h-24 w-full resize-y rounded-xl border border-gray-200 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-300"
        placeholder={user ? "Write a thoughtful comment..." : "Login to comment"}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        disabled={!user || loading}
      />
      <div className="mt-2 flex justify-end">
        <button
          disabled={!user || loading || !body.trim()}
          className="btn px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Posting…" : "Post Comment"}
          <span className="shine" />
        </button>
      </div>
    </form>
  );
}
