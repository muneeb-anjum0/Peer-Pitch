import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-[#f9fbff] to-[#fefcf9] p-12 shadow-[0_18px_60px_rgba(16,24,40,.08)]">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <h3 className="text-3xl font-black text-gray-900 sm:text-4xl">
            Proof your idea before you build
          </h3>
          <p className="max-w-2xl text-lg text-gray-600">
            PulseProof helps you share ideas with a peer community, gather authentic reactions, and evolve smarter.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/post">
              <Button variant="primary" size="lg">Proof an idea</Button>
            </Link>
            <Link to="/trending">
              <Button variant="neutral" size="lg">Explore ideas</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
