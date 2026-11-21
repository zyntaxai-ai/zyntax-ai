"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  PhoneCall,
  Calendar,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  Building2,
  Briefcase,
  Bot,
  Sparkles,
  Calculator,
  Volume2,
  Check,
  Zap,
  Clock,
  Lock,
  Loader2,
  PhoneOutgoing,
  FileCheck2
} from "lucide-react";

type NicheType = "dental" | "realestate" | "consulting";

interface ScenarioRecording {
  id: string;
  niche: NicheType;
  badge: string;
  title: string;
  duration: string;
  callerLine: string;
  aiLine: string;
  outcome: string;
}

const NICHE_DATA: Record<
  NicheType,
  {
    label: string;
    avgTicket: number;
    defaultMissedPerWeek: number;
    unitLabel: string;
    crmLabel: string;
  }
> = {
  dental: {
    label: "Dental Clinic",
    avgTicket: 250,
    defaultMissedPerWeek: 12,
    unitLabel: "Avg patient value",
    crmLabel: "Dentrix / OpenDental / Google Calendar"
  },
  realestate: {
    label: "Real Estate",
    avgTicket: 5000,
    defaultMissedPerWeek: 6,
    unitLabel: "Avg commission value",
    crmLabel: "Follow Up Boss / HubSpot / Calendar"
  },
  consulting: {
    label: "Consulting Firm",
    avgTicket: 1500,
    defaultMissedPerWeek: 8,
    unitLabel: "Avg retainer value",
    crmLabel: "Salesforce / Calendly / HubSpot"
  }
};

const DEMO_RECORDINGS: ScenarioRecording[] = [
  {
    id: "dental-emergency",
    niche: "dental",
    badge: "Dental • Emergency Triage",
    title: "Emergency Tooth Pain & Same-Day Slot",
    duration: "0:42",
    callerLine:
      "Hi, I broke a molar eating lunch and I'm in a lot of pain. Do you have any openings today?",
    aiLine:
      "I'm so sorry you're dealing with that pain. Dr. Smith keeps an emergency block open at 3:15 PM today—I've reserved it for you and texted your intake link.",
    outcome: "Booked $450 Emergency Exam + SMS Sent"
  },
  {
    id: "realestate-tour",
    niche: "realestate",
    badge: "Real Estate • Buyer Lead",
    title: "Luxury Listing Inquiry & Private Tour",
    duration: "0:51",
    callerLine:
      "Hey, I'm calling about the 4-bedroom listing on Oakridge Ave. Is it still available to tour this weekend?",
    aiLine:
      "Yes, Oakridge Ave is active! Are you pre-approved or paying cash? Great—I have Saturday at 11:00 AM open with Marcus. Locking that tour in now.",
    outcome: "Booked $5,000+ Commission Tour"
  },
  {
    id: "consulting-discovery",
    niche: "consulting",
    badge: "Consulting • Retainer Lead",
    title: "Inbound B2B Advisory Qualification",
    duration: "0:38",
    callerLine:
      "We're scaling to 40 staff next quarter and need operational restructuring help. How do we start?",
    aiLine:
      "We specialize in 30–60 person growth transitions. Let's schedule a 20-minute executive discovery call tomorrow at 2:00 PM—sending the calendar invite now.",
    outcome: "Booked $1,500+ Strategy Call"
  }
];

