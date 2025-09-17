import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { listenAuth } from "./lib/firebase";
import { useEffect } from "react";
import { useAuth } from "./store/auth";
import type { User } from "firebase/auth";
import Footer from "./components/Footer";

export default function App() {
  const setUser = useAuth((s) => s.setUser);
  const navigate = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const unsub = listenAuth((u: User | null) => {
      if (u) {
        setUser({
          uid: u.uid,
          displayName: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [setUser]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [loc.pathname]);

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      <Navbar onLogoClick={() => navigate("/")} />
      <main className="mx-auto w-full max-w-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
