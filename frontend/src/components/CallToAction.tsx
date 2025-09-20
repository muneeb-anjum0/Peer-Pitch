import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20">
      <div
        className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-12 shadow-[0_18px_60px_rgba(16,24,40,.08)] transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(224,242,255,0.18) 14%, transparent 70%), " +
            "radial-gradient(circle at 80% 70%, rgba(255,251,229,0.18) 16%, transparent 70%)"
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <h3 className="text-3xl font-black text-gray-900 sm:text-4xl">
            Proof your idea before you build
          </h3>
          <p className="max-w-2xl text-lg text-gray-600">
            PulseProof helps you share ideas with a peer community, gather authentic reactions, and evolve smarter.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/post">
              <Button
                className="bg-brand-600 text-white font-semibold px-6 py-2 btn-super-rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-300 hover:bg-brand-700 hover:shadow-lg hover:-translate-y-0.5"
                style={{ boxShadow: "none", border: "none" }}
                size="lg"
              >
                Proof an idea
              </Button>
            </Link>
            <Link to="/trending">
              <Button
                variant="neutral"
                size="lg"
                className="btn-super-rounded"
              >
                Explore ideas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
