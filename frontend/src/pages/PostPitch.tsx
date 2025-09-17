import { FormEvent, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { usePitches } from "../store/pitches";

export default function PostPitch() {
  const user = useAuth((s) => s.user);
  const createPitch = usePitches((s) => s.createPitch);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim() || !body.trim()) return;
    if (body.length > 1200) return; // simple guard
    setLoading(true);
    try {
      const created = await createPitch({
        title: title.trim(),
        body: body.trim(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 5),
      });
      navigate(`/pitch/${created._id}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-neutral-300">Please login to post a pitch.</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Post a Pitch</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-neutral-300">Title</label>
          <input
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 p-2 outline-none focus:ring-2 focus:ring-neutral-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Your startup idea in a nutshell"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-neutral-300">
            Pitch (max ~200 words)
          </label>
          <textarea
            className="min-h-40 w-full rounded-md border border-neutral-800 bg-neutral-950 p-2 outline-none focus:ring-2 focus:ring-neutral-700"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1200}
            placeholder="Describe the idea, target users, and why it matters…"
          />
          <div className="mt-1 text-right text-xs text-neutral-400">
            {body.length}/1200
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-neutral-300">
            Tags (comma separated, up to 5)
          </label>
          <input
            className="w-full rounded-md border border-neutral-800 bg-neutral-950 p-2 outline-none focus:ring-2 focus:ring-neutral-700"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="startup, ai, design"
          />
        </div>
        <div className="flex justify-end">
          <button
            disabled={loading || !title.trim() || !body.trim()}
            className="rounded-md bg-white px-4 py-2 font-semibold text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Publishing…" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
