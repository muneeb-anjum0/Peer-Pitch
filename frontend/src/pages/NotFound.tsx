import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f2f4f7 1px, transparent 1px), linear-gradient(to bottom, #f2f4f7 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 140% at 50% 20%, black 50%, transparent 85%)",
        }}
      />

      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
        <div className="pill mb-6">
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          Page not found
        </div>
        <h1 className="text-5xl font-black text-gray-900 sm:text-6xl">Lost the thread?</h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600">
          We couldn’t find that page. Explore what’s trending or proof a new idea.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/trending">
            <Button variant="neutral" size="lg">See trending ideas</Button>
          </Link>
          <Link to="/post">
            <Button variant="primary" size="lg">Proof an idea</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
    