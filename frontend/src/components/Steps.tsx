export default function Steps() {
  const steps = [
    {
      t: "Write your 200 words",
      d: "Boil the idea down to the insight. Add up to five tags.",
      n: "01",
    },
    {
      t: "Publish & watch momentum",
      d: "Votes and comments appear live as your pitch circulates.",
      n: "02",
    },
    {
      t: "Iterate same-day",
      d: "Use feedback to refine positioning or pivot early.",
      n: "03",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-center text-3xl font-black text-gray-900 sm:text-4xl">
        How it works
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(16,24,40,.10)]"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-brand-500" /> Step {s.n}
            </div>
            <div className="text-lg font-semibold text-gray-900">{s.t}</div>
            <div className="mt-1 text-sm text-gray-600">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
