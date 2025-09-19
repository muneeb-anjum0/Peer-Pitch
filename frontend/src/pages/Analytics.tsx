import { useEffect } from "react";

function formatDateFancy(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";
  return `${day}${suffix} ${month} ${year}`;
}
import { usePitches } from "../store/pitches";
import { useNavigate } from "react-router-dom";
import StatBar from "../components/StatBar";
import Button from "../components/ui/Button";
import { useAuth } from "../store/auth";

export default function Analytics() {

  const fetchMyAnalytics = usePitches((s) => s.fetchMyAnalytics);
  const fetchMyPitches = usePitches((s) => s.fetchMyPitches);
  const myAnalytics = usePitches((s) => s.myAnalytics);
  const myPitches = usePitches((s) => s.myPitches);
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchMyAnalytics();
      fetchMyPitches("created");
    }
  }, [fetchMyAnalytics, fetchMyPitches, user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">
        Please log in to view your analytics.
      </div>
    );
  }

  if (!myAnalytics) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">
        Loading your analytics…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-24">
      <div className="mb-8 flex items-center gap-3">
  <h2 className="text-4xl font-black text-gray-900">Your <span className="text-brand-600">Analytics</span></h2>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
  <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Ideas Pitched</h2>
          <div className="text-5xl font-black text-gray-900 mb-2">{myAnalytics.totalPitches}</div>
          <div className="text-gray-500">Total ideas you have pitched to the community.</div>
        </div>
  <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Total Likes</h2>
          <div className="text-5xl font-black text-gray-900 mb-2">{myAnalytics.totalVotes}</div>
          <div className="text-gray-500">Total likes (votes) received on your ideas.</div>
        </div>
  <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Total Comments</h2>
          <div className="text-5xl font-black text-gray-900 mb-2">{myAnalytics.totalComments}</div>
          <div className="text-gray-500">Total comments received on your ideas.</div>
        </div>
  <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Last Idea Posted</h2>
          <div className="text-lg font-semibold text-gray-900 mb-7">{myAnalytics.lastPosted ? formatDateFancy(myAnalytics.lastPosted) : "Never"}</div>
          <div className="text-gray-500">Date and time of your last pitch.</div>
        </div>
      </div>
      <div className="mt-12">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-4xl font-black text-gray-900">Your <span className="text-brand-600">Ideas</span></h2>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white shadow-md">
          <ul className="divide-y divide-gray-100">
            {myPitches.length === 0 && (
              <li className="p-8 text-center text-gray-400">No ideas pitched yet.</li>
            )}
            {myPitches.map((p, i) => (
              <li
                key={p._id || i}
                className="group cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-4 px-6 py-4 bg-white border border-brand-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-brand-500 transition-all duration-200"
                onClick={() => navigate(`/pitches/${p._id}`)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-lg text-brand-700 group-hover:text-brand-600">{p.title}</span>
                    <span className="ml-2 px-2 py-0.5 rounded bg-brand-50 text-brand-600 text-xs font-semibold">{p.tags?.join(", ")}</span>
                  </div>
                  <div className="text-gray-900 mb-2 line-clamp-2">{p.body}</div>
                  <div className="flex gap-6 text-sm">
                    <span className="text-black"><b>{p.votes}</b> <span className="text-brand-600">votes</span></span>
                    <span className="text-black"><b>{p.commentCount}</b> <span className="text-brand-600">comments</span></span>
                    <span className="text-black">Posted: <span className="text-brand-600">{formatDateFancy(p.createdAt)}</span></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
