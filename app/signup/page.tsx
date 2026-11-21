"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, User, ShieldCheck, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
      }

      // Store active tenant session for onboarding & dashboard
      localStorage.setItem(
        "zyntax_user",
        JSON.stringify({ name: fullName || email.split("@")[0], email })
      );
      router.push("/onboarding");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/onboarding` }
      });
      return;
    }
    localStorage.setItem(
      "zyntax_user",
      JSON.stringify({ name: "Pilot Clinic Owner", email: "owner@clinic.com" })
    );
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">
        <a href="/" className="flex items-center space-x-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center font-black text-emerald-400">
            Z
          </div>
          <span className="text-lg font-bold text-white">Zyntax AI</span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            7-Day Free Pilot
          </span>
        </a>

        <h1 className="text-2xl font-black text-white mb-1">Start Your 7-Day Free Pilot</h1>
        <p className="text-xs text-slate-400 mb-6">
          $0 due today. Deploy your AI receptionist in under 5 minutes.
        </p>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center space-x-2 bg-[#0B0F19] hover:bg-[#1F2937] border border-[#1F2937] text-white py-3 rounded-xl text-xs font-bold transition mb-5"
        >
          <span className="text-sm font-black text-emerald-400">G</span>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex py-1 items-center mb-5">
          <div className="flex-grow border-t border-[#1F2937]"></div>
          <span className="mx-3 text-[10px] text-slate-500 uppercase font-mono">or sign up with email</span>
          <div className="flex-grow border-t border-[#1F2937]"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Robert Smith"
                className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@austindental.com"
                className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Continue to Business Setup</span>}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> HIPAA-Aligned
          </span>
          <a href="/login" className="hover:text-white">
            Already have an account? <span className="text-emerald-400 font-semibold">Sign In</span>
          </a>
        </div>
      </div>
    </div>
  );
}
