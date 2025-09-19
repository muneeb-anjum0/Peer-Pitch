import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePitches } from "../store/pitches";
import CommentThread from "../components/CommentThread";
import VoteButtons from "../components/VoteButtons";

export default function PitchDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const pitch = usePitches((s) => (id ? s.byId[id] : undefined));
  const loadingPitch = usePitches((s) => s.loadingPitch);
  const commentsRaw = usePitches((s) => (id ? s.commentsByPitch[id] : []));
  const comments = Array.isArray(commentsRaw) ? commentsRaw : [];
  const fetchById = usePitches((s) => s.fetchById);
  const fetchComments = usePitches((s) => s.fetchComments);
  const postComment = usePitches((s) => s.postComment);

  useEffect(() => {
    if (!id) return;
    fetchById(id);
    fetchComments(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (pitch?.title) {
      document.title = `${pitch.title} — PulseProof`;
    }
  }, [pitch]);

  if (!id) return null;

  // Not found → redirect to NotFound page after loading attempt
  if (!loadingPitch && pitch === null) {
    navigate("/not-found", { replace: true });
  }

  return (
    <div className="relative">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2f4f7 1px, transparent 1px), linear-gradient(to bottom, #f2f4f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/trending" className="hover:text-gray-700">Ideas</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Details</span>
        </nav>

        {/* Loading skeleton */}
        {loadingPitch && (
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_18px_60px_rgba(16,24,40,.06)]">
            <div className="h-7 w-3/4 rounded bg-gray-100" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />
            <div className="mt-6 h-4 w-full rounded bg-gray-100" />
            <div className="mt-2 h-4 w-4/5 rounded bg-gray-100" />
            <div className="mt-2 h-4 w-3/5 rounded bg-gray-100" />
          </div>
        )}

        {/* Content */}
        {!loadingPitch && pitch && (
          <div className="grid gap-6 md:grid-cols-[1fr,320px]">
            {/* Main column */}
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_18px_60px_rgba(16,24,40,.06)]">
              {/* Title + votes */}
              <div className="flex items-start gap-4">
                <VoteButtons pitchId={pitch._id} votes={pitch.votes} />
                <div className="flex-1">
                  <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                    {pitch.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{pitch.author.name}</span>
                    <span>•</span>
                    <time dateTime={pitch.createdAt}>
                      {new Date(pitch.createdAt).toLocaleString()}
                    </time>
                    {pitch.updatedAt !== pitch.createdAt && (
                      <>
                        <span>•</span>
                        <span>updated {new Date(pitch.updatedAt).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                  {/* Tags */}
                  {!!(Array.isArray(pitch.tags) && pitch.tags.length) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pitch.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="prose prose-gray mt-6 max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {pitch.body}
                </p>
              </div>

              {/* Comments */}
              <section className="mt-10 border-t border-gray-100 pt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Discussion <span className="text-gray-500">({comments.length})</span>
                </h2>
                <CommentThread
                  pitchId={pitch._id}
                  comments={comments}
                  onSubmit={async (text) => postComment(pitch._id, text)}
                />
              </section>
            </article>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Idea stats</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                    <div className="text-xs text-gray-500">Votes</div>
                    <div className="text-lg font-semibold text-gray-900">{pitch.votes}</div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                    <div className="text-xs text-gray-500">Comments</div>
                    <div className="text-lg font-semibold text-gray-900">{comments.length}</div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 col-span-2">
                    <div className="text-xs text-gray-500">Posted</div>
                    <div className="text-sm text-gray-800">
                      {new Date(pitch.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Next steps</h3>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
                  <li>Invite peers who’d get this</li>
                  <li>Clarify your target user</li>
                  <li>Define success metrics</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
