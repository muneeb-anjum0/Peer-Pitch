export default function Timeline() {
  const steps = [
    { t: "Write your pitch", d: "Distill your idea into 200 words and add a few tags." },
    { t: "Hit publish", d: "Your pitch instantly enters the community feed." },
    { t: "Collect feedback", d: "Votes and comments stream in live from peers." },
    { t: "Iterate", d: "Refine or pivot based on honest critique." },
  ];

  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="mb-14 text-center text-3xl font-black text-gray-900 sm:text-4xl">
        How PeerPitch flows
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-200" />
        <div className="space-y-14">
          {steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="flex items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white shadow-md w-12 h-12">
                {i + 1}
              </div>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,.04)] transition hover:shadow-[0_16px_50px_rgba(16,24,40,.12)]">
                <h3 className="text-lg font-semibold text-gray-900">{s.t}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
