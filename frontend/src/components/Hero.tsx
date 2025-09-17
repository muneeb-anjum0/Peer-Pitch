import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle grid background (no orbs) */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2f4f7 1px, transparent 1px), linear-gradient(to bottom, #f2f4f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Soft fade mask so the grid doesn’t feel harsh */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          maskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
        }}
      />

      {/* Content: vertically centered and tall */}
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
        <div className="pill mb-6">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          Pitch. Critique. Evolve.
        </div>

        <h1 className="max-w-5xl text-balance text-5xl font-black leading-[1.02] tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Crowd-test your idea with{" "}
          <span className="text-brand-700">brutal honesty</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg text-gray-600 md:text-xl">
          Post a 200-word pitch. Get laser-focused feedback from peers. Watch an instant
          feasibility pulse form in real-time.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/post">
            <Button variant="primary" size="lg">Create a Pitch</Button>
          </Link>
          <Link to="/trending">
            <Button variant="neutral" size="lg">Explore Trending</Button>
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-6 flex flex-col items-center text-gray-400">
          <span className="text-xs tracking-wider">SCROLL</span>
          <svg
            className="scroll-cue mt-1 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
