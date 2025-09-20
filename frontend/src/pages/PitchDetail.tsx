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
    // Only fetch pitch if not loaded and not explicitly null (not found)
    if (pitch === undefined) {
      fetchById(id);
    }
    // Only fetch comments if not loaded or empty
    if (!Array.isArray(comments) || comments.length === 0) {
      fetchComments(id);
    }
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
          <div className="grid gap-4 md:grid-cols-[1fr,300px]">
            {/* Main column */}
            <article
              className="rounded-2xl border border-gray-100 p-5 shadow-md transition-all duration-200 hover:shadow-lg"
              style={{
                background:
                  "radial-gradient(circle at 18% 22%, rgba(224,242,255,0.14) 16%, transparent 70%), " +
                  "radial-gradient(circle at 82% 78%, rgba(255,251,229,0.14) 18%, transparent 70%), white"
              }}
            >
              {/* Title + votes */}
              <div className="flex items-start gap-4 pb-2 border-b border-gray-100 mb-6">
                <VoteButtons pitchId={pitch._id} votes={pitch.votes} />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {pitch.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-2">
                    <img src={pitch.author.photoURL || '/vite.svg'} alt={pitch.author.name} className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{pitch.author.name}</div>
                      <div className="text-sm text-gray-500 flex gap-2 items-center">
                        <time dateTime={pitch.createdAt}>{new Date(pitch.createdAt).toLocaleString()}</time>
                        {pitch.updatedAt !== pitch.createdAt && (
                          <span className="ml-2">• updated {new Date(pitch.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Tags */}
                  {!!(Array.isArray(pitch.tags) && pitch.tags.length) && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {pitch.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 font-medium tracking-wide"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="mt-6">
                <div className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">
                  {pitch.body}
                </div>
                <hr className="my-4 border-t border-gray-100" />
              </div>

              {/* Comments */}
              <section className="mt-8">
                <div className="rounded-xl border border-gray-100 p-4 shadow transition-all duration-200 hover:shadow-md" style={{background: "radial-gradient(circle at 18% 22%, rgba(224,242,255,0.10) 16%, transparent 70%), radial-gradient(circle at 82% 78%, rgba(255,251,229,0.10) 18%, transparent 70%), white"}}>
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    Discussion <span className="text-gray-500">({comments.length})</span>
                  </h2>
                  <CommentThread
                    pitchId={pitch._id}
                    comments={comments}
                    onSubmit={async (text) => postComment(pitch._id, text)}
                  />
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="space-y-4">
              <div
                className="rounded-xl border border-gray-100 p-4 shadow transition-all duration-200 hover:shadow-md flex flex-col gap-3"
                style={{
                  background:
                    "radial-gradient(circle at 18% 22%, rgba(224,242,255,0.10) 16%, transparent 70%), " +
                    "radial-gradient(circle at 82% 78%, rgba(255,251,229,0.10) 18%, transparent 70%), white"
                }}
              >
                <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-3.33 0-10 1.67-10 5v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2c0-3.33-6.67-5-10-5z" fill="#2A94FF"/></svg>
                  Idea stats
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">Votes</div>
                    <div className="text-lg font-bold text-brand-700">{pitch.votes}</div>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">Comments</div>
                    <div className="text-lg font-bold text-brand-700">{comments.length}</div>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 col-span-2 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-1">Posted</div>
                    <div className="text-sm text-gray-800">
                      {new Date(pitch.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl border border-gray-100 p-4 shadow transition-all duration-200 hover:shadow-md"
                style={{
                  background:
                    "radial-gradient(circle at 18% 22%, rgba(224,242,255,0.10) 16%, transparent 70%), " +
                    "radial-gradient(circle at 82% 78%, rgba(255,251,229,0.10) 18%, transparent 70%), white"
                }}
              >
                <h3 className="text-base font-bold text-gray-900 mb-1">Next steps</h3>
                <ul className="mt-1 list-none text-sm text-gray-700 space-y-1">
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-brand-500"></span>Invite peers who’d get this</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-brand-500"></span>Clarify your target user</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-brand-500"></span>Define success metrics</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
