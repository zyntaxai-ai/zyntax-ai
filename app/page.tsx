"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Calendar,
  DollarSign,
  Activity,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Building2,
  Briefcase,
  GitBranch,
  Bot,
  MessageSquare,
  Sparkles,
  PhoneForwarded,
  Layers,
  ChevronRight,
  ChevronDown,
  Check,
  Zap,
  Clock,
  Mic,
  Volume2,
  Globe,
  Shield,
  Sliders,
  X,
  Mail,
  Lock,
  User,
  LogOut
} from "lucide-react";

type StepType = "landing" | "onboarding" | "dashboard" | "workflows";
type NicheType = "dental" | "realestate" | "consulting";
type VersionType = "Zyntax 2.0" | "Zyntax Beta" | "v1.0 Core";
type AuthMode = "login" | "signup";

interface CallLog {
  id: string;
  caller: string;
  phone: string;
  time: string;
  intent: string;
  status: "Booked" | "Follow-up Sent";
}

interface TenantProfile {
  name: string;
  niche: NicheType;
  phoneLine: string;
  avgTicket: number;
  currency: string;
}

const NICHE_CONFIGS: Record<NicheType, TenantProfile> = {
  dental: {
    name: "Dental Clinic Workspace",
    niche: "dental",
    phoneLine: "+1 (512) 000-0101",
    avgTicket: 250,
    currency: "$"
  },
  realestate: {
    name: "Real Estate Workspace",
    niche: "realestate",
    phoneLine: "+1 (512) 000-0202",
    avgTicket: 5000,
    currency: "$"
  },
  consulting: {
    name: "Consulting Workspace",
    niche: "consulting",
    phoneLine: "+1 (512) 000-0303",
    avgTicket: 1500,
    currency: "$"
  }
};

const VOICE_PROFILES = [
  {
    id: "aria",
    name: "Aria",
    tone: "Warm & Empathetic",
    accent: "US English",
    latency: "380ms",
    sampleLine: "Good morning! Thanks for calling. I can help you schedule your visit right away—what day works best for you?"
  },
  {
    id: "marcus",
    name: "Marcus",
    tone: "Executive & Direct",
    accent: "US / Neutral",
    latency: "410ms",
    sampleLine: "Hello, you've reached the front desk. Tell me a bit about what you're looking for and I'll match you with an advisor."
  },
  {
    id: "nova",
    name: "Nova",
    tone: "Energetic & Fast",
    accent: "UK / Global",
    latency: "360ms",
    sampleLine: "Hi there! Sorry we missed your call. Let's get your slot locked in so you don't have to wait on hold."
  }
];

