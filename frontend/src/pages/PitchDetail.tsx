import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePitches } from "../store/pitches";
import type { Comment, Pitch, Paginated } from "../types";
import VoteButtons from "../components/VoteButtons";
import CommentBox from "../components/CommentBox";

export default function PitchDetail() {
  const { id } = useParams<{ id: string }>();
  const { getPitch, getComments } = usePitches.getState();

  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const p = await getPitch(id);
      const c = await getComments(id);
      setPitch(p);
      setComments((c as Paginated<Comment>).items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  if (loading) return <div className="text-gray-500">Loading…</div>;
  if (!pitch) return <div className="text-gray-500">Pitch not found.</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,.04)]">
        <div className="flex items-start gap-3">
          <VoteButtons pitchId={pitch._id} votes={pitch.votes} />
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900">{pitch.title}</h1>
            <div className="mt-2 whitespace-pre-wrap text-gray-700">{pitch.body}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span>by {pitch.author.name}</span>
              <span>•</span>
              <time dateTime={pitch.createdAt}>
                {new Date(pitch.createdAt).toLocaleString()}
              </time>
              <div className="ml-auto flex flex-wrap gap-1">
                {pitch.tags.map((t) => (
                  <span key={t} className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
        <CommentBox pitchId={pitch._id} onPosted={load} />
        <div className="space-y-3">
          {comments.length === 0 && (
            <div className="text-sm text-gray-500">No comments yet.</div>
          )}
          {comments.map((c) => (
            <div
              key={c._id}
              className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,.04)]"
            >
              <div className="text-sm">
                <span className="font-medium text-gray-900">{c.author.name}</span>{" "}
                <span className="text-gray-500">
                  • {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-gray-800">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
