import Card from "./ui/Card";

const features = [
  {
    title: "Atomic Posting",
    desc: "Title + 200 words + up to 5 tags. Signal only.",
    badge: "Fast",
  },
  {
    title: "Realtime Momentum",
    desc: "Votes & comments stream in live as people react.",
    badge: "Live",
  },
  {
    title: "Peer Score",
    desc: "Feasibility • Originality • Marketability snapshots.",
    badge: "Score",
  },
  {
    title: "Niche Rooms",
    desc: "Keep critiques relevant by topic. Less noise.",
    badge: "Focused",
  },
  {
    title: "Ultra-simple Auth",
    desc: "One-click Google sign-in. Start in seconds.",
    badge: "Easy",
  },
  {
    title: "Portable Links",
    desc: "Share a pitch URL anywhere and collect feedback.",
    badge: "Share",
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">Design that feels inevitable</h2>
        <p className="mt-3 text-gray-600">Every pixel is tuned for speed, clarity, and momentum.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="group overflow-hidden p-6 transition hover:-translate-y-0.5 hover:shadow-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-brand-500"></span>{f.badge}
            </div>
            <div className="text-lg font-semibold text-gray-900">{f.title}</div>
            <div className="mt-1 text-sm text-gray-600">{f.desc}</div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition group-hover:opacity-100"
                 style={{ background: "radial-gradient(circle, rgba(42,148,255,.35), transparent 60%)" }} />
          </Card>
        ))}
      </div>
    </section>
  );
}
