import { useState } from "react";
import Button from "./ui/Button";

type Comment = {
  _id: string;
  author: { uid: string; name: string; photoURL?: string };
  body: string;
  createdAt: string;
};

export default function CommentThread({
  pitchId,
  comments,
  onSubmit,
}: {
  pitchId: string;
  comments: Comment[];
  onSubmit: (text: string) => Promise<void> | void;
}) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(text.trim());
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4">
      {/* List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              {c.author.photoURL ? (
                <img src={c.author.photoURL} alt="" className="h-8 w-8 rounded-full ring-1 ring-gray-200" />
              ) : (
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                  {c.author.name[0]}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium text-gray-900">{c.author.name}</span>
                  <span>•</span>
                  <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleString()}</time>
                </div>
                <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">{c.body}</p>
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center text-gray-500">
            Be the first to leave proof.
          </div>
        )}
      </div>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-start gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share constructive feedback…"
          className="min-h-[80px] flex-1 resize-y rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-300"
        />
        <Button type="submit" variant="primary" className="self-end" disabled={submitting || !text.trim()}>
          {submitting ? "Posting…" : "Post"}
        </Button>
      </form>
    </div>
  );
}
