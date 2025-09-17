import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0"></div>
      <div className="grid-overlay"></div>

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <div className="pill mb-6 animate-float">
            <span className="h-2 w-2 rounded-full bg-brand-500"></span>
            Pitch. Critique. Evolve.
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-6xl">
            Crowd-test your idea with <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-brand-700">brutal honesty</span>
              <span
                className="absolute inset-x-0 -bottom-1 z-0 h-3 rounded-md"
                style={{ background: "linear-gradient(90deg, rgba(42,148,255,.25), rgba(255,149,0,.25))" }}
              />
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-balance text-lg text-gray-600">
            Post a 200-word pitch. Get laser-focused feedback from peers. Watch an
            instant feasibility pulse form in real-time.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/post">
              <Button variant="primary" size="lg">Create a Pitch</Button>
            </Link>
            <Link to="/trending">
              <Button variant="neutral" size="lg">Explore Trending</Button>
            </Link>
          </div>

          {/* Orb visuals */}
          <div className="pointer-events-none relative mt-14 h-44 w-full">
            <div className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 animate-slow-spin rounded-full"
                 style={{ background: "radial-gradient(circle at 30% 30%, #6bb8ff, rgba(107,184,255,0) 60%)", filter: "blur(8px)" }}>
            </div>
            <div className="absolute left-[20%] top-6 h-28 w-28 animate-float rounded-full"
                 style={{ background: "radial-gradient(circle at 30% 30%, #ffd699, rgba(255,214,153,0) 60%)", filter: "blur(6px)" }}>
            </div>
            <div className="absolute right-[15%] top-10 h-32 w-32 animate-float rounded-full"
                 style={{ background: "radial-gradient(circle at 30% 30%, #b5f5d6, rgba(181,245,214,0) 60%)", filter: "blur(6px)", animationDelay: "1.5s" }}>
            </div>
          </div>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              ["2-min posting", "No fluff—just your core insight."],
              ["Live voting", "See momentum form, minute by minute."],
              ["Peer score", "Feasibility, originality, marketability."],
            ].map(([title, desc]) => (
              <div key={title} className="glass rounded-2xl p-6">
                <div className="text-sm font-semibold text-brand-700">{title}</div>
                <div className="mt-1 text-sm text-gray-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
