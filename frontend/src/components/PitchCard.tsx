import { Link } from "react-router-dom";
import type { Pitch } from "../types";
import VoteButtons from "./VoteButtons";
import { useState } from "react";

export default function PitchCard({ pitch }: { pitch: Pitch }) {
  const [open, setOpen] = useState(false);

  // demo comments (for dummy pitches)
  const demoComments = [
    { id: 1, author: "Sara", text: "This could really help students!" },
    { id: 2, author: "Ali", text: "Interesting but how would scaling work?" },
    { id: 3, author: "Maya", text: "Love the simplicity of this idea." },
  ];

  return (
    <article className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(16,24,40,.10)]">
      <div className="flex items-start gap-3">
        <VoteButtons pitchId={pitch._id} votes={pitch.votes} />
        <div className="flex-1">
          <Link to={`/pitch/${pitch._id}`} className="text-lg font-semibold text-gray-900 hover:underline">
            {pitch.title}
          </Link>
          <p className="mt-2 line-clamp-3 text-gray-600">{pitch.body}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>by {pitch.author.name}</span>
            <span>•</span>
            <time dateTime={pitch.createdAt}>
              {new Date(pitch.createdAt).toLocaleDateString()}
            </time>
            <span>•</span>
            <button
              onClick={() => setOpen((o) => !o)}
              className="hover:underline"
            >
              {pitch.commentCount} comments
            </button>
          </div>

          {/* Expandable comments */}
          {open && (
            <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
              {demoComments.map((c) => (
                <div key={c.id} className="text-sm">
                  <span className="font-medium text-gray-900">{c.author}</span>{" "}
                  <span className="text-gray-700">{c.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
