import { useEffect } from "react";
import { useAuth } from "../store/auth";
import ThemedLogin from "../components/auth/ThemedLogin";
import CreateIdeaForm from "../components/post/CreateIdeaForm";

export default function Post() {
  const user = useAuth((s) => s.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2f4f7 1px, transparent 1px), linear-gradient(to bottom, #f2f4f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Soft fade mask */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
        }}
      />

      {!user ? (
        <ThemedLogin />
      ) : (
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-24">
          <header className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              You’re signed in — let’s proof an idea
            </div>
            <h1 className="mt-4 text-4xl font-black text-gray-900 sm:text-5xl">
              Create a new idea
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Keep it to ~200 words, add a few tags, and hit publish. The crowd will take it from there.
            </p>
            <div className="mt-6 h-px w-28 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </header>

          <div className="mt-10">
            <CreateIdeaForm />
          </div>
        </div>
      )}
    </div>
  );
}
