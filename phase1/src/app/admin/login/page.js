"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-sm border border-gold/30 bg-white p-8"
      >
        <p className="text-center font-display text-2xl font-semibold text-navy">
          File<span className="text-gold-dark">Fast</span> Admin
        </p>
        <p className="mt-1 text-center text-xs text-navy/60">Sign in to manage your website</p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm border border-silver-dark/40 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="btn-gold mt-6 w-full">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
