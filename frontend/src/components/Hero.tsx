import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2f4f7 1px, transparent 1px), linear-gradient(to bottom, #f2f4f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
        <div className="pill mb-6">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          Proof first. Build smarter.
        </div>

        <h1 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Share ideas and shape them with the crowd on{" "}
          <span className="text-brand-700">PulseProof</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600 md:text-xl">
          Launch your concept, collect instant peer feedback, and make smarter decisions before you build.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/post">
            <Button variant="primary" size="lg">Proof an idea</Button>
          </Link>
          <Link to="/trending">
            <Button variant="neutral" size="lg">Explore community</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
