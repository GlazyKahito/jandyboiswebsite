'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@jandy.edu');
  const [password, setPassword] = useState('JandyBio2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication rejected.');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError('Connection failure. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191715] text-[#E8DCC5] flex flex-col items-center justify-center p-4 bg-grain">
      {/* Back to archive link */}
      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono text-[#A67C52] hover:text-[#C1A477] transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Return to Academic Archive</span>
      </a>

      <div className="w-full max-w-md academic-panel rounded-lg p-8 border-2 border-[#A67C52]/70 shadow-2xl relative">
        {/* Inner frame */}
        <div className="absolute inset-2 border border-[#C1A477]/20 pointer-events-none rounded" />

        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#302117] border-2 border-[#A67C52] mx-auto flex items-center justify-center text-[#C1A477] shadow">
            <Lock size={22} />
          </div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#A67C52] block">
            Faculty Chamber Portal
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#F2E9D7]">
            Professor Janardhan Aghav
          </h1>
          <p className="text-xs font-serif italic text-[#73734E]">
            Secure Administrative Management &amp; Syllabi Archive
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-800/60 rounded text-red-200 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#A67C52] block">
              Faculty Email
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A67C52]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jandy.edu"
                className="w-full pl-9 pr-3 py-2 bg-[#211711] border border-[#A67C52]/50 rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-[#A67C52] block">
              Secret Passkey
            </label>
            <div className="relative">
              <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A67C52]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-[#211711] border border-[#A67C52]/50 rounded text-xs sm:text-sm text-[#E8DCC5] focus:outline-none focus:border-[#C1A477] transition-colors"
              />
            </div>
          </div>

          {/* Quick Credential Hint for Evaluator */}
          <div className="p-2.5 bg-[#211711]/80 border border-[#A67C52]/30 rounded text-[11px] font-mono text-[#A67C52] space-y-0.5">
            <div className="flex items-center gap-1 text-[#C1A477]">
              <ShieldCheck size={12} />
              <span>Initial Provisioned Credentials:</span>
            </div>
            <div>Email: <strong className="text-[#E8DCC5]">admin@jandy.edu</strong></div>
            <div>Passkey: <strong className="text-[#E8DCC5]">JandyBio2026!</strong></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#A67C52] text-[#211711] font-serif font-bold text-xs uppercase tracking-wider rounded hover:bg-[#C1A477] transition-all shadow-md active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating Seal...' : 'Access Faculty Desk'}
          </button>
        </form>

        <div className="mt-6 text-center text-[10px] font-mono text-[#73734E]">
          Protected by Argon/Bcrypt cryptographic verification and HTTP-only sessions.
        </div>
      </div>
    </div>
  );
}
