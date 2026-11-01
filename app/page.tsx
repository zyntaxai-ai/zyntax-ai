"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Building2,
  Briefcase,
  GitBranch,
  Bot,
  MessageSquare,
  Sparkles,
  PhoneForwarded,
  Clock,
  Layers,
  ChevronRight,
  Check
} from "lucide-react";

type StepType = "landing" | "onboarding" | "dashboard" | "workflows";
type NicheType = "dental" | "realestate" | "consulting";

interface TenantProfile {
  name: string;
  niche: NicheType;
  ownerName: string;
  location: string;
  phoneLine: string;
  avgTicket: number;
  missedCalls: number;
  bookings: number;
  currency: string;
}

const NICHE_CONFIGS: Record<NicheType, TenantProfile> = {
  dental: {
    name: "Austin Family Dental",
    niche: "dental",
    ownerName: "Dr. Robert Smith",
    location: "Austin, Texas",
    phoneLine: "+1 (512) 849-3921",
    avgTicket: 250,
    missedCalls: 247,
    bookings: 89,
    currency: "$"
  },
  realestate: {
    name: "Vance Luxury Realty",
    niche: "realestate",
    ownerName: "Marcus Vance",
    location: "Austin, Texas",
    phoneLine: "+1 (512) 849-8802",
    avgTicket: 5000,
    missedCalls: 112,
    bookings: 18,
    currency: "$"
  },
  consulting: {
    name: "Apex Growth Advisory",
    niche: "consulting",
    ownerName: "Sarah Jenkins",
    location: "Austin, Texas",
    phoneLine: "+1 (512) 849-1144",
    avgTicket: 1500,
    missedCalls: 164,
    bookings: 34,
    currency: "$"
  }
};

