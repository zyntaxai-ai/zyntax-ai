"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  Calendar,
  DollarSign,
  Activity,
  CheckCircle2,
  Sparkles,
  PhoneForwarded,
  LogOut,
  Sliders
} from "lucide-react";

interface TenantState {
  niche: "dental" | "realestate" | "consulting";
  businessName: string;
  forwardingPhone: string;
  avgTicket: number;
}

export default function DashboardPage() {
  const [tenant, setTenant] = useState<TenantState>({
    niche: "dental",
    businessName: "Austin Family Dental",
    forwardingPhone: "+1 (512) 849-3921",
    avgTicket: 250
  });

  const [missedCalls, setMissedCalls] = useState(14);
  const [bookings, setBookings] = useState(9);
  const [isTakeover, setIsTakeover] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const [logs, setLogs] = useState([
    {
      id: "1",
      caller: "Sarah Jenkins",
      phone: "+1 (512) 782-9901",
      intent: "Emergency Tooth Pain Exam",
      status: "Booked",
      time: "4 mins ago"
    },
    {
      id: "2",
      caller: "Michael Chen",
      phone: "+1 (512) 441-8820",
      intent: "New Patient Consultation",
      status: "Booked",
      time: "28 mins ago"
    }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("zyntax_tenant");
    if (saved) {
      try {
        setTenant(JSON.parse(saved));
      } catch {
        // Keep default if invalid JSON
      }
    }
  }, []);

  const handleSimulateCall = () => {
    setSimulating(true);
    setTimeout(() => {
      setMissedCalls((c) => c + 1);
      setBookings((b) => b + 1);
      setLogs((prev) => [
        {
          id: Date.now().toString(),
          caller: "Live Test Prospect",
          phone: "+1 (512) 555-0194",
          intent:
            tenant.niche === "dental"
              ? "Same-Day Checkup Slot"
              : tenant.niche === "realestate"
              ? "Property Tour Request"
              : "Strategy Discovery Call",
          status: "Booked",
          time: "Just now"
        },
        ...prev
      ]);
      setSimulating(false);
    }, 1200);
  };

  const recoveredPipeline = bookings * tenant.avgTicket;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111827] border-r border-[#1F2937] p-5 flex flex-col justify-between">
        <div>
          <a href="/" className="flex items-center space-x-2.5 pb-5 mb-5 border-b border-[#1F2937]">
            <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-black text-emerald-400 text-sm">
              Z
            </div>
            <div>
              <div className="text-xs font-bold text-white">{tenant.businessName}</div>
              <div className="text-[10px] font-mono text-emerald-400 capitalize">{tenant.niche} Tenant</div>
            </div>
          </a>

          <nav className="space-y-1.5 text-xs">
            <div className="px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-2.5">
              <Activity className="w-4 h-4" />
              <span>Telemetry Dashboard</span>
            </div>
            <a
              href="/onboarding"
              className="px-3 py-2.5 rounded-lg text-slate-300 hover:bg-[#1F2937] transition flex items-center gap-2.5"
            >
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>Switch Niche / Settings</span>
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-[#1F2937] space-y-3 text-xs">
          <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-[11px] space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>HIPAA Encryption:</span>
              <span className="text-emerald-400 font-semibold">Active ✓</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Pilot Status:</span>
              <span className="text-cyan-400 font-mono">Day 1 / 7</span>
            </div>
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white px-2 py-1 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-white">{tenant.businessName} — Live Console</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Active Twilio Line: <span className="font-mono text-cyan-400">{tenant.forwardingPhone}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateCall}
              disabled={simulating}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <PhoneForwarded className="w-3.5 h-3.5" />
              <span>{simulating ? "Intercepting Call..." : "Simulate Test Call"}</span>
            </button>

            <div className="flex items-center space-x-2 bg-[#0B0F19] px-3 py-1.5 rounded-lg border border-[#1F2937]">
              <span className="text-xs text-slate-300">Human Takeover</span>
              <button
                onClick={() => setIsTakeover(!isTakeover)}
                className={`w-9 h-5 rounded-full transition p-0.5 ${
                  isTakeover ? "bg-amber-500" : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isTakeover ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
            <div className="flex justify-between text-slate-400 text-xs uppercase mb-2">
              <span>Missed Calls Intercepted</span>
              <PhoneCall className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{missedCalls}</div>
            <div className="text-xs text-emerald-400 mt-1.5">100% answered &lt; 500ms</div>
          </div>

          <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
            <div className="flex justify-between text-slate-400 text-xs uppercase mb-2">
              <span>Confirmed Bookings</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{bookings}</div>
            <div className="text-xs text-emerald-400 mt-1.5">Synced to Calendar &amp; SMS</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/40 via-[#111827] to-[#111827] border border-emerald-500/40 p-5 rounded-xl">
            <div className="flex justify-between text-emerald-400 text-xs font-bold uppercase mb-2">
              <span>Recovered Revenue Pipeline</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono">
              ${recoveredPipeline.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-1.5">
              At ${tenant.avgTicket.toLocaleString()} avg case value
            </div>
          </div>
        </div>

        {/* Live Stream & AI Inspector */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-xl p-5">
            <h2 className="font-bold text-sm text-white pb-3 border-b border-[#1F2937] mb-4">
              Live Call &amp; SMS Activity
            </h2>
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="bg-[#0B0F19] border border-[#1F2937] p-3.5 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-xs text-white">{log.caller}</div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {log.phone} • {log.intent}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {log.status}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937] mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h2 className="font-bold text-xs uppercase tracking-wider text-white">AI Triage Inspector</h2>
              </div>
              <div className="bg-[#0B0F19] border border-[#1F2937] p-3.5 rounded-lg text-xs space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Latest Caller:</span>
                  <span className="font-bold text-white">{logs[0]?.caller}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Extracted Intent:</span>
                  <span className="text-cyan-400">{logs[0]?.intent}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0B0F19] border border-[#1F2937] p-3 rounded-lg text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Twilio A2P SMS confirmation dispatched</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Calendar appointment slot locked</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
