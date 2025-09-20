import EmailPasswordLogin from "../components/auth/EmailPasswordLogin";
// Extend Window type for SSR hydration
import type { Pitch } from "../types";
import type { Analytics } from "../store/pitches";
declare global {
  interface Window {
    __MY_ANALYTICS__?: Analytics;
    __MY_PITCHES__?: Pitch[];
  }
}
import React, { useEffect } from "react";
import { firebaseLoginGoogle } from "../lib/firebase";

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

  // Use hydration methods directly from store
  const myAnalytics = usePitches((s) => s.myAnalytics);
  const myPitches = usePitches((s) => s.myPitches);
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    // SSR hydration: use window.__MY_ANALYTICS__ and window.__MY_PITCHES__ if available
    if (user) {
      if (window.__MY_ANALYTICS__) {
  usePitches.getState().fetchMyAnalytics(window.__MY_ANALYTICS__);
      } else {
  usePitches.getState().fetchMyAnalytics();
      }
      if (Array.isArray(window.__MY_PITCHES__)) {
  usePitches.getState().fetchMyPitches(window.__MY_PITCHES__);
      } else {
  usePitches.getState().fetchMyPitches();
      }
    }
  }, [user]);

  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showEmailLogin, setShowEmailLogin] = React.useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-xl shadow border border-blue-100 px-7 py-8 flex flex-col items-center gap-5" style={{ boxShadow: '0 4px 16px rgba(42,148,255,0.08)' }}>
          {/* Minimal Analytics Icon */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-2">
            <rect x="2" y="2" width="36" height="36" rx="10" fill="#F3F8FF" />
            <path d="M10 28L16 20L22 24L30 12" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="28" r="1.5" fill="#2563eb" />
            <circle cx="16" cy="20" r="1.5" fill="#2563eb" />
            <circle cx="22" cy="24" r="1.5" fill="#2563eb" />
            <circle cx="30" cy="12" r="1.5" fill="#2563eb" />
          </svg>
          <h1 className="text-xl font-bold text-brand-700 text-center">Sign in to unlock analytics</h1>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Get insights, track your ideas, and see your pitch performance. Sign in to access your dashboard.
          </p>
          <button
            className="mt-2 px-5 py-2 rounded-full bg-white text-brand-600 font-semibold text-sm shadow-sm border border-gray-200 hover:border-brand-600 transition-all focus:outline-none focus:ring-2 focus:ring-brand-100"
            onClick={() => setShowLoginModal(true)}
          >
            Sign in to PulseProof
          </button>
        </div>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center w-full max-w-md animate-waterDrop">
              <h2 className="mb-4 text-lg font-bold text-gray-900 text-center">Sign in to PulseProof</h2>
              {!showEmailLogin && (
                <>
                  <button
                    className="w-full mb-4 flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-base font-semibold shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
                    style={{ boxShadow: '0 1px 2px rgba(60,64,67,.08)' }}
                    onClick={() => { setShowLoginModal(false); firebaseLoginGoogle(); }}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <g>
                        <path d="M21.6 12.227c0-.638-.057-1.252-.164-1.84H12v3.481h5.37a4.593 4.593 0 0 1-1.993 3.013v2.497h3.217c1.885-1.737 2.976-4.297 2.976-7.151z" fill="#4285F4"/>
                        <path d="M12 22c2.7 0 4.97-.89 6.627-2.419l-3.217-2.497c-.894.6-2.037.96-3.41.96-2.626 0-4.85-1.773-5.646-4.155H3.025v2.61A9.997 9.997 0 0 0 12 22z" fill="#34A853"/>
                        <path d="M6.354 13.889A5.996 5.996 0 0 1 6 12c0-.654.112-1.287.314-1.889V7.501H3.025A9.997 9.997 0 0 0 2 12c0 1.654.4 3.215 1.025 4.499l3.329-2.61z" fill="#FBBC05"/>
                        <path d="M12 6.579c1.47 0 2.786.506 3.825 1.497l2.868-2.868C16.97 3.89 14.7 3 12 3A9.997 9.997 0 0 0 3.025 7.501l3.329 2.61C7.15 8.352 9.374 6.579 12 6.579z" fill="#EA4335"/>
                      </g>
                    </svg>
                    <span className="text-brand-600 font-semibold">Continue with Google</span>
                  </button>
                  <button
                    className="w-full mb-2 text-base text-brand-600 font-semibold rounded-full border border-brand-100 bg-brand-50 py-2 transition hover:bg-brand-100"
                    onClick={() => setShowEmailLogin(true)}
                  >
                    Sign in with Email
                  </button>
                </>
              )}
              {showEmailLogin && (
                <>
                  <div className="mb-2 text-center text-xs text-gray-500">Sign in with your email address</div>
                  <EmailPasswordLogin onSuccess={() => setShowLoginModal(false)} />
                </>
              )}
              <button className="mt-4 text-sm text-gray-500 hover:text-brand-600" onClick={() => { setShowLoginModal(false); setShowEmailLogin(false); }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );

  if (!myAnalytics) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-gray-500">
        Loading your analytics…
      </div>
    );
  }

  // Defensive: ensure myAnalytics is not null for below usages
  if (!myAnalytics) return null;
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
          <div className="text-5xl font-black text-gray-900 mb-2">{myAnalytics?.totalPitches ?? 0}</div>
          <div className="text-gray-500">Total ideas you have pitched to the community.</div>
        </div>
        <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Total Likes</h2>
          <div className="text-5xl font-black text-gray-900 mb-2">{myAnalytics?.totalVotes ?? 0}</div>
          <div className="text-gray-500">Total likes (votes) received on your ideas.</div>
        </div>
        <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Total Comments</h2>
          <div className="text-5xl font-black text-gray-900 mb-2">{myAnalytics?.totalComments ?? 0}</div>
          <div className="text-gray-500">Total comments received on your ideas.</div>
        </div>
        <div className="rounded-2xl border border-brand-200 bg-white p-3 shadow-sm transition-transform duration-200 hover:scale-105">
          <h2 className="text-xl font-bold text-brand-700 mb-4">Last Idea Posted</h2>
          <div className="text-lg font-semibold text-gray-900 mb-7">{myAnalytics?.lastPosted ? formatDateFancy(String(myAnalytics.lastPosted)) : "Never"}</div>
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
                      onClick={() => {
                        if (p._id) {
                          //
                          navigate(`/analytics/super/${p._id}`);
                        } else {
                          //
                          alert('Pitch ID is missing. Cannot open super tools for this pitch.');
                        }
                      }}
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
