type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "neutral" | "ghost";
  size?: "sm" | "md" | "lg";
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3",
  lg: "px-6 py-3.5 text-[15px]",
};

export default function Button({ variant = "primary", size = "md", className = "", children, ...rest }: Props) {
  const base = "btn " + sizes[size] + " " + className;

  if (variant === "primary") {
    return (
      <button
        {...rest}
        className={`${base} ring-brand-200`}
        style={{
          background: "linear-gradient(180deg, #2a94ff, #1277e6)",
          color: "#fff",
          boxShadow: "0 14px 30px rgba(42,148,255,.35)",
        }}
      >
        <span className="shine"></span>
        {children}
      </button>
    );
  }

  if (variant === "neutral") {
    return (
      <button {...rest} className={`${base}`}>
        <span className="shine"></span>
        {children}
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={`relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}
