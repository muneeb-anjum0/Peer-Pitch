import Button from "../ui/Button";
import { firebaseLoginGoogle } from "../../lib/firebase";

export default function ThemedLogin() {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center px-4 pt-16 pb-20">
      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Proof first. Build smarter.
          </div>
          <h1 className="mt-4 text-4xl font-black text-gray-900 sm:text-5xl">
            Proof your idea with real feedback
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Share your concept, get honest reactions, and evolve it with the crowd — before you invest months building.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-500" />
              Post a ~200 word idea with tags
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-500" />
              See votes & comments in real time
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-500" />
              Iterate fast with crowd wisdom
            </li>
          </ul>

          <div className="mt-8">
            <button onClick={firebaseLoginGoogle}>
              <Button variant="primary" size="lg">Continue with Google</Button>
            </button>
            <div className="mt-3 text-xs text-gray-500">
              By continuing, you agree to PulseProof’s community guidelines.
            </div>
          </div>
        </div>

        {/* Right: coded preview card stack (no images) */}
        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-brand-50 via-white to-orange-50 blur-2xl opacity-70" />
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,.06)]">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-56 rounded bg-gray-100" />
              <div className="mt-2 h-4 w-72 rounded bg-gray-100" />
              <div className="mt-5 flex gap-2">
                <div className="h-5 w-12 rounded-full bg-gray-100" />
                <div className="h-5 w-14 rounded-full bg-gray-100" />
                <div className="h-5 w-10 rounded-full bg-gray-100" />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_12px_40px_rgba(16,24,40,.10)]">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-64 rounded bg-gray-100" />
              <div className="mt-2 h-4 w-48 rounded bg-gray-100" />
              <div className="mt-5 flex gap-2">
                <div className="h-5 w-12 rounded-full bg-gray-100" />
                <div className="h-5 w-10 rounded-full bg-gray-100" />
                <div className="h-5 w-16 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-brand-100/70 blur-2xl" />
          <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-orange-100/70 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
