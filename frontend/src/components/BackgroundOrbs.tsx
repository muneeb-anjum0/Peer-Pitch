import { useEffect, useRef } from "react";

/**
 * Animated morphing blobs + conic halo.
 * - GPU-friendly (SVG filters + CSS transforms)
 * - Subtle parallax on mouse
 * - Light, white-themed; blends with your hero
 */
export default function BackgroundOrbs() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8;  // tilt a bit
      const y = (e.clientY / innerHeight - 0.5) * 8;
      el.style.setProperty("--tiltX", `${x}deg`);
      el.style.setProperty("--tiltY", `${-y}deg`);
      el.style.setProperty("--parX", `${x * 1.2}px`);
      el.style.setProperty("--parY", `${y * 1.2}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Conic halo ring */}
      <div
        className="absolute left-1/2 top-24 h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-[0.35]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(42,148,255,.28), rgba(255,149,0,.22), rgba(42,148,255,.28))",
          filter: "blur(28px)",
          transform: "translateZ(-100px) rotateX(var(--tiltY)) rotateY(var(--tiltX))",
        }}
      />

      {/* SVG morphing blobs layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translateZ(-60px) translate(var(--parX), var(--parY))",
        }}
      >
        <svg
          width="100%" height="100%" viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Noise field for organic motion */}
            <filter id="goo-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="7">
                <animate
                  attributeName="baseFrequency"
                  dur="16s"
                  values="0.010;0.006;0.012;0.008;0.010"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="24">
                <animate attributeName="scale" dur="12s" values="22;30;18;26;22" repeatCount="indefinite" />
              </feDisplacementMap>
            </filter>

            {/* Soft radial fills */}
            <radialGradient id="grad-blue" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#6bb8ff" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#6bb8ff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6bb8ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="grad-amber" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffcf99" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#ffcf99" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffcf99" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="grad-mint" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#b5f5d6" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#b5f5d6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b5f5d6" stopOpacity="0" />
            </radialGradient>

            {/* Soft mask so blobs fade toward edges */}
            <radialGradient id="viewportMask" cx="50%" cy="50%" r="60%">
              <stop offset="60%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="mask-soft">
              <rect width="1200" height="800" fill="url(#viewportMask)" />
            </mask>
          </defs>

          <g filter="url(#goo-noise)" mask="url(#mask-soft)">
            {/* Blue blob (left) */}
            <circle cx="260" cy="280" r="220" fill="url(#grad-blue)">
              <animate attributeName="cx" dur="18s" values="240;300;220;260" repeatCount="indefinite" />
              <animate attributeName="cy" dur="22s" values="260;320;300;280" repeatCount="indefinite" />
              <animate attributeName="r" dur="20s" values="200;240;210;220" repeatCount="indefinite" />
            </circle>

            {/* Amber blob (right) */}
            <circle cx="960" cy="260" r="190" fill="url(#grad-amber)">
              <animate attributeName="cx" dur="16s" values="930;990;950;960" repeatCount="indefinite" />
              <animate attributeName="cy" dur="19s" values="260;300;280;260" repeatCount="indefinite" />
              <animate attributeName="r" dur="17s" values="180;220;200;190" repeatCount="indefinite" />
            </circle>

            {/* Mint blob (bottom) */}
            <circle cx="640" cy="620" r="240" fill="url(#grad-mint)">
              <animate attributeName="cx" dur="21s" values="600;680;620;640" repeatCount="indefinite" />
              <animate attributeName="cy" dur="24s" values="600;660;640;620" repeatCount="indefinite" />
              <animate attributeName="r" dur="19s" values="230;270;250;240" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Subtle dotted field for texture (masked) */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 75%)",
          backgroundImage:
            "radial-gradient(rgba(16,24,40,.06) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          transform: "translateZ(-120px)",
        }}
      />
    </div>
  );
}
