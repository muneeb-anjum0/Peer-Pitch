export default function Marquee() {
  const items = [
    "AI", "Fintech", "EduTech", "Consumer", "Crypto", "Gaming",
    "Health", "Creator", "Tools", "AR/VR", "Robotics", "Marketplaces"
  ];

  return (
    <div className="relative my-8 overflow-hidden border-y border-gray-100 bg-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white"></div>

      <div className="flex animate-[marquee_18s_linear_infinite] gap-10 py-4"
           style={{ whiteSpace: "nowrap" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i}
                className="rounded-full border border-gray-200 px-5 py-2 text-sm text-gray-700 shadow-soft">
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