export default function ZyntaxApp() {
  const [currentStep, setCurrentStep] = useState<StepType>("landing");
  const [selectedNiche, setSelectedNiche] = useState<NicheType>("dental");
  const [selectedVersion, setSelectedVersion] = useState<VersionType>("Zyntax 2.0");
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);

  // Auth State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [authenticatedUser, setAuthenticatedUser] = useState<{ name: string; email: string; provider: string } | null>(
    null
  );

  // Voice Engine Interactive State
  const [selectedVoiceId, setSelectedVoiceId] = useState("aria");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingEngineSample, setIsPlayingEngineSample] = useState(false);

  // Dashboard State
  const [isLiveTakeover, setIsLiveTakeover] = useState(false);
  const [callListFilter, setCallListFilter] = useState<"all" | "missed" | "confirmed">("all");
  const [simulatedCallActive, setSimulatedCallActive] = useState(false);
  const [missedCallsCount, setMissedCallsCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);

  const tenant = NICHE_CONFIGS[selectedNiche];
  const recoveredRevenue = bookingsCount * tenant.avgTicket;
  const activeVoiceProfile = VOICE_PROFILES.find((v) => v.id === selectedVoiceId) || VOICE_PROFILES[0];

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSocialAuth = (provider: "Google" | "Facebook") => {
    setAuthenticatedUser({
      name: `${provider} Account`,
      email: `user@${provider.toLowerCase()}.com`,
      provider
    });
    setAuthModalOpen(false);
    setCurrentStep("onboarding");
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;
    setAuthenticatedUser({
      name: userName.trim() || userEmail.split("@")[0],
      email: userEmail.trim(),
      provider: "Email"
    });
    setAuthModalOpen(false);
    setCurrentStep("onboarding");
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setCurrentStep("landing");
  };

  const triggerCallSimulation = () => {
    if (simulatedCallActive) return;
    setSimulatedCallActive(true);

    setTimeout(() => {
      setMissedCallsCount((prev) => prev + 1);
      setBookingsCount((prev) => prev + 1);

      const newLog: CallLog = {
        id: Date.now().toString(),
        caller: "Inbound Prospect",
        phone: "+1 (512) 555-0194",
        time: "Just now",
        intent:
          selectedNiche === "dental"
            ? "Appointment Inquiry"
            : selectedNiche === "realestate"
            ? "Property Tour Request"
            : "Discovery Call Booking",
        status: "Booked"
      };

      setCallLogs((prev) => [newLog, ...prev]);
      setSimulatedCallActive(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* Main Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          {/* Logo + Version Selector */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentStep("landing")}
              className="flex items-center space-x-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center font-black text-emerald-400 text-lg">
                Z
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Zyntax AI</span>
            </button>

            {/* Version Dropdown Badge */}
            <div className="relative">
              <button
                onClick={() => setVersionMenuOpen(!versionMenuOpen)}
                className="flex items-center space-x-1.5 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-emerald-400 text-xs font-mono font-semibold px-2.5 py-1 rounded-full transition"
              >
                <span>{selectedVersion}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {versionMenuOpen && (
                <div className="absolute left-0 mt-2 w-36 bg-[#111827] border border-[#1F2937] rounded-xl shadow-xl py-1 z-50">
                  {(["Zyntax 2.0", "Zyntax Beta", "v1.0 Core"] as VersionType[]).map((ver) => (
                    <button
                      key={ver}
                      onClick={() => {
                        setSelectedVersion(ver);
                        setVersionMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-[#1F2937] transition ${
                        selectedVersion === ver ? "text-emerald-400 font-bold" : "text-slate-300"
                      }`}
                    >
                      <span>{ver}</span>
                      {selectedVersion === ver && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Nav Links on Landing */}
          {currentStep === "landing" && (
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
              <a href="#voice-engine" className="hover:text-emerald-400 transition">
                Voice Engine
              </a>
              <a href="#capabilities" className="hover:text-emerald-400 transition">
                Capabilities
              </a>
              <a href="#live-demo" className="hover:text-emerald-400 transition">
                Live Preview
              </a>
            </nav>
          )}

          {/* Right Auth / Workspace Controls */}
          <div className="flex items-center space-x-3">
            {authenticatedUser ? (
              <>
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="hidden sm:inline-flex items-center space-x-2 text-xs font-medium text-slate-200 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] px-3.5 py-2 rounded-lg transition"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>{authenticatedUser.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-xs text-slate-400 hover:text-white bg-[#111827] border border-[#1F2937] p-2 rounded-lg transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuth("login")}
                  className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg transition"
                >
                  Log in
                </button>
                <button
                  onClick={() => openAuth("signup")}
                  className="bg-[#111827] hover:bg-[#1F2937] border border-emerald-500/40 text-emerald-400 text-sm font-semibold px-4 py-2 rounded-lg transition"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* STEP 1: LANDING PAGE */}
        {currentStep === "landing" && (
          <div className="flex-1 flex flex-col">
            {/* Hero Section */}
            <section
              id="live-demo"
              className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-14 items-center"
            >
              <div>
                <div className="inline-flex items-center space-x-2 bg-[#111827] border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {selectedVersion} • Neural Voice Receptionist
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6">
                  Automate the Calls. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Grow Your Business.
                  </span>
                </h1>

                <p className="text-lg text-slate-400 mb-9 max-w-xl leading-relaxed">
                  An autonomous AI receptionist that answers missed calls, qualifies inquiries, books appointments, and triggers instant SMS follow-ups in real time.
                </p>

                {/* Primary Hero CTA Zone ("Get Started" prominently placed here) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                  <button
                    onClick={() => {
                      if (authenticatedUser) {
                        setCurrentStep("onboarding");
                      } else {
                        openAuth("signup");
                      }
                    }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-extrabold text-base transition flex items-center justify-center space-x-2.5 shadow-xl shadow-emerald-500/25"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setCurrentStep("dashboard")}
                    className="bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 px-6 py-4 rounded-xl font-semibold text-base transition flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span>Explore Live Console</span>
                  </button>
                </div>

                {/* Quick OAuth Strip right below Hero CTA */}
                {!authenticatedUser && (
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pb-8 border-b border-[#1F2937]/80">
                    <span>Instant access with:</span>
                    <button
                      onClick={() => handleSocialAuth("Google")}
                      className="inline-flex items-center space-x-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      <span className="font-bold text-emerald-400">G</span>
                      <span>Google</span>
                    </button>
                    <button
                      onClick={() => handleSocialAuth("Facebook")}
                      className="inline-flex items-center space-x-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      <span className="font-bold text-cyan-400">f</span>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => openAuth("signup")}
                      className="inline-flex items-center space-x-2 bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] text-slate-200 px-3 py-1.5 rounded-lg font-medium transition"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Email</span>
                    </button>
                  </div>
                )}

                {/* Core Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 text-xs text-slate-400 font-medium">
                  <div className="flex items-center space-x-2.5">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sub-500ms Voice Latency</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>24/7 Missed-Call Pickup</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Calendar &amp; SMS Sync</span>
                  </div>
                </div>
              </div>

              {/* Interactive AI Voice Simulation Card */}
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
                        <p className="text-xs text-slate-400">Live Call Conversation Flow</p>
                      </div>
                    </div>
                    <span className="bg-cyan-950/80 text-cyan-400 text-xs px-2.5 py-1 rounded border border-cyan-800/50 font-mono">
                      {selectedVersion}
                    </span>
                  </div>

                  {/* Conversation Flow */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-[#0B0F19] p-3.5 rounded-xl border border-[#1F2937] text-xs">
                      <div className="text-slate-400 mb-1 flex items-center justify-between font-mono">
                        <span>Inbound Caller</span>
                        <span>0:03</span>
                      </div>
                      <p className="text-slate-200">
                        &quot;Hi, I missed your front desk earlier. Can I book an appointment for tomorrow morning?&quot;
                      </p>
                    </div>

                    <div className="bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30 text-xs">
                      <div className="text-emerald-400 mb-1 flex items-center justify-between font-mono">
                        <span className="flex items-center gap-1 font-semibold">
                          <Bot className="w-3.5 h-3.5" /> Zyntax AI
                        </span>
                        <span>0:06</span>
                      </div>
                      <p className="text-emerald-100">
                        &quot;I can help you right away. We have an opening tomorrow at 10:30 AM—shall I lock that slot and text you the confirmation?&quot;
                      </p>
                    </div>
                  </div>

                  {/* Interactive Waveform Bar */}
                  <div className="bg-[#0B0F19] p-4 rounded-xl border border-[#1F2937] flex items-center justify-between space-x-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center hover:bg-emerald-400 transition shrink-0"
                      aria-label="Toggle audio waveform preview"
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-5 h-5 fill-slate-950" />
                      ) : (
                        <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                      )}
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
                    <span className="text-xs font-mono text-slate-400">
                      {isPlayingAudio ? "Playing" : "Preview"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* DEDICATED VOICE FEATURE ENGINE SECTION */}
            <section id="voice-engine" className="border-t border-[#1F2937] bg-[#0D1322] py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    Zyntax Voice Feature Engine
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-3">
                    Engineered for Natural Human Conversations
                  </h2>
                  <p className="text-sm text-slate-400">
                    Switch voice personas, test response cadence, and explore the core telephony features built inside {selectedVersion}.
                  </p>
                </div>

                {/* Interactive Voice Persona Tester */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 lg:p-8 mb-12 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1F2937]">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Mic className="w-4 h-4 text-emerald-400" />
                        <span>Select Neural Voice Model</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Choose a voice profile tailored to your front-desk brand tone.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {VOICE_PROFILES.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => {
                            setSelectedVoiceId(voice.id);
                            setIsPlayingEngineSample(true);
                          }}
                          className={`px-4 py-2.5 rounded-xl border text-left transition ${
                            selectedVoiceId === voice.id
                              ? "bg-emerald-500/10 border-emerald-500 text-white"
                              : "bg-[#0B0F19] border-[#1F2937] text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-bold text-xs text-white">{voice.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">{voice.latency}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{voice.tone}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Voice Sample Bar */}
                  <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <button
                        onClick={() => setIsPlayingEngineSample(!isPlayingEngineSample)}
                        className="w-12 h-12 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0 transition shadow-lg shadow-cyan-500/20"
                      >
                        {isPlayingEngineSample ? (
                          <Pause className="w-5 h-5 fill-slate-950" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                          <span>Active Profile: {activeVoiceProfile.name}</span>
                          <span>•</span>
                          <span>{activeVoiceProfile.accent}</span>
                        </div>
                        <p className="text-sm text-slate-200 italic">
                          &quot;{activeVoiceProfile.sampleLine}&quot;
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (authenticatedUser) {
                          setCurrentStep("onboarding");
                        } else {
                          openAuth("signup");
                        }
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition shrink-0 flex items-center gap-2"
                    >
                      <span>Deploy With {activeVoiceProfile.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 6 Core Voice Engine Capabilities Grid */}
                <div id="capabilities" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Zap,
                      title: "Sub-500ms Response Turnaround",
                      desc: "Streaming speech-to-intent architecture eliminates awkward robotic pauses during live phone calls."
                    },
                    {
                      icon: Mic,
                      title: "Smart Barge-In & Interruption",
                      desc: "If a caller interrupts mid-sentence to change dates or ask a question, the AI stops and adapts immediately."
                    },
                    {
                      icon: Globe,
                      title: "Multi-Language Auto-Detection",
                      desc: "Automatically detects caller language and switches seamlessly without manual IVR menu prompts."
                    },
                    {
                      icon: PhoneForwarded,
                      title: "Warm Call Transfer & Escalation",
                      desc: "Routes urgent VIP or emergency cases straight to your mobile phone with a spoken context summary."
                    },
                    {
                      icon: Sliders,
                      title: "Custom Knowledge Base Grounding",
                      desc: "Answers pricing, insurance, property, or service FAQs directly from your uploaded business rules."
                    },
                    {
                      icon: Shield,
                      title: "Encrypted Call & Transcript Logs",
                      desc: "Every call recording, summary, and booking trigger is stored securely inside your isolated workspace."
                    }
                  ].map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-[#111827] border border-[#1F2937] hover:border-emerald-500/30 p-6 rounded-2xl transition"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-base mb-2">{feat.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                      </div>
                    );
                  })}
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
                  Workspace Configuration
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-4 mb-2">Select your business vertical</h2>
                <p className="text-sm text-slate-400">
                  Choose your industry to configure the AI receptionist prompts, booking logic, and pipeline values.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {/* Dental Clinic */}
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
                      Patient call recovery, appointment booking &amp; clinic calendar sync.
                    </p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-emerald-400 text-[11px] font-mono px-2.5 py-1 rounded text-center font-semibold">
                    Est. Case Value: $250
                  </span>
                </div>

                {/* Real Estate */}
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
                      Buyer inquiries, property tour scheduling &amp; instant lead capture.
                    </p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-cyan-400 text-[11px] font-mono px-2.5 py-1 rounded text-center font-semibold">
                    Est. Deal Value: $5,000
                  </span>
                </div>

                {/* Consulting */}
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
                      Client qualification, discovery call scheduling &amp; follow-up routing.
                    </p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-purple-400 text-[11px] font-mono px-2.5 py-1 rounded text-center font-semibold">
                    Est. Retainer: $1,500
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep("landing")}
                  className="text-xs text-slate-400 hover:text-white transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold text-sm transition flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Continue to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: TELEMETRY DASHBOARD */}
        {currentStep === "dashboard" && (
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#111827] border-r border-[#1F2937] p-4 flex flex-col justify-between">
              <div>
                <div className="px-2 py-3 mb-6 border-b border-[#1F2937]">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wide">{tenant.name}</h3>
                  <p className="text-[11px] text-emerald-400 font-mono mt-0.5">
                    {selectedVersion} • {activeVoiceProfile.name}
                  </p>
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
                  <button
                    onClick={() => setCurrentStep("onboarding")}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1F2937] transition flex items-center space-x-2.5"
                  >
                    <Sliders className="w-4 h-4 text-slate-400" />
                    <span>Switch Vertical</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#1F2937] text-[11px]">
                <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>Routing Line:</span>
                    <span className="font-mono text-cyan-400">Ready</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Voice Profile:</span>
                    <span className="text-emerald-400">{activeVoiceProfile.name}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Dashboard Area */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Top Header */}
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-[#111827] p-5 rounded-xl border border-[#1F2937]">
                <div>
                  <h2 className="text-xl font-bold text-white">{tenant.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Assigned Line: <span className="font-mono text-cyan-400">{tenant.phoneLine}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={triggerCallSimulation}
                    className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition"
                  >
                    <PhoneForwarded className="w-3.5 h-3.5" />
                    <span>{simulatedCallActive ? "Processing Test Call..." : "Simulate Inbound Call"}</span>
                  </button>

                  <div className="flex items-center space-x-2 bg-[#0B0F19] px-3 py-1.5 rounded-lg border border-[#1F2937]">
                    <span className="text-xs text-slate-300">Manual Takeover</span>
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
                    <span>Configure Workflows</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3 Real Metric KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase">Calls Intercepted</span>
                    <PhoneCall className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{missedCallsCount}</div>
                  <div className="text-xs text-slate-400 mt-2">
                    {missedCallsCount === 0
                      ? "Waiting for inbound call activity"
                      : "100% answered automatically"}
                  </div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
                  <div className="flex justify-between items-center text-slate-400 mb-2">
                    <span className="text-xs font-medium uppercase">
                      {selectedNiche === "realestate" ? "Tours Scheduled" : "Confirmed Bookings"}
                    </span>
                    <Calendar className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{bookingsCount}</div>
                  <div className="text-xs text-slate-400 mt-2">
                    {bookingsCount === 0 ? "No bookings recorded yet" : "Synced to active calendar"}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-950/40 via-[#111827] to-[#111827] border border-emerald-500/40 p-5 rounded-xl">
                  <div className="flex justify-between items-center text-emerald-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Recovered Pipeline</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    {tenant.currency}
                    {recoveredRevenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Calculated at <span className="text-white font-bold">{tenant.currency}{tenant.avgTicket}</span> per booking
                  </div>
                </div>
              </div>

              {/* Workstation Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Live Call Log */}
                <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-xl p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-[#1F2937] mb-4">
                    <h3 className="font-bold text-sm text-white">Live Call &amp; SMS Log</h3>
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

                  {callLogs.length === 0 ? (
                    <div className="bg-[#0B0F19] border border-dashed border-[#1F2937] rounded-xl p-8 text-center">
                      <PhoneCall className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                      <p className="text-xs font-semibold text-slate-300">No calls logged yet</p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                        Click &quot;Simulate Inbound Call&quot; at the top right to test how Zyntax AI captures and books a live lead.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {callLogs.map((call) => (
                        <div
                          key={call.id}
                          className="bg-[#0B0F19] border border-[#1F2937] p-3.5 rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-400">
                              AI
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-white">{call.caller}</div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                {call.phone} • {call.intent}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {call.status}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1">{call.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: AI Inspector */}
                <div className="lg:col-span-5 bg-[#111827] border border-[#1F2937] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#1F2937] mb-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white">AI Call Inspector</h4>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {callLogs.length > 0 ? "Active Session" : "Idle"}
                      </span>
                    </div>

                    {callLogs.length === 0 ? (
                      <div className="text-xs text-slate-400 py-8 text-center">
                        Simulate an incoming call to inspect real-time transcription, intent extraction, and SMS actions.
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] space-y-1.5">
                          <div className="flex justify-between text-slate-400">
                            <span>Caller:</span>
                            <span className="font-bold text-white">{callLogs[0].caller}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Detected Intent:</span>
                            <span className="text-cyan-400 font-medium">{callLogs[0].intent}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Voice Model:</span>
                            <span className="text-emerald-400 font-medium">{activeVoiceProfile.name}</span>
                          </div>
                        </div>

                        <div className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/30 text-emerald-200">
                          <span className="text-[10px] text-emerald-400 block font-mono mb-1">Zyntax AI Response</span>
                          &quot;Thank you for calling {tenant.name}. I have scheduled your appointment and sent a confirmation link via SMS.&quot;
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-xs space-y-1.5 mt-4">
                    <div className="font-bold text-slate-300 text-[11px] mb-1">Automation Rules Ready:</div>
                    <div className="flex items-center text-slate-400 gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant SMS dispatch enabled</span>
                    </div>
                    <div className="flex items-center text-slate-400 gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Calendar conflict check active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: WORKFLOW AUTOMATION ENGINE */}
        {currentStep === "workflows" && (
          <div className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#1F2937]">
              <div>
                <button
                  onClick={() => setCurrentStep("dashboard")}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition mb-1 flex items-center gap-1"
                >
                  ← Back to Telemetry Console
                </button>
                <h2 className="text-2xl font-black text-white">AI Workflow Automation</h2>
                <p className="text-xs text-slate-400">
                  Configure multi-step routing logic for missed calls and automated lead follow-ups.
                </p>
              </div>

              <button
                onClick={() => setCurrentStep("dashboard")}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save &amp; Apply</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Pipeline */}
              <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                <h3 className="font-bold text-sm text-white mb-6 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Active Routing Pipeline ({selectedVersion})</span>
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      step: "01",
                      title: "Trigger: Inbound / Missed Call",
                      desc: "Detects unanswered call and connects voice agent immediately.",
                      icon: PhoneCall
                    },
                    {
                      step: "02",
                      title: "AI Intent Qualification & Booking",
                      desc: "Converses naturally with caller and locks available calendar slot.",
                      icon: Bot
                    },
                    {
                      step: "03",
                      title: "Automated SMS Follow-Up",
                      desc: "Sends instant confirmation details and intake link to caller.",
                      icon: MessageSquare
                    },
                    {
                      step: "04",
                      title: "CRM Record Sync",
                      desc: "Logs call summary, transcript, and appointment status to CRM.",
                      icon: GitBranch
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

              {/* Right Column: Live Session Stats */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                    Session Telemetry
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-center">
                      <div className="text-xl font-bold text-white">{missedCallsCount}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Calls Handled</div>
                    </div>
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-center">
                      <div className="text-xl font-bold text-white">{bookingsCount}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Bookings</div>
                    </div>
                    <div className="bg-[#0B0F19] p-3 rounded-lg border border-[#1F2937] text-center">
                      <div className="text-xl font-bold text-emerald-400">
                        {missedCallsCount > 0 ? "100%" : "0%"}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Response Rate</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                    Execution Log
                  </h3>
                  {callLogs.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No workflow executions yet. Trigger a test call from the dashboard to see live logs here.
                    </p>
                  ) : (
                    <div className="space-y-3 text-xs">
                      {callLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-start justify-between border-b border-[#1F2937] pb-2 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="font-medium text-white">Call Routed &amp; SMS Sent</div>
                            <div className="text-[10px] text-slate-400">{log.intent}</div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AUTH MODAL (LOGIN & SIGN UP WITH GOOGLE, FACEBOOK, EMAIL) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#1F2937] rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg bg-[#0B0F19] border border-[#1F2937]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center font-black text-emerald-400 text-sm">
                Z
              </div>
              <span className="font-bold text-white">Zyntax AI</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {selectedVersion}
              </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              {authMode === "signup" ? "Create your workspace" : "Welcome back"}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {authMode === "signup"
                ? "Deploy your AI receptionist and automate missed-call recovery."
                : "Sign in to access your Zyntax AI telemetry and voice workflows."}
            </p>

            {/* Social OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => handleSocialAuth("Google")}
                className="flex items-center justify-center space-x-2 bg-[#0B0F19] hover:bg-[#1F2937] border border-[#1F2937] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition"
              >
                <span className="text-sm font-black text-emerald-400">G</span>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth("Facebook")}
                className="flex items-center justify-center space-x-2 bg-[#0B0F19] hover:bg-[#1F2937] border border-[#1F2937] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition"
              >
                <span className="text-sm font-black text-cyan-400">f</span>
                <span>Facebook</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center mb-5">
              <div className="flex-grow border-t border-[#1F2937]"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase font-mono">or with email</span>
              <div className="flex-grow border-t border-[#1F2937]"></div>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
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
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 mt-2"
              >
                {authMode === "signup" ? "Create Account & Continue" : "Sign In to Workspace"}
              </button>
            </form>

            <div className="text-center mt-5 text-xs text-slate-400">
              {authMode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className="text-emerald-400 font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clean Corporate Footer */}
      <footer className="border-t border-[#1F2937] bg-[#0B0F19] py-6 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Zyntax AI</span>
            <span>•</span>
            <span className="font-mono text-emerald-400/80">{selectedVersion}</span>
          </div>
          <div>© {new Date().getFullYear()} Zyntax AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
