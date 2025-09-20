import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Button from "../ui/Button";

export default function EmailPasswordLogin({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3 w-full" onSubmit={handleLogin}>
      <div className="flex flex-col gap-0.5">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all placeholder-gray-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="you@email.com"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-sm font-medium text-gray-600">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-100 transition-all placeholder-gray-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="••••••••"
        />
      </div>
      {error && <div className="text-xs text-red-500 text-center mt-1">{error}</div>}
      <Button type="submit" variant="neutral" size="sm" disabled={loading} className="w-full mt-2">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