export default function ZyntaxLandingPage() {
  // Interactive Demo Widget State
  const [demoPhone, setDemoPhone] = useState("");
  const [demoNiche, setDemoNiche] = useState<NicheType>("dental");
  const [isTriggeringCall, setIsTriggeringCall] = useState(false);
  const [callFeedback, setCallFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Playable Audio Scenario State
  const [playingScenarioId, setPlayingScenarioId] = useState<string | null>(null);
  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ROI Calculator State
  const [roiNiche, setRoiNiche] = useState<NicheType>("dental");
  const [missedPerWeek, setMissedPerWeek] = useState<number>(12);

  const activeRoiConfig = NICHE_DATA[roiNiche];
  const monthlyMissedCalls = missedPerWeek * 4;
  const monthlyLostRevenue = monthlyMissedCalls * activeRoiConfig.avgTicket;
  // Conservative 65% recovery rate via instant AI pickup & SMS follow-up
  const estimatedRecoveredRevenue = Math.round(monthlyLostRevenue * 0.65);

  const handleRoiNicheSwitch = (niche: NicheType) => {
    setRoiNiche(niche);
    setMissedPerWeek(NICHE_DATA[niche].defaultMissedPerWeek);
  };

  // Trigger Live Demo Call (/api/demo-call)
  const handleTriggerDemoCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallFeedback(null);

    if (!demoPhone.trim()) {
      setCallFeedback({
        type: "error",
        text: "Please enter your phone number (e.g., +1 512 555 0199)."
      });
      return;
    }

    setIsTriggeringCall(true);
    try {
      const res = await fetch("/api/demo-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: demoPhone.trim(),
          niche: demoNiche
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCallFeedback({
          type: "success",
          text:
            data.mode === "live_twilio"
              ? `Calling ${demoPhone} now! Answer your phone to speak with Zyntax AI.`
              : `Demo call triggered for ${demoPhone}! Listen to the ${NICHE_DATA[demoNiche].label} scenario below while Twilio trial keys connect.`
        });
      } else {
        setCallFeedback({
          type: "error",
          text: data.error || "Unable to place test call right now."
        });
      }
    } catch {
      setCallFeedback({
        type: "error",
        text: "Network error. Please try again."
      });
    } finally {
      setIsTriggeringCall(false);
    }
  };

  // Toggle Scenario Audio Simulation
  const toggleScenarioPlayback = (id: string) => {
    if (audioTimerRef.current) {
      clearTimeout(audioTimerRef.current);
    }

    if (playingScenarioId === id) {
      setPlayingScenarioId(null);
      return;
    }

    setPlayingScenarioId(id);
    audioTimerRef.current = setTimeout(() => {
      setPlayingScenarioId(null);
    }, 8000);
  };

  useEffect(() => {
    return () => {
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 1. STICKY TOP CONVERSION NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand Logo + Version Tag */}
          <a href="#" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center font-black text-emerald-400 text-lg">
              Z
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Zyntax AI</span>
            <span className="hidden sm:inline-block text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              v2.0 Beta
            </span>
          </a>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#live-demo" className="hover:text-emerald-400 transition">
              Live Demo
            </a>
            <a href="#roi-calculator" className="hover:text-emerald-400 transition">
              ROI Calculator
            </a>
            <a href="#pricing" className="hover:text-emerald-400 transition">
              Pilot Pricing
            </a>
          </nav>

          {/* Top Action CTAs */}
          <div className="flex items-center space-x-3">
            <a
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-lg transition"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20"
            >
              <span>Start 7-Day Free Pilot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION + INTERACTIVE "CALL ME NOW" LIVE DEMO WIDGET */}
        <section className="max-w-7xl mx-auto px-6 pt-14 pb-20 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 bg-[#111827] border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                24/7 AI Receptionist &amp; Missed-Call Recovery
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Stop Losing High-Ticket Patients &amp; Leads to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Voicemail.
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
              Zyntax AI answers missed calls in sub-500ms, qualifies urgency, books appointments directly onto your calendar, and fires an instant SMS confirmation—before callers dial your competitor.
            </p>

            {/* Primary & Secondary Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="/signup"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base px-8 py-4 rounded-xl transition flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/25"
              >
                <span>Start 7-Day Free Pilot</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/login"
                className="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 font-semibold text-base px-7 py-4 rounded-xl transition flex items-center justify-center space-x-2"
              >
                <span>Sign In to Dashboard</span>
              </a>
            </div>

            {/* Key Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1F2937] text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Answers in &lt; 0.5 Seconds</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct Calendar &amp; SMS Sync</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Setup in Under 10 Minutes</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive "Call Me Now" Live Demo Widget (#live-demo) (5 cols) */}
          <div id="live-demo" className="lg:col-span-5 relative scroll-mt-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 rounded-2xl blur-xl opacity-80"></div>
            <div className="relative bg-[#111827] border border-[#1F2937] rounded-2xl p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1F2937] mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <PhoneOutgoing className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-white">Test Live AI Call Now</h2>
                    <p className="text-[11px] text-slate-400">Experience Zyntax AI on your own phone</p>
                  </div>
                </div>
                <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>LIVE ENGINE</span>
                </span>
              </div>

              <form onSubmit={handleTriggerDemoCall} className="space-y-4">
                {/* Niche Selector Pills */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    1. Choose Industry Persona
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["dental", "realestate", "consulting"] as NicheType[]).map((niche) => (
                      <button
                        type="button"
                        key={niche}
                        onClick={() => setDemoNiche(niche)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                          demoNiche === niche
                            ? "bg-emerald-500/15 border-emerald-500 text-emerald-300"
                            : "bg-[#0B0F19] border-[#1F2937] text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {niche === "dental"
                          ? "Dental"
                          : niche === "realestate"
                          ? "Real Estate"
                          : "Consulting"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    2. Enter Your Mobile Number
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={demoPhone}
                      onChange={(e) => setDemoPhone(e.target.value)}
                      placeholder="+1 (512) 555-0199"
                      className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isTriggeringCall}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-60 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  {isTriggeringCall ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dialing Your Phone...</span>
                    </>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" />
                      <span>Test Live AI Call</span>
                    </>
                  )}
                </button>

                {callFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs border ${
                      callFeedback.type === "success"
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/40 border-red-500/40 text-red-300"
                    }`}
                  >
                    {callFeedback.text}
                  </div>
                )}
              </form>

              <p className="text-[11px] text-slate-500 text-center mt-4">
                Zero spam. Instant 45-second interactive voice AI call demo.
              </p>
            </div>
          </div>
        </section>

        {/* 3. TRUST & COMPLIANCE BAR */}
        <section className="border-y border-[#1F2937] bg-[#111827]/60 py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-6 text-xs font-semibold text-slate-300">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>HIPAA-Aligned Data Encryption</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <FileCheck2 className="w-5 h-5 text-cyan-400" />
              <span>TCPA &amp; A2P 10DLC Compliant SMS</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span>Google Calendar, Dentrix &amp; CRM Ready</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Lock className="w-5 h-5 text-amber-400" />
              <span>SOC-2 Isolated Tenant Architecture</span>
            </div>
          </div>
        </section>

        {/* 4. REAL PLAYABLE AUDIO RECORDINGS (3 INDUSTRY SCENARIOS) */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Real Call Scenarios
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-3">
              Hear How Zyntax Closes Missed Calls
            </h2>
            <p className="text-sm text-slate-400">
              Click play on any real-world call scenario to inspect how Zyntax AI handles urgency, qualifies intent, and books the appointment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEMO_RECORDINGS.map((rec) => {
              const isPlaying = playingScenarioId === rec.id;
              return (
                <div
                  key={rec.id}
                  className={`bg-[#111827] border rounded-2xl p-6 flex flex-col justify-between transition ${
                    isPlaying
                      ? "border-cyan-400 shadow-lg shadow-cyan-500/10"
                      : "border-[#1F2937] hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                        {rec.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{rec.duration}</span>
                    </div>

                    <h3 className="font-bold text-base text-white mb-4">{rec.title}</h3>

                    {/* Audio Waveform Player */}
                    <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-3 flex items-center space-x-3 mb-5">
                      <button
                        type="button"
                        onClick={() => toggleScenarioPlayback(rec.id)}
                        className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 transition"
                        aria-label={`Play ${rec.title}`}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 fill-slate-950" />
                        ) : (
                          <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                        )}
                      </button>

                      <div className="flex-1 flex items-center space-x-1 h-7">
                        {[35, 75, 50, 90, 60, 40, 85, 70, 45, 95, 55, 65, 80, 40].map((bar, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 rounded-full transition-all duration-300 ${
                              isPlaying ? "bg-cyan-400 animate-pulse" : "bg-slate-700"
                            }`}
                            style={{ height: isPlaying ? `${bar}%` : "30%" }}
                          ></div>
                        ))}
                      </div>

                      <Volume2 className={`w-4 h-4 ${isPlaying ? "text-cyan-400" : "text-slate-600"}`} />
                    </div>

                    {/* Transcript Snippet */}
                    <div className="space-y-2.5 text-xs mb-5">
                      <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937] text-slate-300">
                        <span className="text-[10px] font-mono text-slate-500 block mb-0.5">Caller</span>
                        &quot;{rec.callerLine}&quot;
                      </div>
                      <div className="bg-emerald-950/25 p-3 rounded-xl border border-emerald-500/30 text-emerald-100">
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mb-0.5">
                          <Bot className="w-3 h-3" /> Zyntax AI
                        </span>
                        &quot;{rec.aiLine}&quot;
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1F2937] flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{rec.outcome}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. NICHE SWITCHER + MISSED-CALL ROI CALCULATOR */}
        <section
          id="roi-calculator"
          className="border-t border-[#1F2937] bg-[#0D1322] py-20 px-6 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" /> Missed-Call Revenue Leak Calculator
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-3">
                How Much Revenue Are Missed Calls Costing You?
              </h2>
              <p className="text-sm text-slate-400">
                85% of callers who hit voicemail hang up without leaving a message and call the next listing on Google.
              </p>
            </div>

            <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 sm:p-10 shadow-2xl">
              {/* 3 Niche Tabs */}
              <div className="grid grid-cols-3 gap-3 bg-[#0B0F19] p-1.5 rounded-xl border border-[#1F2937] mb-8">
                <button
                  type="button"
                  onClick={() => handleRoiNicheSwitch("dental")}
                  className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                    roiNiche === "dental"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Dental Clinic</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoiNicheSwitch("realestate")}
                  className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                    roiNiche === "realestate"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Real Estate</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoiNicheSwitch("consulting")}
                  className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
                    roiNiche === "consulting"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Consulting</span>
                </button>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left: Slider & Formula Breakdown (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-semibold text-slate-200">
                        Missed calls per week:
                      </label>
                      <span className="text-2xl font-black font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-lg">
                        {missedPerWeek} calls/wk
                      </span>
                    </div>

                    <input
                      type="range"
                      min={2}
                      max={50}
                      value={missedPerWeek}
                      onChange={(e) => setMissedPerWeek(Number(e.target.value))}
                      className="w-full h-2.5 bg-[#0B0F19] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                      <span>2 / wk</span>
                      <span>25 / wk</span>
                      <span>50 / wk</span>
                    </div>
                  </div>

                  {/* Transparent Formula Breakdown */}
                  <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Monthly Missed Calls ({missedPerWeek}/wk × 4):</span>
                      <span className="font-mono font-bold text-white">{monthlyMissedCalls} calls/mo</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{activeRoiConfig.unitLabel}:</span>
                      <span className="font-mono font-bold text-white">
                        ${activeRoiConfig.avgTicket.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 pt-2 border-t border-[#1F2937]">
                      <span>Supported Integrations:</span>
                      <span className="text-cyan-400 font-medium">{activeRoiConfig.crmLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Lost vs Recovered Revenue Card (5 cols) */}
                <div className="lg:col-span-5 bg-[#0B0F19] border border-[#1F2937] rounded-2xl p-6 space-y-5">
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-1">
                      Estimated Monthly Lost Revenue
                    </div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                      ${monthlyLostRevenue.toLocaleString()}
                      <span className="text-xs font-normal text-slate-400">/mo</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/35 border border-emerald-500/40">
                    <div className="text-xs uppercase font-bold tracking-wider text-emerald-400 mb-1">
                      Recoverable with Zyntax AI (65%)
                    </div>
                    <div className="text-3xl font-black font-mono text-emerald-400">
                      +${estimatedRecoveredRevenue.toLocaleString()}
                      <span className="text-xs font-normal text-emerald-200/70">/mo</span>
                    </div>
                    <div className="text-[11px] text-emerald-200/80 mt-1">
                      {Math.round(estimatedRecoveredRevenue / 299)}x ROI on your $299/mo subscription
                    </div>
                  </div>

                  <a
                    href="/signup"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                  >
                    <span>Recover This Revenue — Start Pilot</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* 6. 4-TIER SAAS PRICING SECTION ($199 / $299 / $599 / CUSTOM) */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Flexible Plans for Every Stage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-3">
              Predictable Pricing That Pays for Itself
            </h2>
            <p className="text-sm text-slate-400">
              Start with a 7-Day Risk-Free Pilot on any standard plan. Upgrade, downgrade, or cancel anytime in 1 click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* PLAN 1: $199/mo */}
            <div className="bg-[#111827] border border-[#1F2937] hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Starter
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-white font-mono">$199</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Essential after-hours and missed-call capture for solo practitioners.
                </p>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  {[
                    "Up to 150 AI Voice Minutes/mo",
                    "1 Dedicated Local Twilio Number",
                    "Instant Missed-Call SMS Follow-Up",
                    "Google Calendar Booking Sync",
                    "Call Transcripts & Email Alerts"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/signup?plan=starter"
                className="w-full bg-[#0B0F19] hover:bg-[#1F2937] border border-[#1F2937] text-white font-bold py-3 rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
              >
                <span>Start 7-Day Pilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* PLAN 2: $299/mo (MOST POPULAR - HIGHLIGHTED) */}
            <div className="relative bg-[#111827] border-2 border-emerald-500 rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-emerald-500/15">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Most Popular
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Growth Pro
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-white font-mono">$299</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Full 24/7 AI receptionist &amp; CRM recovery engine for busy clinics &amp; teams.
                </p>

                <ul className="space-y-3 text-xs text-slate-200 mb-8">
                  {[
                    "Up to 500 AI Voice Minutes/mo",
                    "Sub-500ms Custom Voice Persona",
                    "2-Way Automated SMS & Rescheduling",
                    "Dentrix, HubSpot & CRM Sync",
                    "Live Human Takeover Switch",
                    "Setup Fee Waived ($500 Value)"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/signup?plan=growth"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/25"
              >
                <span>Start 7-Day Free Pilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* PLAN 3: $599/mo */}
            <div className="bg-[#111827] border border-[#1F2937] hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between transition">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  Scale Multi-Line
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-white font-mono">$599</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  High-volume call concurrency &amp; multi-location routing for growing firms.
                </p>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  {[
                    "1,500 AI Voice Minutes/mo",
                    "Up to 5 Concurrent Call Lines",
                    "Multi-Language Auto-Detection",
                    "Custom Make.com & API Webhooks",
                    "Outbound Missed-Lead Callbacks",
                    "Priority Slack & Phone Support"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/signup?plan=scale"
                className="w-full bg-[#0B0F19] hover:bg-[#1F2937] border border-cyan-500/40 text-cyan-300 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
              >
                <span>Start 7-Day Pilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* PLAN 4: CUSTOM ENTERPRISE */}
            <div className="bg-gradient-to-b from-[#111827] to-[#0D1322] border border-[#1F2937] hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                  Enterprise
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-white font-mono">Custom</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Tailored infrastructure for DSOs, real estate brokerages, and call centers.
                </p>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  {[
                    "Unlimited Minutes & Concurrent Calls",
                    "Custom Voice Cloning & SIP Trunking",
                    "HIPAA BAA & Dedicated Isolation",
                    "Custom ERP / EHR Deep Integration",
                    "White-Label Agency Dashboard",
                    "Dedicated Solutions Engineer"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#live-demo"
                className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
              >
                <span>Book Custom Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

      {/* CLEAN CORPORATE FOOTER */}
      <footer className="border-t border-[#1F2937] bg-[#0B0F19] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center font-black text-emerald-400 text-xs">
              Z
            </div>
            <span className="font-bold text-slate-300">Zyntax AI</span>
            <span>•</span>
            <span className="font-mono text-emerald-400/80">v2.0 Beta</span>
          </div>
          <div>© {new Date().getFullYear()} Zyntax AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
