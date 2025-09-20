import { Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseLoginGoogle, firebaseLogout } from "../lib/firebase";
import { useAuth } from "../store/auth";
import Button from "./ui/Button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import EmailPasswordLogin from "./auth/EmailPasswordLogin";

export default function Navbar({ onLogoClick }: { onLogoClick?: () => void }) {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tabs = [
    { label: "Home", to: "/", isActive: (p: string) => p === "/" },
    { label: "Trending", to: "/trending", isActive: (p: string) => p.startsWith("/trending") },
    { label: "New", to: "/new", isActive: (p: string) => p.startsWith("/new") },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slider, setSlider] = useState<{ left: number; width: number } | null>(null);

  const updateSlider = () => {
    const idx = Math.max(0, tabs.findIndex(t => t.isActive(pathname)));
    const el = btnRefs.current[idx];
    const container = containerRef.current;
    if (!el || !container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setSlider({ left: eRect.left - cRect.left, width: eRect.width });
  };

  useLayoutEffect(() => { updateSlider(); }, [pathname]);
  useEffect(() => {
    const onResize = () => updateSlider();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLoginModal((open) => !open);
  };

  const closeModal = () => setShowLoginModal(false);
    // State for showing email login in profile modal
    const [showEmailLogin, setShowEmailLogin] = useState(false);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all ${
        scrolled ? "bg-white/80 backdrop-blur border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <span
          onClick={onLogoClick}
          className="cursor-pointer text-xl font-black tracking-tight text-gray-900 px-0 py-0 bg-transparent border-none shadow-none hover:bg-transparent"
          aria-label="PulseProof Home"
        >
          PulseProof
        </span>

        <nav className="relative hidden sm:block">
          <div ref={containerRef} className="relative flex items-center gap-8 -ml-20">
            {tabs.map((t, i) => {
              const active = t.isActive(pathname);
              return (
                <button
                  key={t.to}
                    ref={el => { btnRefs.current[i] = el; }}
                  onClick={() => navigate(t.to)}
                  className={`relative pb-1 text-sm font-medium transition-colors ${
                    active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
            {tabs.some(t => t.isActive(pathname)) && (
              <span
                className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-brand-500 transition-[left,width] duration-300 ease-in-out"
                style={{
                  left: slider ? `${slider.left}px` : "0px",
                  width: slider ? `${slider.width}px` : "0px",
                }}
              />
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative ml-1 flex items-center gap-2">
              <button
                className={`h-9 w-9 rounded-full bg-gray-100 ring-1 flex items-center justify-center transition-all duration-300 hover:ring-2 hover:ring-brand-500 ${showLoginModal ? "ring-2 ring-brand-500 shadow-lg scale-105" : "ring-gray-200"}`}
                title="Profile"
                onClick={handleProfileClick}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className={`h-9 w-9 rounded-full`}
                  />
                ) : (
                  <div
                    className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700"
                  >
                    {user.displayName?.[0] ?? "U"}
                  </div>
                )}
              </button>
              {showLoginModal && (
                <div className="absolute top-12 right-0 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col gap-4" style={{ minWidth: '20rem', boxShadow: '0 8px 32px rgba(42,148,255,0.10)' }}>
                  <div className="flex flex-col items-center gap-1 mb-1">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-xl font-bold text-brand-600 border border-brand-100">
                      {user.photoURL ? <img src={user.photoURL} alt="avatar" className="h-10 w-10 rounded-full object-cover" /> : (user.displayName?.[0] ?? "U")}
                    </div>
                    <div className="mt-2 text-lg font-extrabold text-gray-900 text-center leading-tight">
                      {user.displayName ?? user.email}
                    </div>
                    <div className="text-sm text-gray-500 text-center break-all">
                      {user.email}
                    </div>
                  </div>
                  <div className="w-full border-t border-gray-100 my-2" />
                  <div className="flex flex-col gap-2">
                    <button
                      className="w-full rounded-full bg-brand-600 text-white font-semibold py-2 transition hover:bg-brand-700 shadow-sm"
                      onClick={() => { closeModal(); navigate('/post'); }}
                    >
                      Post an Idea
                    </button>
                    <button
                      className="w-full rounded-full bg-blue-50 text-brand-700 font-semibold py-2 border border-blue-100 transition hover:bg-blue-100 hover:border-brand-300"
                      onClick={() => { closeModal(); navigate('/analytics'); }}
                    >
                      Analytics
                    </button>
                    <button
                      className="w-full rounded-full bg-yellow-50 text-yellow-900 font-semibold py-2 border border-yellow-100 transition hover:bg-yellow-100 hover:border-yellow-300"
                      onClick={() => { closeModal(); firebaseLogout(); }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative ml-1 flex items-center gap-2">
              <button
                className={`h-9 w-9 rounded-full bg-gray-100 ring-1 flex items-center justify-center transition-all duration-300 hover:ring-2 hover:ring-brand-500 ${showLoginModal ? "ring-2 ring-brand-500 shadow-lg scale-105" : "ring-gray-200"}`}
                title="Profile"
                onClick={handleProfileClick}
              >
                {/* Empty profile icon (outline user) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1 1 8.25 9a3.75 3.75 0 0 1 7.5 0zM4.5 19.25v-.5A4.75 4.75 0 0 1 9.25 14h5.5a4.75 4.75 0 0 1 4.75 4.75v.5"
                  />
                </svg>
              </button>
              {showLoginModal && (
                <div 
                  className="absolute top-12 right-0 z-50 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col animate-waterDrop"
                  style={{ minWidth: '20rem', boxShadow: '0 8px 32px rgba(42,148,255,0.10)' }}
                >
                  <h2 className="mb-4 text-lg font-bold text-gray-900 text-center">Sign in to PulseProof</h2>
                  {!showEmailLogin && (
                    <>
                      <button
                        className="w-full mb-4 flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-base font-semibold shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
                        style={{ boxShadow: '0 1px 2px rgba(60,64,67,.08)' }}
                        onClick={firebaseLoginGoogle}
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
                        className="w-full mb-2 flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-base font-semibold shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
                        style={{ boxShadow: '0 1px 2px rgba(60,64,67,.08)' }}
                        onClick={() => setShowEmailLogin(true)}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="6" width="18" height="12" rx="3" stroke="#2563eb" strokeWidth="2" fill="none"/>
                          <path d="M4 8l8 6 8-6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-brand-600 font-semibold">Sign in with Email</span>
                      </button>
                    </>
                  )}
                  {showEmailLogin && (
                    <>
                      <button
                        className="mb-2 self-start p-1 rounded-full hover:bg-brand-50 transition focus:outline-none focus:ring-1 focus:ring-brand-100"
                        onClick={() => setShowEmailLogin(false)}
                        type="button"
                        aria-label="Back to login options"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <EmailPasswordLogin onSuccess={() => { setShowEmailLogin(false); closeModal(); }} />
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
