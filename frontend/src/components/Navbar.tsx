import { Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseLoginGoogle, firebaseLogout } from "../lib/firebase";
import { useAuth } from "../store/auth";
import Button from "./ui/Button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all ${
        scrolled ? "bg-white/80 backdrop-blur border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <button
          onClick={onLogoClick}
          className="text-lg font-black tracking-tight text-gray-900"
          aria-label="PulseProof Home"
        >
          PulseProof
        </button>

        <nav className="relative hidden sm:block">
          <div ref={containerRef} className="relative flex items-center gap-8">
            {tabs.map((t, i) => {
              const active = t.isActive(pathname);
              return (
                <button
                  key={t.to}
                  ref={el => (btnRefs.current[i] = el)}
                  onClick={() => navigate(t.to)}
                  className={`relative pb-1 text-sm font-medium transition-colors ${
                    active ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
            <span
              className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-brand-500 transition-[left,width] duration-300 ease-in-out"
              style={{
                left: slider ? `${slider.left}px` : "0px",
                width: slider ? `${slider.width}px` : "0px",
              }}
            />
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => (user ? navigate("/post") : firebaseLoginGoogle())}>
            <Button variant="primary" size="md">{user ? "Post" : "Login"}</Button>
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
        </div>
      </div>
    </header>
  );
}
