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
    <Link
      to={`/pitch/${pitch._id}`}
      className="block group rounded-2xl border border-gray-200 bg-white p-5 shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-300"
      tabIndex={0}
    >
      <div className="flex items-start gap-4">
        {/* Prevent click propagation for VoteButtons */}
        <div onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
          <VoteButtons pitchId={pitch._id} votes={pitch.votes} />
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-gray-900 group-hover:text-brand-700">
            {pitch.title}
          </div>
          <p className="mt-2 line-clamp-3 text-gray-700 text-base">{pitch.body}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2c0-3.33-6.67-5-10-5z" fill="currentColor"/></svg>
              <span>by {pitch.author.name}</span>
            </span>
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v2h10V4h2v2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2V4h2zm0 4v10h10V8H7z" fill="currentColor"/></svg>
              <time dateTime={pitch.createdAt}>
                {new Date(pitch.createdAt).toLocaleDateString()}
              </time>
            </span>
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="currentColor"/></svg>
              <button
                onClick={e => { e.stopPropagation(); setOpen((o) => !o); }}
                className="hover:underline text-brand-700 font-medium"
              >
                {pitch.commentCount} comments
              </button>
            </span>
          </div>

          {/* Expandable comments */}
          {open && (
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              {demoComments.map((c) => (
                <div key={c.id} className="text-sm">
                  <span className="font-semibold text-brand-700">{c.author}</span>{" "}
                  <span className="text-gray-700">{c.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
