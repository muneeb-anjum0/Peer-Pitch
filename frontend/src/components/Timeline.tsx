export default function Timeline() {
  const steps = [
    { t: "Write your pitch", d: "Distill into 200 words and add tags." },
    { t: "Hit publish", d: "Your pitch goes live in the feed instantly." },
    { t: "Collect feedback", d: "Votes & comments stream in real-time." },
    { t: "Iterate", d: "Refine or pivot based on honest critique." },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
          How PeerPitch flows
        </h2>

        {/* Desktop horizontal timeline */}
        <div className="relative mt-12 hidden md:block">
          {/* connector line (centered) */}
          <div className="absolute top-[22px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent [background-size:16px_2px] [background-image:repeating-linear-gradient(to_right,#d1d5db,transparent_12px)]" />

          <ol className="relative z-10 grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <li
                key={i}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-md group-hover:shadow-[0_0_15px_rgba(42,148,255,0.4)] transition">
                  {i + 1}
                </div>
                <div
                  className="mt-3 w-full max-w-xs rounded-xl border border-gray-100 p-4 shadow-[0_4px_16px_rgba(0,0,0,.05)] transition group-hover:shadow-[0_10px_30px_rgba(16,24,40,.12)]"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 30%, rgba(224,242,255,0.18) 14%, transparent 70%), " +
                      "radial-gradient(circle at 80% 70%, rgba(255,251,229,0.18) 16%, transparent 70%), white"
                  }}
                >
                  <h3 className="text-sm font-semibold text-gray-900">{s.t}</h3>
                  <p className="mt-1 text-xs text-gray-600">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="mt-10 md:hidden">
          <ol className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1">
            {steps.map((s, i) => (
              <li
                key={i}
                className="snap-center shrink-0 basis-[80%] flex flex-col items-center text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-md">
                  {i + 1}
                </div>
                <div
                  className="mt-3 rounded-xl border border-gray-100 p-4 shadow-sm"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 30%, rgba(224,242,255,0.18) 14%, transparent 70%), " +
                      "radial-gradient(circle at 80% 70%, rgba(255,251,229,0.18) 16%, transparent 70%), white"
                  }}
                >
                  <h3 className="text-sm font-semibold text-gray-900">{s.t}</h3>
                  <p className="mt-1 text-xs text-gray-600">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