export default function ZyntaxApp() {
  const [currentStep, setCurrentStep] = useState<StepType>("landing");
  const [selectedNiche, setSelectedNiche] = useState<NicheType>("dental");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLiveTakeover, setIsLiveTakeover] = useState(false);
  const [callListFilter, setCallListFilter] = useState<"all" | "missed" | "confirmed">("all");
  const [simulatedCallActive, setSimulatedCallActive] = useState(false);

  const tenant = NICHE_CONFIGS[selectedNiche];
  const recoveredRevenue = tenant.bookings * tenant.avgTicket;

  const triggerCallSimulation = () => {
    setSimulatedCallActive(true);
    setTimeout(() => {
      setSimulatedCallActive(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* Sleek Top Navigation Step Bar */}
      <header className="sticky top-0 z-50 bg-[#111827]/90 backdrop-blur-md border-b border-[#1F2937] px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-black text-emerald-400">
            Z
          </div>
          <span className="font-bold tracking-wider uppercase text-slate-200">Zyntax AI Preview Engine</span>
        </div>

        {/* Step Pill Toggles */}
        <div className="flex items-center bg-[#0B0F19] p-1 rounded-lg border border-[#1F2937] space-x-1">
          {[
            { id: "landing", label: "1. Landing" },
            { id: "onboarding", label: "2. Niche Choice" },
            { id: "dashboard", label: "3. Dashboard" },
            { id: "workflows", label: "4. AI Workflows" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentStep(item.id as StepType)}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                currentStep === item.id
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-400 font-mono text-[11px]">System Online (v2.4)</span>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {/* STEP 1: LANDING PAGE */}
        {currentStep === "landing" && (
          <div className="flex-1 flex flex-col">
            <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center font-black text-emerald-400 text-lg">
                  Z
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Zyntax AI</span>
              </div>
              <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                <a href="#solutions" className="hover:text-emerald-400 transition">Solutions</a>
                <a href="#telephony" className="hover:text-emerald-400 transition">AI Receptionist</a>
                <a href="#pricing" className="hover:text-emerald-400 transition">Pricing</a>
                <a href="#compliance" className="hover:text-emerald-400 transition">Security</a>
              </div>
              <button
                onClick={() => setCurrentStep("onboarding")}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-lg font-bold text-sm transition flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </nav>

            <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center flex-1">
              <div>
                <div className="inline-flex items-center space-x-2 bg-[#111827] border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    AI Receptionist + Recovery Engine
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6">
                  Automate the Calls. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Grow Your Business.
                  </span>
                </h1>
                <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                  Never miss another high-value customer inquiry. An ultra-realistic voice AI that picks up missed calls, schedules appointments, answers questions, and updates your CRM in sub-500ms.
                </p>
                <div className="flex flex-wrap gap-4 items-center mb-12">
                  <button
                    onClick={() => setCurrentStep("onboarding")}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-7 py-3.5 rounded-xl font-bold text-base transition flex items-center space-x-2 shadow-xl shadow-emerald-500/25"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentStep("dashboard")}
                    className="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 px-6 py-3.5 rounded-xl font-semibold text-base transition flex items-center space-x-2"
                  >
                    <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span>Watch Interactive Demo</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1F2937]/80 text-xs text-slate-400 font-medium">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>HIPAA & SOC-2 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Deploy in Under 5 Mins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>10,000+ Calls Handled</span>
                  </div>
                </div>
              </div>

              {/* Interactive Floating AI Preview Card */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="relative bg-[#111827] border border-[#1F2937] rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1F2937] mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-bold">
                          Z
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111827] rounded-full"></span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">Zyntax Voice Agent</h4>
                        <p className="text-xs text-slate-400">Ultra-Realistic Voice Synthesis</p>
                      </div>
                    </div>
                    <span className="bg-cyan-950/80 text-cyan-400 text-xs px-2.5 py-1 rounded border border-cyan-800/50 font-mono">
                      Sub-500ms Latency
                    </span>
                  </div>

                  {/* Simulated Waveform & Dialogues */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937] text-xs">
                      <div className="text-slate-400 mb-1 flex items-center justify-between font-mono">
                        <span>Caller (Incoming)</span>
                        <span>0:04</span>
                      </div>
                      <p className="text-slate-200">
                        &quot;Hi, I had a tooth extraction last week and I need to book a follow-up checkup for tomorrow morning.&quot;
                      </p>
                    </div>

                    <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30 text-xs">
                      <div className="text-emerald-400 mb-1 flex items-center justify-between font-mono">
                        <span className="flex items-center gap-1 font-semibold">
                          <Bot className="w-3.5 h-3.5" /> Zyntax AI Assistant
                        </span>
                        <span>0:07</span>
                      </div>
                      <p className="text-emerald-100">
                        &quot;I can get you booked right away with Dr. Smith. Does tomorrow at 10:30 AM work, or would 2:00 PM suit you better?&quot;
                      </p>
                    </div>
                  </div>

                  {/* Waveform Bars */}
                  <div className="bg-[#0B0F19] p-4 rounded-xl border border-[#1F2937] flex items-center justify-between space-x-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center hover:bg-emerald-400 transition shrink-0"
                    >
                      {isPlayingAudio ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
                    </button>
                    <div className="flex-1 flex items-center space-x-1 h-8">
                      {[40, 65, 80, 30, 95, 70, 50, 85, 45, 90, 60, 35, 75, 90, 50, 40, 70, 60].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            isPlayingAudio ? "bg-cyan-400 animate-pulse" : "bg-slate-700"
                          }`}
                          style={{ height: isPlayingAudio ? `${h}%` : "30%" }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs font-mono text-slate-400">0:14 / 0:45</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* STEP 2: NICHE ONBOARDING SELECTION */}
        {currentStep === "onboarding" && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-10">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Step 2 of 4 • Tailor Your AI Engine
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-4 mb-2">What type of business do you run?</h2>
                <p className="text-sm text-slate-400">
                  Your selection automatically calibrates the voice agent prompts, CRM integrations, and revenue models.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {/* Option 1: Dental Clinic */}
                <div
                  onClick={() => setSelectedNiche("dental")}
                  className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative flex flex-col justify-between ${
                    selectedNiche === "dental"
                      ? "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10"
                      : "border-[#1F2937] bg-[#0B0F19] hover:border-slate-700"
                  }`}
                >
                  {selectedNiche === "dental" && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1">Dental Clinic</h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Missed patient calls, appointments, emergency triage & Dentrix/Curve sync.
                    </p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-emerald-400 text-[11px] font-mono px-2.5 py-1 rounded text-center font-semibold">
                    Avg Ticket: $250
                  </span>
                </div>

                {/* Option 2: Real Estate */}
                <div
                  onClick={() => setSelectedNiche("realestate")}
                  className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative flex flex-col justify-between ${
                    selectedNiche === "realestate"
                      ? "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10"
                      : "border-[#1F2937] bg-[#0B0F19] hover:border-slate-700"
                  }`}
                >
                  {selectedNiche === "realestate" && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1">Real Estate</h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Buyer inquiries, property tour scheduling, mortgage pre-qualification.
                    </p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-cyan-400 text-[11px] font-mono px-2.5 py-1 rounded text-center font-semibold">
                    Avg Ticket: $5,000
                  </span>
                </div>

                {/* Option 3: Consulting */}
                <div
                  onClick={() => setSelectedNiche("consulting")}
                  className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative flex flex-col justify-between ${
                    selectedNiche === "consulting"
                      ? "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10"
                      : "border-[#1F2937] bg-[#0B0F19] hover:border-slate-700"
                  }`}
                >
                  {selectedNiche === "consulting" && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1">Consulting Firm</h3>
                    <p className="text-xs text-slate-400 mb-4">
                      Inbound qualification, discovery call bookings & retainer contracts.
                    </p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-purple-400 text-[11px] font-mono px-2.5 py-1 rounded text-center font-semibold">
                    Avg Ticket: $1,500
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep("landing")}
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  ← Back to Homepage
                </button>
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold text-sm transition flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Launch Personalized Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: NICHE-ADAPTIVE DASHBOARD */}
        {currentStep === "dashboard" && (
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#111827] border-r border-[#1F2937] p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 px-2 py-3 mb-6 border-b border-[#1F2937]">
                  <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-bold text-emerald-400 text-sm">
                    Z
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase">{tenant.name}</h3>
                    <p className="text-[10px] text-slate-400 capitalize">{tenant.niche} Division</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 flex items-center space-x-2.5">
                    <Activity className="w-4 h-4" />
                    <span>Live Telemetry</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep("workflows")}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1F2937] transition flex items-center space-x-2.5"
                  >
                    <GitBranch className="w-4 h-4 text-slate-400" />
                    <span>AI Workflows</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1F2937] transition flex items-center space-x-2.5">
                    <PhoneCall className="w-4 h-4 text-slate-400" />
                    <span>Call Archives</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1F2937] transition flex items-center space-x-2.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Calendar Bookings</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1F2937] text-[11px]">
                <div className="bg-[#0B0F19] p-2.5 rounded-lg border border-[#1F2937]">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Twilio Balance:</span>
                    <span className="font-mono text-emerald-400 font-bold">$42.50</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>HIPAA Compliance:</span>
                    <span className="text-emerald-400">Verified ✓</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 px-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
                    {tenant.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs">{tenant.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{tenant.location}</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Top Header & Telemetry Bar */}
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Good Evening, {tenant.ownerName}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live line routing active on <span className="font-mono text-cyan-400">{tenant.phoneLine}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={triggerCallSimulation}
                    className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition"
                  >
                    <PhoneForwarded className="w-3.5 h-3.5" />
                    <span>{simulatedCallActive ? "Call Intercepted..." : "Simulate Inbound Call"}</span>
                  </button>

                  <div className="flex items-center space-x-2 bg-[#0B0F19] px-3 py-1.5 rounded-lg border border-[#1F2937]">
                    <span className="text-xs text-slate-300">Live Takeover</span>
                    <button
                      onClick={() => setIsLiveTakeover(!isLiveTakeover)}
                      className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                        isLiveTakeover ? "bg-amber-500" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          isLiveTakeover ? "translate-x-4" : "translate-x-0"
                        }`}
                      ></div>
                    </button>
                  </div>

                  <button
                    onClick={() => setCurrentStep("workflows")}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition"
                  >
                    <span>Open Workflows</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Hero Metric KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase">Missed Calls Intercepted</span>
                    <PhoneCall className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{tenant.missedCalls}</div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18% from last week • 100% responded &lt; 4s</span>
                  </div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase">
                      {selectedNiche === "realestate" ? "Tours Scheduled" : "Confirmed Bookings"}
                    </span>
                    <Calendar className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{tenant.bookings}</div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+22% automated booking rate</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-950/40 via-[#111827] to-[#111827] border border-emerald-500/40 p-5 rounded-xl shadow-lg shadow-emerald-500/5">
                  <div className="flex justify-between items-center text-emerald-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Recovered Revenue Pipeline</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    {tenant.currency}
                    {recoveredRevenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Based on <span className="text-white font-bold">{tenant.currency}{tenant.avgTicket}</span> average client value
                  </div>
                </div>
              </div>

              {/* Workstation Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Call Activity Stream */}
                <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1F2937] mb-4">
                    <h3 className="font-bold text-sm text-white">Live Call & SMS Activity</h3>
                    <div className="flex gap-1 bg-[#0B0F19] p-1 rounded-lg border border-[#1F2937] text-[11px]">
                      {(["all", "missed", "confirmed"] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setCallListFilter(filter)}
                          className={`px-2.5 py-0.5 rounded capitalize ${
                            callListFilter === filter ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        name: "Sarah Jenkins",
                        phone: "+1 (512) 782-9901",
                        time: "2 mins ago",
                        intent: selectedNiche === "dental" ? "Tooth Pain Follow-up" : "Buyer Listing Inquiry",
                        status: "Booked",
                        statusColor: "emerald"
                      },
                      {
                        name: "David Miller",
                        phone: "+1 (512) 441-2390",
                        time: "14 mins ago",
                        intent: "Emergency Pricing Info",
                        status: "Follow-up Sent",
                        statusColor: "cyan"
                      },
                      {
                        name: "Elena Rostova",
                        phone: "+1 (512) 902-1786",
                        time: "1 hour ago",
                        intent: "Reschedule Appointment",
                        status: "Calendar Updated",
                        statusColor: "emerald"
                      }
                    ].map((call, i) => (
                      <div
                        key={i}
                        className="bg-[#0B0F19] border border-[#1F2937] hover:border-slate-700 p-3.5 rounded-lg flex items-center justify-between transition cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
                            {call.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-white">{call.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{call.phone} • {call.intent}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              call.statusColor === "emerald"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            }`}
                          >
                            {call.status}
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1">{call.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: AI Call Inspector */}
                <div className="lg:col-span-5 bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#1F2937] mb-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white">Call Details & AI Inspector</h4>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        Confidence: 99.4%
                      </span>
                    </div>

                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] mb-4 text-xs space-y-2">
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Caller:</span>
                        <span className="font-bold text-white">Sarah Jenkins</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Extracted Intent:</span>
                        <span className="text-cyan-400 font-medium">Urgent Checkup Slot</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Locked Schedule:</span>
                        <span className="text-emerald-400 font-medium">Tomorrow, 10:30 AM</span>
                      </div>
                    </div>

                    {/* Chat Snippet */}
                    <div className="space-y-2.5 mb-4 text-xs">
                      <div className="bg-[#1F2937]/50 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                        <span className="text-[10px] text-slate-400 block font-mono">Caller</span>
                        &quot;I need to schedule with Dr. Smith as soon as possible.&quot;
                      </div>
                      <div className="bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/30 text-emerald-200">
                        <span className="text-[10px] text-emerald-400 block font-mono">Zyntax AI</span>
                        &quot;Confirmed! I have reserved tomorrow at 10:30 AM. A confirmation text was sent.&quot;
                      </div>
                    </div>
                  </div>

                  {/* Automated Pipeline Checklist */}
                  <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-xs space-y-1.5">
                    <div className="font-bold text-slate-300 text-[11px] mb-1">Actions Executed in Background:</div>
                    <div className="flex items-center text-slate-400 gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant SMS confirmation sent via Twilio</span>
                    </div>
                    <div className="flex items-center text-slate-400 gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Calendar slot locked &amp; synchronized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: WORKFLOW AUTOMATION ENGINE */}
        {currentStep === "workflows" && (
          <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#1F2937]">
              <div>
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition mb-1 flex items-center gap-1"
                >
                  ← Back to Telemetry Dashboard
                </button>
                <h2 className="text-2xl font-black text-white">Visual AI Workflow Automation</h2>
                <p className="text-xs text-slate-400">
                  Configure autonomous multi-step routing triggers for inbound phone calls and missed leads.
                </p>
              </div>

              <button
                onClick={() => alert("Workflow deployed successfully across your active lines.")}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save &amp; Deploy Workflow</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Vertical Flow Pipeline */}
              <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Execution Pipeline Structure</span>
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      step: "01",
                      title: "Trigger: Inbound / Missed Call",
                      desc: "Detects unanswered line in < 500ms via Twilio SIP trunking.",
                      icon: PhoneCall,
                      color: "cyan"
                    },
                    {
                      step: "02",
                      title: "AI Intent Qualification & Booking",
                      desc: "Neural voice bot converses with caller and locks available slot.",
                      icon: Bot,
                      color: "emerald"
                    },
                    {
                      step: "03",
                      title: "Omnichannel Immediate Follow-Up",
                      desc: "Dispatches instant SMS with directions, pricing, and intake form.",
                      icon: MessageSquare,
                      color: "purple"
                    },
                    {
                      step: "04",
                      title: "CRM Sync & Field Synchronization",
                      desc: "Updates patient/client status in Dentrix, Follow Up Boss, or HubSpot.",
                      icon: GitBranch,
                      color: "amber"
                    }
                  ].map((node, i) => {
                    const IconComponent = node.icon;
                    return (
                      <React.Fragment key={i}>
                        <div className="bg-[#0B0F19] border border-[#1F2937] p-4 rounded-xl flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="font-mono text-xs font-bold text-slate-500">{node.step}</span>
                            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-xs text-white">{node.title}</div>
                              <div className="text-[11px] text-slate-400">{node.desc}</div>
                            </div>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        </div>
                        {i < 3 && (
                          <div className="flex justify-center py-1">
                            <div className="w-0.5 h-4 bg-[#1F2937]"></div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Workflow Performance & Real-Time Logs */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                    Workflow Performance (Last 30 Days)
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-center">
                      <div className="text-xl font-bold text-white">1,248</div>
                      <div className="text-[10px] text-slate-400 mt-1">Tasks Completed</div>
                      <div className="text-[9px] text-emerald-400 mt-0.5">+32%</div>
                    </div>
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-center">
                      <div className="text-xl font-bold text-white">326</div>
                      <div className="text-[10px] text-slate-400 mt-1">Leads Processed</div>
                      <div className="text-[9px] text-emerald-400 mt-0.5">+28%</div>
                    </div>
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-center">
                      <div className="text-xl font-bold text-emerald-400">89%</div>
                      <div className="text-[10px] text-slate-400 mt-1">Success Rate</div>
                      <div className="text-[9px] text-emerald-400 mt-0.5">+12%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                    Recent Autonomous Execution Log
                  </h3>
                  <div className="space-y-3 text-xs">
                    {[
                      {
                        action: "AI generated SMS dispatch",
                        target: "Sarah Jenkins (+1 512-782-9901)",
                        time: "2m ago"
                      },
                      {
                        action: "Follow-up synced to CRM",
                        target: "Dr. Smith Clinic Dentrix Sync",
                        time: "14m ago"
                      },
                      {
                        action: "Voicemail transcription complete",
                        target: "Inbound line +1 512-849-XXXX",
                        time: "1h ago"
                      }
                    ].map((log, i) => (
                      <div key={i} className="flex items-start justify-between border-b border-[#1F2937] pb-2 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium text-white">{log.action}</div>
                          <div className="text-[10px] text-slate-400">{log.target}</div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
