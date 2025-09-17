import PitchCard from "./PitchCard";

export default function StorySection() {
  // sample hardcoded data just for the showcase card
  const demoPitches = [
    {
      _id: "demo1",
      title: "AI for Urdu legal docs",
      body: "Translate and summarize court judgments into plain Urdu for lawyers and students. Helps with accessibility, training, and justice reach.",
      tags: ["AI", "Law", "Accessibility"],
      votes: 42,
      commentCount: 12,
      author: { uid: "u1", name: "Sara" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "demo2",
      title: "Solo founder CRM",
      body: "A lightweight CRM designed for solopreneurs to track leads, emails, and projects without the bloat of Hubspot or Salesforce.",
      tags: ["Productivity", "CRM"],
      votes: 27,
      commentCount: 7,
      author: { uid: "u2", name: "Ali" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl grid grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-2">
      {/* Left storytelling */}
      <div>
        <h2 className="text-4xl font-black text-gray-900 sm:text-5xl">
          Every pitch deserves <br /> a real audience
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Stop testing your ideas in a vacuum. PeerPitch gives you instant reactions from a
          community that cares about sharp, bold thinking.
        </p>
      </div>

      {/* Right coded preview */}
      <div className="relative flex flex-col gap-4">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand-50 via-white to-orange-50 blur-2xl opacity-70" />
        {demoPitches.map((p) => (
          <PitchCard key={p._id} pitch={p as any} />
        ))}
      </div>
    </section>
  );
}
