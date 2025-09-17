type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "neutral" | "ghost";
  size?: "sm" | "md" | "lg";
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  const base = `relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizes[size]} ${className}`;

  if (variant === "primary") {
    return (
      <button
        {...rest}
        className={`${base} bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-[0_6px_20px_rgba(42,148,255,0.45)] hover:shadow-[0_8px_28px_rgba(42,148,255,0.55)] active:scale-[0.97]`}
      >
        <span className="relative z-10">{children}</span>
        {/* subtle moving shine */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute -left-1/2 top-0 h-full w-1/2 translate-x-[-120%] skew-x-[-20deg] bg-white/30 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />
        </span>
      </button>
    );
  }

  if (variant === "neutral") {
    return (
      <button
        {...rest}
        className={`${base} bg-white border border-gray-200 text-gray-800 shadow-sm hover:shadow-md active:scale-[0.97]`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={`${base} text-gray-600 hover:text-gray-900`}
    >
      {children}
    </button>
  );
}
