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
    <form className="space-y-4" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
      <Button type="submit" variant="primary" size="md" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
