export default function StatBar() {
  // Static placeholders for Phase-1; wire to real stats later
  const stats = [
    { k: "Active users", v: "2,184" },
    { k: "Ideas pitched", v: "6,370" },
    { k: "Comments posted", v: "24,011" },
    { k: "Avg. feedback time", v: "11 min" },
  ];

  return (
    <div className="border-y border-gray-100 bg-white/60">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-5 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="text-center">
            <div className="text-xl font-black tracking-tight text-gray-900">{s.v}</div>
            <div className="text-xs text-gray-500">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
