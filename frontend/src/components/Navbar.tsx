import { Link, NavLink, useNavigate } from "react-router-dom";
import { firebaseLoginGoogle, firebaseLogout } from "../lib/firebase";
import { useAuth } from "../store/auth";
import Button from "./ui/Button";
import { useEffect, useState } from "react";

const linkBase = "relative px-3 py-2 text-sm font-medium transition";
const active = "text-gray-900 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-brand-500";
const inactive = "text-gray-600 hover:text-gray-900";

export default function Navbar({ onLogoClick }: { onLogoClick?: () => void }) {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button
          onClick={onLogoClick}
          className="text-lg font-black tracking-tight text-gray-900"
          aria-label="PeerPitch Home"
        >
          PeerPitch
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            Home
          </NavLink>
          <NavLink to="/trending" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            Trending
          </NavLink>
          <NavLink to="/new" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>
            New
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => (user ? navigate("/post") : firebaseLoginGoogle())}>
            <Button variant="primary" size="md">{user ? "Post" : "Login"}</Button>
          </button>
          {user && (
            <button onClick={() => firebaseLogout()} className="ml-2">
              <Button variant="neutral" size="md">Logout</Button>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
