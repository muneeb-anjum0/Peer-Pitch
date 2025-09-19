import { useState, useMemo } from "react";
import Button from "../ui/Button";
import { usePitches } from "../../store/pitches";
import { auth } from "../../lib/firebase";

function CreateIdeaForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const postPitch = usePitches((s) => s.postPitch);
  const fetchTrending = usePitches((s) => s.fetchTrending);
  const fetchLatest = usePitches((s) => s.fetchLatest);

  const wordCount = useMemo(() => {
    const words = body.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [body]);

  const tooLong = wordCount > 220; // soft guard for ~200 words

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to publish an idea.");
      return;
    }
    if (body.trim().length < 30) {
      alert("Idea must be at least 30 characters.");
      return;
    }
    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 5);
    const payload = {
      title,
      body,
      tags: tagsArray
    };
    try {
      const created = await postPitch(payload);
      alert("Published!"); // replace with toast
      // optionally navigate to detail: navigate(`/pitch/${created._id}`)
      setTitle("");
      setBody("");
      setTags("");
      // Refresh lists so new pitch appears immediately
      fetchTrending();
      fetchLatest();
    } catch (err: any) {
      alert(err?.message ?? "Failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your idea a sharp title"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-brand-300"
          required
          maxLength={120}
        />
      </div>

      <div>
        <div className="flex items-end justify-between">
          <label className="block text-sm font-semibold text-gray-800">
            Idea (≈200 words)
          </label>
          <span className={`text-xs ${tooLong ? "text-red-600" : "text-gray-500"}`}>
            {wordCount} words
          </span>
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Explain the core insight, who it’s for, and why now."
          className="mt-2 h-40 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-brand-300"
          required
        />
        {tooLong && (
          <p className="mt-1 text-xs text-red-600">
            Try to keep it close to ~200 words for sharper feedback.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800">
          Tags (comma separated)
        </label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. AI, Education, Community"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-brand-300"
        />
        <p className="mt-1 text-xs text-gray-500">
          Add up to 5 tags to help the right peers find your idea.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Be kind. Be specific. Be useful.
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="disabled:opacity-50"
          disabled={!title || !body || tooLong}
        >
          Publish idea
        </Button>
      </div>
    </form>
  );
}

export default CreateIdeaForm;
