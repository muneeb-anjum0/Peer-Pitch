import { Link } from "react-router-dom";
import type { Pitch } from "../types";
import VoteButtons from "./VoteButtons";

export default function PitchCard({ pitch }: { pitch: Pitch }) {
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
            <span>{pitch.commentCount} comments</span>
            <div className="ml-auto flex flex-wrap gap-1">
              {pitch.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-700 shadow-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
