import { Link, NavLink, useNavigate } from "react-router-dom";
import { firebaseLoginGoogle, firebaseLogout } from "../lib/firebase";
import { useAuth } from "../store/auth";
import Button from "./ui/Button";
import { useEffect, useRef, useState } from "react";

const linkBase =
  "relative rounded-xl px-3 py-2 text-sm font-medium transition";
const active =
  "text-gray-900 after:absolute after:inset-x-3 after:-bottom-[2px] after:h-[2px] after:rounded-full after:bg-brand-500";
const inactive =
  "text-gray-600 hover:text-gray-900";

export default function Navbar({ onLogoClick }: { onLogoClick?: () => void }) {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-white/80 backdrop-blur ${scrolled ? "border-b border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,.04)]" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Brand */}
        <button
          onClick={onLogoClick}
          className="text-lg font-black tracking-tight text-gray-900"
          aria-label="PeerPitch Home"
        >
          PeerPitch
        </button>

        {/* Center search */}
        <div className="hidden min-w-[360px] max-w-md flex-1 items-center sm:flex">
          <div className="group relative w-full">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pitches, tags, people…"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 pl-10 text-sm text-gray-900 placeholder:text-gray-400 shadow-soft transition focus:border-brand-300"
            />
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-500">⌘K</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>Home</NavLink>
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
              className={`${linkBase} ${inactive} hover:text-gray-900`}
            >
              Discover
              <svg className="ml-1 inline h-4 w-4 align-middle text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-[560px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_24px_80px_rgba(16,24,40,.12)]">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { to:"/trending", title:"Trending", desc:"What’s getting heat right now" },
                    { to:"/new", title:"Newest", desc:"Fresh drops, zero dust" },
                    { to:"/post", title:"Pitch of the day", desc:"Daily micro-prompt challenge" },
                    { to:"/trending?room=ai", title:"AI room", desc:"Models, agents, copilots" },
                  ].map((i)=>(
                    <Link key={i.title} to={i.to} className="group rounded-xl border border-gray-100 p-3 transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(16,24,40,.10)]">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">{i.title}</div>
                        <span className="opacity-0 transition group-hover:opacity-100">→</span>
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">{i.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink to="/new" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>New</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => (user ? navigate("/post") : firebaseLoginGoogle())}
            className="hidden sm:block"
          >
            <Button variant="primary" size="md">{user ? "Create Pitch" : "Login"}</Button>
          </button>
          {user && (
            <>
              <button onClick={() => firebaseLogout()}>
                <Button variant="neutral" size="md">Logout</Button>
              </button>
              <Link to="/" className="ml-1 flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" className="h-9 w-9 rounded-full ring-1 ring-gray-200" />
                ) : (
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700 ring-1 ring-gray-200">
                    {user.displayName?.[0] ?? "U"}
                  </div>
                )}
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="sm:hidden rounded-xl border border-gray-200 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="mb-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search pitches, tags, people…"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-soft focus:border-brand-300"
              />
            </div>
            <nav className="grid gap-2">
              <NavLink to="/" onClick={()=>setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Home</NavLink>
              <NavLink to="/trending" onClick={()=>setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Trending</NavLink>
              <NavLink to="/new" onClick={()=>setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">New</NavLink>
              <NavLink to="/post" onClick={()=>setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{user ? "Create Pitch" : "Login"}</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
