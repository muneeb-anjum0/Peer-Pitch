import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-[#f9fbff] to-[#fefcf9] p-12 shadow-[0_18px_60px_rgba(16,24,40,.08)]">
        {/* Background accents */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-orange-100 opacity-40 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <h3 className="text-3xl font-black text-gray-900 sm:text-4xl">
            Your idea won’t validate itself
          </h3>
          <p className="max-w-2xl text-lg text-gray-600">
            Launch your pitch into a community that gives instant, honest feedback.  
            Test the waters, measure the heat, and pivot before wasting months of work.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/post">
              <Button variant="primary" size="lg">Post your pitch now</Button>
            </Link>
            <Link to="/trending">
              <Button variant="neutral" size="lg">See what’s trending</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
