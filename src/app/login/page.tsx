"use client";
import { useState } from "react";
import axios from "../../utils/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/login", { email, password });
      // Store user in localStorage/sessionStorage for demo
      window.localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pcea-blue/10 to-pcea-gold/10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-sm w-full border-t-8 border-pcea-blue">
        <h1 className="text-3xl font-extrabold mb-6 text-pcea-blue text-center tracking-tight">Sign in to PCEA Welfare</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-pcea-black mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pcea-blue"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-pcea-black mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pcea-blue"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm font-semibold text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-pcea-blue text-white font-bold py-2 rounded-lg shadow hover:bg-pcea-gold hover:text-pcea-blue transition-colors mt-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-xs text-gray-400 mt-6 text-center">
          <span>Demo: church.member@pcea.com / letmein</span>
        </div>
      </div>
    </div>
  );
}
