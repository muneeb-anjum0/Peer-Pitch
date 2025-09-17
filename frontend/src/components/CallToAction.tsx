import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white to-[#f6f9ff] p-10 shadow-hard">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full"
             style={{ background: "radial-gradient(circle at 30% 30%, #6bb8ff33, transparent 60%)" }}></div>
        <div className="pointer-events-none absolute -right-6 -bottom-8 h-48 w-48 rounded-full"
             style={{ background: "radial-gradient(circle at 30% 30%, #ffd69966, transparent 60%)" }}></div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-black text-gray-900 sm:text-3xl">
            Ready to see if your idea survives first contact?
          </h3>
          <p className="max-w-2xl text-gray-600">
            Ship a pitch in minutes. If the internet doesn’t care, pivot by lunch.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/post"><Button variant="primary" size="lg">Post your pitch</Button></Link>
            <Link to="/trending"><Button variant="neutral" size="lg">Watch the feed</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
