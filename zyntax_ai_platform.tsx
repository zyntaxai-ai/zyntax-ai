import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneForwarded,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
  Users,
  Play,
  Pause,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  Stethoscope,
  Briefcase,
  Check,
  MessageSquare,
  Search,
  Filter,
  Flame,
  Settings,
  Layers,
  BarChart3,
  Sliders,
  Database,
  Mail,
  Send,
  RefreshCw,
  Clock,
  Volume2,
  Mic,
  Smile,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// --- TYPES & MOCK DATA DEFINITIONS ---

const NICHES = {
  dental: {
    id: 'dental',
    name: 'Dental Clinic',
    icon: Stethoscope,
    tagline: 'Missed patient calls, appointments & more',
    avgTicket: 250,
    ticketLabel: '$250',
    doctor: 'Dr. Robert Smith',
    company: 'Austin Family Dental - Texas',
    crm: 'Dentrix / Curve Dental',
    kpi: {
      intercepted: 247,
      interceptedGrowth: '+18%',
      bookings: 89,
      bookingsGrowth: '+22%',
      recoveredRevenue: '$22,250',
      revenueGrowth: '+26%'
    },
    sampleCallers: [
      {
        id: 'c1',
        name: 'Sarah Johnson',
        phone: '+1 (512) 541-8923',
        time: '2 min ago',
        duration: '1m 24s',
        status: 'Booked',
        type: 'Toothache / Emergency Root Canal',
        urgency: 'high',
        summary: 'Emergency toothache on lower left molar. In pain since last night. Scheduled for tomorrow morning at 9:30 AM.',
        actions: ['SMS confirmation sent via Twilio', 'Appointment booked in Dentrix calendar', 'Pre-op medical history form dispatched'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Thank you for calling Austin Family Dental. I am Sarah, your AI assistant. How can I help you today?' },
          { speaker: 'Sarah Johnson', text: 'Hi, I have terrible pain in my lower tooth since yesterday. Do you have any emergency appointments tomorrow?' },
          { speaker: 'Zyntax AI', text: 'I am so sorry to hear that. Yes, Dr. Robert Smith has an emergency slot open tomorrow at 9:30 AM or 2:00 PM. Which works better for you?' },
          { speaker: 'Sarah Johnson', text: '9:30 AM is perfect, please book it!' },
          { speaker: 'Zyntax AI', text: 'You are all set for 9:30 AM tomorrow. I have just texted you the intake forms. Please take ibuprofen if recommended by your physician.' }
        ]
      },
      {
        id: 'c2',
        name: 'Michael Chen',
        phone: '+1 (512) 902-1786',
        time: '7 min ago',
        duration: '0m 45s',
        status: 'Follow-up',
        type: 'Routine Cleaning & Checkup',
        urgency: 'normal',
        summary: 'Inquiring about dental insurance acceptance (Delta Dental Premier). Sent insurance verification SMS link.',
        actions: ['Insurance check SMS link sent', 'Lead registered in Dentrix CRM'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Hello! Austin Family Dental, how may I direct your call?' },
          { speaker: 'Michael Chen', text: 'Hey, do you guys accept Delta Dental Premier for routine cleanings?' },
          { speaker: 'Zyntax AI', text: 'Yes, we are in-network with Delta Dental Premier! Would you like me to text you our instant insurance verification link?' },
          { speaker: 'Michael Chen', text: 'Yes please, send it right away.' }
        ]
      },
      {
        id: 'c3',
        name: 'Elena Rostova',
        phone: '+1 (512) 781-4432',
        time: '14 min ago',
        duration: '2m 10s',
        status: 'Booked',
        type: 'Invisalign Consultation',
        urgency: 'high',
        summary: 'Adult clear aligner quote requested. Booked free 3D digital scan for Friday 3:00 PM.',
        actions: ['VIP Invisalign Consultation locked', 'Calendar invite synched'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Hi! Welcome to Austin Family Dental. Looking for cosmetic or general care?' },
          { speaker: 'Elena Rostova', text: 'I want to know if I qualify for Invisalign and how much it costs.' },
          { speaker: 'Zyntax AI', text: 'We offer complimentary 3D iTero digital scans with Dr. Smith. We have Friday at 3:00 PM open. Shall I reserve that for you?' },
          { speaker: 'Elena Rostova', text: 'Sounds wonderful, let us lock in Friday at 3.' }
        ]
      },
      {
        id: 'c4',
        name: 'David Kim',
        phone: '+1 (512) 424-7711',
        time: '28 min ago',
        duration: '0m 30s',
        status: 'Saved',
        type: 'Prescription Refill',
        urgency: 'normal',
        summary: 'Requested amoxicillin prescription renewal. Routed priority ticket to front-desk nurse.',
        actions: ['Clinical notification sent to nurse station'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Austin Family Dental AI line. How can I assist?' },
          { speaker: 'David Kim', text: 'I had an extraction on Tuesday, need my antibiotics refilled.' },
          { speaker: 'Zyntax AI', text: 'I have logged this directly to the lead dental assistant. You will receive a pharmacy notification within 45 minutes.' }
        ]
      }
    ]
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate',
    icon: Building2,
    tagline: 'Missed buyer calls, property tours & offers',
    avgTicket: 5000,
    ticketLabel: '$5,000',
    doctor: 'Marcus Vance',
    company: 'Vance Luxury Realty - Austin',
    crm: 'Follow Up Boss / Lofty',
    kpi: {
      intercepted: 184,
      interceptedGrowth: '+24%',
      bookings: 42,
      bookingsGrowth: '+31%',
      recoveredRevenue: '$210,000',
      revenueGrowth: '+38%'
    },
    sampleCallers: [
      {
        id: 'c1',
        name: 'Victoria Sterling',
        phone: '+1 (512) 883-9941',
        time: '4 min ago',
        duration: '2m 04s',
        status: 'Booked',
        type: '7408 Westlake Waterfront Tour',
        urgency: 'high',
        summary: 'Cash buyer for $2.4M listing. Pre-qualification confirmed. Scheduled private twilight tour for Saturday 5:30 PM.',
        actions: ['Private showing locked in Google Calendar', 'Buyer portfolio sent via WhatsApp/SMS', 'Follow Up Boss VIP tag tagged'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Thank you for calling Vance Luxury Realty. How can I assist your property search today?' },
          { speaker: 'Victoria Sterling', text: 'Hi, I am calling about the Westlake waterfront home listed on your signage. Is it still available?' },
          { speaker: 'Zyntax AI', text: 'Yes, 7408 Westlake Dr is available at $2,450,000. It features 4 beds, 5 baths, and private boat dock access. Marcus Vance is hosting private viewings this Saturday. Would you like a slot?' },
          { speaker: 'Victoria Sterling', text: 'Saturday around 5:30 PM before sunset would be ideal. We are cash buyers.' },
          { speaker: 'Zyntax AI', text: 'Wonderful, Victoria. I have locked Saturday 5:30 PM for you and notified Marcus directly. Expect gate access codes via SMS shortly.' }
        ]
      },
      {
        id: 'c2',
        name: 'Bradley Cooper',
        phone: '+1 (512) 334-9021',
        time: '18 min ago',
        duration: '1m 15s',
        status: 'Follow-up',
        type: 'Downtown Penthouse Inquiry',
        urgency: 'normal',
        summary: 'Investor seeking HOA rules & rental yield documents for 360 Condos.',
        actions: ['Listing brochure dispatched automatically', 'Added to CRM investor list'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Vance Luxury Realty. What property details can I pull up for you?' },
          { speaker: 'Bradley Cooper', text: 'Looking into Unit 3201 at the 360 tower. Can short-term rentals be run there?' },
          { speaker: 'Zyntax AI', text: 'The building requires a 6-month minimum lease. I can text you the verified HOA bylaws and rental prospectus right now.' }
        ]
      }
    ]
  },
  consulting: {
    id: 'consulting',
    name: 'Consulting',
    icon: Briefcase,
    tagline: 'Missed inquiries, discovery calls & scopes',
    avgTicket: 1500,
    ticketLabel: '$1,500',
    doctor: 'Sarah Jenkins',
    company: 'Apex Growth Advisory',
    crm: 'HubSpot / Salesforce',
    kpi: {
      intercepted: 312,
      interceptedGrowth: '+14%',
      bookings: 68,
      bookingsGrowth: '+19%',
      recoveredRevenue: '$102,000',
      revenueGrowth: '+21%'
    },
    sampleCallers: [
      {
        id: 'c1',
        name: 'Jonathan Reynolds',
        phone: '+1 (512) 672-0044',
        time: '5 min ago',
        duration: '1m 48s',
        status: 'Booked',
        type: 'Enterprise Retainer Scope',
        urgency: 'high',
        summary: 'SaaS founder doing $3M ARR looking for RevOps & scale advisory. Booked 45-min Zoom discovery with Sarah.',
        actions: ['Zoom link generated and dispatched', 'Briefing deck emailed', 'HubSpot deal card created ($18K pipeline)'],
        transcript: [
          { speaker: 'Zyntax AI', text: 'Hello, you have reached Apex Growth Advisory. How can we support your firm?' },
          { speaker: 'Jonathan Reynolds', text: 'Hey Sarah, saw your article on B2B sales cycles. We want to revamp our go-to-market structure.' },
          { speaker: 'Zyntax AI', text: 'Fantastic! Sarah Jenkins is currently in executive sessions. I can reserve a 45-minute strategic audit on Thursday at 2 PM or Friday at 11 AM.' },
          { speaker: 'Jonathan Reynolds', text: 'Let us do Thursday at 2 PM.' },
          { speaker: 'Zyntax AI', text: 'Locked in. I sent your calendar invitation and prep questions to your phone.' }
        ]
      }
    ]
  }
};

export default function App() {
  // Global Stepper State: 'landing' (Step 1) | 'onboarding' (Step 2) | 'dashboard' (Step 3) | 'workflows' (Step 4)
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedNicheKey , setSelectedNicheKey ] = useState<keyof typeof NICHES>('dental') ;
  
  // Audio Player State Simulator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(24); // percentage

  // Selected Call Log in Dashboard Inspector
  const activeNiche = NICHES[selectedNicheKey];
  const [selectedCallId, setSelectedCallId] = useState('c1');
  const [filterTab, setFilterTab] = useState('All');
  const [manualTakeover, setManualTakeover] = useState(false);
  const [isSimulatingCall, setIsSimulatingCall] = useState(false);

  // Workflow Editor State
  const [workflowActiveTab, setWorkflowActiveTab] = useState('ai_workflows');
  const [workflowSavedToast, setWorkflowSavedToast] = useState(false);

  // Synchronize selected call if niche changes
  useEffect(() => {
    if (activeNiche.sampleCallers.length > 0) {
      setSelectedCallId(activeNiche.sampleCallers[0].id);
    }
  }, [selectedNicheKey]);

  // Audio waveform animation tick
  useEffect(() => {
    let interval : ReturnType<typeof setInterval> | undefined ;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Current active caller object
  const currentCaller = useMemo(() => {
    return activeNiche.sampleCallers.find((c) => c.id === selectedCallId) || activeNiche.sampleCallers[0];
  }, [activeNiche, selectedCallId]);

  // Handler for simulating a test call
  const triggerSimulateCall = () => {
    setIsSimulatingCall(true);
    setTimeout(() => {
      setIsSimulatingCall(false);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-[#10B981]/30 selection:text-white flex flex-col">
      {/* -------------------------------------------------------------
          TOP INTERACTIVE PREVIEW & STEPPER BAR
      -------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#1F2937] px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div 
            onClick={() => setCurrentStep('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#10B981] via-[#06B6D4] to-cyan-400 flex items-center justify-center shadow-lg shadow-[#10B981]/20 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-[#0B0F19] stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight flex items-center gap-1 text-white">
                Zyntax <span className="text-[#06B6D4]">AI</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold">
                Autonomous Telephony
              </span>
            </div>
          </div>

          {/* Stepper Progress Tabs */}
          <nav aria-label="Step Flow" className="flex items-center bg-[#111827] p-1 rounded-xl border border-[#1F2937] text-xs font-medium">
            <button
              onClick={() => setCurrentStep('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentStep === 'landing'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
              <span>Landing Page</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

            <button
              onClick={() => setCurrentStep('onboarding')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentStep === 'onboarding'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
              <span>Niche Setup</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

            <button
              onClick={() => setCurrentStep('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentStep === 'dashboard'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
              <span>Live Dashboard</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />

            <button
              onClick={() => setCurrentStep('workflows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentStep === 'workflows'
                  ? 'bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">4</span>
              <span>Workflows</span>
            </button>
          </nav>

          {/* Quick Info & Active Persona */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-full font-mono">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>Sub-400ms Voice Engine</span>
            </div>
            <div className="bg-[#111827] border border-[#1F2937] px-2.5 py-1 rounded-lg text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400">Niche:</span>
              <span className="text-[#06B6D4] font-medium">{activeNiche.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------
          MAIN VIEW CONTAINER
      -------------------------------------------------------------- */}
      <main className="flex-1 flex flex-col">
        {/* =========================================================
            STEP 1: HIGH CONVERTING SAAS LANDING PAGE
        ========================================================== */}
        {currentStep === 'landing' && (
          <section className="relative overflow-hidden flex-1 flex flex-col justify-between py-12 px-4 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Background glowing effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#10B981]/15 to-[#06B6D4]/15 blur-[120px] pointer-events-none rounded-full" />
            
            {/* Secondary Navigation */}
            <div className="flex items-center justify-between pb-8 border-b border-[#1F2937]/60 text-sm">
              <div className="flex items-center gap-8">
                <span className="font-semibold text-white tracking-wide">Zyntax AI</span>
                <div className="hidden md:flex items-center gap-6 text-slate-400 font-medium">
                  <a href="#product" className="hover:text-emerald-400 transition-colors">Product</a>
                  <a href="#solutions" className="hover:text-emerald-400 transition-colors">Solutions</a>
                  <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
                  <a href="#resources" className="hover:text-emerald-400 transition-colors">Resources</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentStep('onboarding')}
                  className="text-xs sm:text-sm text-slate-300 hover:text-white px-3 py-1.5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentStep('onboarding')}
                  className="text-xs sm:text-sm bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold px-4 py-2 rounded-xl hover:opacity-95 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-10">
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Glow Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-emerald-500/40 text-emerald-400 text-xs font-semibold shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>AI Receptionist + Automation Engine</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                  Automate the Calls.{' '}
                  <span className="bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-cyan-400 bg-clip-text text-transparent">
                    Grow Your Business.
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
                  An autonomous AI voice receptionist that answers missed calls in sub-400ms, qualifies patients & leads, schedules appointments on your calendar, and recovers thousands in lost pipeline.
                </p>

                {/* CTA Group */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setCurrentStep('onboarding')}
                    className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:from-emerald-400 hover:to-cyan-300 text-[#0B0F19] font-extrabold text-base px-7 py-3.5 rounded-xl shadow-xl shadow-emerald-500/25 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedNicheKey('dental');
                      setCurrentStep('dashboard');
                    }}
                    className="bg-[#111827] hover:bg-slate-800/80 border border-[#1F2937] hover:border-slate-600 text-white font-semibold text-base px-6 py-3.5 rounded-xl flex items-center gap-2.5 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-[#06B6D4] fill-[#06B6D4]" />
                    </div>
                    <span>Watch Interactive Demo</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 border-t border-[#1F2937]/70 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>HIPAA & SOC2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#06B6D4]" />
                    <span>Setup in 3 Minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Trusted by 10,000+ SMBs</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual: Interactive AI Voice Preview Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md bg-[#111827]/90 rounded-2xl border border-[#1F2937] p-6 shadow-2xl backdrop-blur-xl space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-[#0B0F19]">
                          <Bot className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-[#111827]" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                          <span>Zyntax Autonomous Agent</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">Active</span>
                        </div>
                        <p className="text-xs text-slate-400">Incoming Telephony Line #1</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-emerald-400">
                      <PhoneCall className="w-4 h-4 animate-bounce" />
                    </div>
                  </div>

                  {/* Speech Bubbles */}
                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-slate-300 max-w-[85%]">
                      <p className="text-[10px] uppercase font-mono text-[#06B6D4] mb-1">Incoming Caller</p>
                      "Hi! I was trying to reach the clinic. Do you have any emergency dental slots open tomorrow morning?"
                    </div>

                    <div className="ml-auto bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 rounded-xl p-3 text-emerald-100 max-w-[88%] shadow-md">
                      <p className="text-[10px] uppercase font-mono text-emerald-400 mb-1 flex items-center justify-between">
                        <span>Zyntax AI (Spoken in 380ms)</span>
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                      </p>
                      "Hello! Yes, Dr. Smith has an emergency slot available tomorrow at 9:30 AM. Would you like me to book that right now?"
                    </div>
                  </div>

                  {/* Dynamic Audio Waveform Simulator */}
                  <div className="bg-[#0B0F19] rounded-xl p-3.5 border border-[#1F2937] space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Natural Neural Voice (Rachel)</span>
                      </div>
                      <span className="font-mono text-slate-500">0:14 / 0:45</span>
                    </div>

                    {/* Waveform Bars */}
                    <div className="flex items-center justify-between gap-1 h-8 px-1">
                      {[40, 65, 80, 45, 90, 70, 30, 85, 95, 60, 40, 75, 100, 85, 50, 65, 90, 45, 70, 55, 80, 40].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            i < 12
                              ? 'bg-gradient-to-t from-[#10B981] to-[#06B6D4]'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Instant Action CTA inside card */}
                  <button
                    onClick={() => setCurrentStep('onboarding')}
                    className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Test With Your Own Phone Number</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="py-4 px-6 bg-[#111827]/80 border border-[#1F2937] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">From missed calls to booked appointments:</span>
                <span className="text-[#10B981] font-semibold">100% Autonomous.</span>
              </div>
              <button
                onClick={() => setCurrentStep('onboarding')}
                className="text-[#06B6D4] hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Select Your Business Niche</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            STEP 2: SELECT YOUR BUSINESS TYPE (ONBOARDING)
        ========================================================== */}
        {currentStep === 'onboarding' && (
          <section className="flex-1 flex flex-col justify-center items-center py-12 px-4 max-w-5xl mx-auto w-full">
            <div className="w-full space-y-8 text-center">
              {/* Header */}
              <div className="space-y-3 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-slate-300 text-xs font-medium">
                  <span>Step 2 of 4</span>
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  <span className="text-[#06B6D4]">Smart Personalization</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                  What type of business do you run?
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
                  Choose your vertical to load optimized telephony workflows, HIPAA/CRM integrations, and real-time revenue telemetry.
                </p>
              </div>

              {/* 3 Selectable Interactive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
                {Object.values(NICHES).map((niche) => {
                  const IconComponent = niche.icon;
                  const isSelected = selectedNicheKey === niche.id;

                  return (
                    <div
                      key={niche.id}
                      onClick={() => setSelectedNicheKey(niche.id as keyof typeof NICHES ) }
                      className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#111827] border-2 border-[#10B981] shadow-xl shadow-emerald-500/15 scale-102'
                          : 'bg-[#111827]/70 border border-[#1F2937] hover:border-slate-600 hover:bg-[#111827]'
                      }`}
                    >
                      {/* Checkmark indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#10B981] text-[#0B0F19]'
                              : 'bg-slate-800 text-[#06B6D4]'
                          }`}
                        >
                          <IconComponent className="w-6 h-6 stroke-[2]" />
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? 'bg-[#10B981] border-[#10B981] text-[#0B0F19]'
                              : 'border-slate-700 bg-slate-900/40 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          {niche.name}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {niche.tagline}
                        </p>
                      </div>

                      {/* Badge for Average Ticket */}
                      <div className="mt-6 pt-4 border-t border-[#1F2937] flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">Industry Benchmark</span>
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                          Avg Ticket: {niche.ticketLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-6 flex flex-col items-center gap-3">
                <button
                  onClick={() => setCurrentStep('dashboard')}
                  className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:opacity-95 text-[#0B0F19] font-extrabold text-base px-10 py-3.5 rounded-xl shadow-xl shadow-emerald-500/20 flex items-center gap-2 transform hover:scale-105 transition-all"
                >
                  <span>Continue to Personalized Dashboard</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
                <p className="text-xs text-slate-500">
                  Pre-configured with sample tenant: <span className="text-slate-300 font-medium">{activeNiche.company}</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            STEP 3: NICHE-ADAPTIVE PERSONALIZED DASHBOARD
        ========================================================== */}
        {currentStep === 'dashboard' && (
          <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 gap-6">
            {/* Left Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col justify-between bg-[#111827] border border-[#1F2937] rounded-2xl p-4">
              <div className="space-y-6">
                {/* User & Clinic Profile */}
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#10B981] to-[#06B6D4] flex items-center justify-center text-[#0B0F19] font-bold text-sm">
                    {activeNiche.doctor.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{activeNiche.doctor}</p>
                    <p className="text-[10px] text-slate-400 truncate">{activeNiche.company}</p>
                  </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1 text-xs font-medium">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/30">
                    <Activity className="w-4 h-4" />
                    <span>Live Telemetry</span>
                  </button>
                  <button 
                    onClick={() => setCurrentStep('workflows')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                  >
                    <Layers className="w-4 h-4" />
                    <span>AI Workflows</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
                    <PhoneIncoming className="w-4 h-4" />
                    <span>Call Recordings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
                    <Database className="w-4 h-4" />
                    <span>{activeNiche.crm}</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Telephony Settings</span>
                  </button>
                </nav>
              </div>

              {/* Bottom Compliance & Balance Card */}
              <div className="space-y-3 pt-4 border-t border-[#1F2937] text-xs">
                <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937] space-y-1">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Twilio Balance</span>
                    <span className="font-mono text-emerald-400 font-bold">$42.50</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Auto-refill at $10</span>
                    <span className="text-[#10B981]">Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-emerald-400/90 bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1.5 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>HIPAA Compliance: Verified</span>
                </div>
              </div>
            </aside>

            {/* Right Main Dashboard Area */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              {/* Dynamic Header & Telemetry Bar */}
              <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Good Evening, <span className="text-[#10B981]">{activeNiche.doctor}</span> 👋
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Your autonomous AI receptionist is live and monitoring incoming lines for <span className="text-white font-medium">{activeNiche.company}</span>.
                  </p>
                </div>

                {/* Telemetry Status Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#0B0F19] border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span className="text-emerald-400">Twilio Live: +1 (512) 849-9210</span>
                  </div>

                  {/* Simulate Test Call Button */}
                  <button
                    onClick={triggerSimulateCall}
                    disabled={isSimulatingCall}
                    className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-[#06B6D4] text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className={`w-3.5 h-3.5 ${isSimulatingCall ? 'animate-spin' : ''}`} />
                    <span>{isSimulatingCall ? 'Intercepting Call...' : 'Simulate Call'}</span>
                  </button>

                  {/* Live Manual Takeover Toggle */}
                  <div className="flex items-center gap-2 bg-[#0B0F19] border border-[#1F2937] px-3 py-1.5 rounded-xl text-xs">
                    <span className="text-slate-400 text-[11px]">Human Takeover</span>
                    <button
                      onClick={() => setManualTakeover(!manualTakeover)}
                      className={`w-8 h-4.5 rounded-full transition-colors relative p-0.5 ${
                        manualTakeover ? 'bg-[#F59E0B]' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                          manualTakeover ? 'translate-x-3.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Navigation to Workflows */}
                  <button
                    onClick={() => setCurrentStep('workflows')}
                    className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 hover:opacity-95 shadow-md shadow-emerald-500/20"
                  >
                    <span>Open Workflows</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* 3 Hero KPI Cards (Niche Adaptive) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* KPI 1 */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Missed Calls Intercepted</span>
                    <PhoneMissed className="w-4 h-4 text-[#06B6D4]" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono">{activeNiche.kpi.intercepted}</span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900">
                      {activeNiche.kpi.interceptedGrowth}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                    <span>100% responded &lt; 4 seconds</span>
                  </p>
                </div>

                {/* KPI 2 */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>Confirmed Bookings</span>
                    <Calendar className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono">{activeNiche.kpi.bookings}</span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900">
                      {activeNiche.kpi.bookingsGrowth}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                    <Database className="w-3 h-3 text-[#06B6D4]" />
                    <span>Auto-synced to {activeNiche.crm.split(' ')[0]}</span>
                  </p>
                </div>

                {/* KPI 3 (High-Contrast Emerald Card) */}
                <div className="bg-gradient-to-br from-[#111827] via-[#111827] to-emerald-950/50 border-2 border-[#10B981]/50 rounded-2xl p-5 shadow-lg shadow-emerald-950/40">
                  <div className="flex items-center justify-between text-emerald-400 text-xs mb-2 font-medium">
                    <span>Recovered Revenue Pipeline</span>
                    <DollarSign className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                      {activeNiche.kpi.recoveredRevenue}
                    </span>
                    <span className="text-xs font-semibold text-emerald-300 bg-[#10B981]/20 px-1.5 py-0.5 rounded border border-[#10B981]/40">
                      {activeNiche.kpi.revenueGrowth}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-2">
                    Based on {activeNiche.ticketLabel} avg ticket calculation
                  </p>
                </div>
              </div>

              {/* Split Workstation: Left (Call Feed) & Right (Inspector) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
                {/* Left Column: Live Call & SMS Activity */}
                <div className="lg:col-span-5 bg-[#111827] border border-[#1F2937] rounded-2xl p-4 flex flex-col">
                  {/* Activity Tabs */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F2937] gap-2">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      {['All', 'Missed', 'Booked', 'Urgent'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setFilterTab(tab)}
                          className={`px-2.5 py-1 rounded-lg transition-colors ${
                            filterTab === tab
                              ? 'bg-slate-800 text-white font-semibold'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Live Feed</span>
                  </div>

                  {/* List of Calls */}
                  <div className="space-y-2 mt-3 overflow-y-auto max-h-[460px] pr-1">
                    {activeNiche.sampleCallers.map((caller) => {
                      const isSelected = caller.id === selectedCallId;
                      return (
                        <div
                          key={caller.id}
                          onClick={() => setSelectedCallId(caller.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-800/90 border-[#10B981]/70 shadow-md'
                              : 'bg-[#0B0F19]/60 border-[#1F2937] hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-xs text-white">{caller.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{caller.time}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-400 font-mono">{caller.phone}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                                caller.status === 'Booked'
                                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                  : caller.status === 'Follow-up'
                                  ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                                  : 'bg-amber-950 text-amber-400 border-amber-800'
                              }`}
                            >
                              {caller.status}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 mt-2 truncate">
                            {caller.type}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Call Details & AI Inspector */}
                <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  {/* Top Caller Header & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                        {currentCaller.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          <span>{currentCaller.name}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                            {currentCaller.duration}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">{currentCaller.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="bg-slate-800 hover:bg-slate-700 text-xs text-white px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Call Back</span>
                      </button>
                      <button className="bg-slate-800 hover:bg-slate-700 text-xs text-white px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                        <span>SMS Lead</span>
                      </button>
                    </div>
                  </div>

                  {/* Audio Waveform Simulator */}
                  <div className="bg-[#0B0F19] rounded-xl p-3 border border-[#1F2937] space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="w-7 h-7 rounded-full bg-[#10B981] text-[#0B0F19] flex items-center justify-center hover:scale-105 transition-transform"
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                          )}
                        </button>
                        <span className="font-semibold text-slate-200">Call Audio Recording</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        0:24 / {currentCaller.duration}
                      </span>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${audioProgress}%` }}
                        className="h-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Transcript Chat Bubbles */}
                  <div className="space-y-2.5 bg-[#0B0F19]/70 rounded-xl p-3 border border-[#1F2937] max-h-48 overflow-y-auto text-xs">
                    <p className="text-[10px] uppercase font-mono text-slate-500 mb-1">Live Transcript Stream</p>
                    {currentCaller.transcript.map((line, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed ${
                          line.speaker === 'Zyntax AI'
                            ? 'ml-auto bg-slate-800/90 text-emerald-100 border border-emerald-500/30'
                            : 'bg-slate-900/90 text-slate-300 border border-slate-800'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold block mb-0.5 text-[#06B6D4]">
                          {line.speaker}
                        </span>
                        {line.text}
                      </div>
                    ))}
                  </div>

                  {/* AI Triage & Automated Actions Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    {/* Triage Summary */}
                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937]">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3" />
                        AI Triage Summary
                      </span>
                      <p className="text-slate-300 leading-snug">{currentCaller.summary}</p>
                    </div>

                    {/* Automated Actions */}
                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937]">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Automated Actions Taken
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {currentCaller.actions.map((act, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                            <span className="truncate">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            STEP 4: VISUAL AI WORKFLOW AUTOMATION ENGINE
        ========================================================== */}
        {currentStep === 'workflows' && (
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] border border-[#1F2937] rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep('dashboard')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 pr-3 border-r border-[#1F2937]"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Back to Dashboard</span>
                </button>
                <div className="flex items-center gap-1 bg-[#0B0F19] p-1 rounded-xl border border-[#1F2937] text-xs">
                  {['ai_workflows', 'automation', 'analytics', 'settings'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setWorkflowActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        workflowActiveTab === tab
                          ? 'bg-[#10B981] text-[#0B0F19] font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {workflowSavedToast && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 animate-pulse">
                    <CheckCircle2 className="w-4 h-4" />
                    Workflow Active on Twilio & CRM
                  </span>
                )}
                <button
                  onClick={() => {
                    setWorkflowSavedToast(true);
                    setTimeout(() => setWorkflowSavedToast(false), 3000);
                  }}
                  className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#0B0F19] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:opacity-95"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Save & Deploy Workflow</span>
                </button>
              </div>
            </div>

            {/* Split Grid: Workflow Node Pipeline & Performance Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Visual Pipeline Flow Editor */}
              <div className="lg:col-span-7 bg-[#111827] border border-[#1F2937] rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Autonomous Receptionist Pipeline</span>
                    <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">Active</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Triggers instantaneously whenever a patient or client calls outside office hours or call drops.
                  </p>
                </div>

                {/* Node Step 1: Inbound Lead Trigger */}
                <div className="relative pl-6 border-l-2 border-[#10B981]/50 space-y-6">
                  {/* Node 1 */}
                  <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 relative group hover:border-[#10B981] transition-colors">
                    <span className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#111827]" />
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <PhoneIncoming className="w-3.5 h-3.5 text-[#06B6D4]" />
                        Trigger: Inbound Phone Call / Missed Call
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">Twilio SIP Trunk</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Intercepts missed call within 400ms. Initializes neural voice synthesizer.
                    </p>
                  </div>

                  {/* Node 2 */}
                  <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 relative group hover:border-[#10B981] transition-colors">
                    <span className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-[#06B6D4] border-2 border-[#111827]" />
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-[#10B981]" />
                        AI Qualify & Schedule Intent
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">Zyntax Neural v4</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Extracts caller urgency, cross-references calendar availability in real-time, and locks time slot.
                    </p>
                  </div>

                  {/* Node 3 */}
                  <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 relative group hover:border-[#10B981] transition-colors">
                    <span className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-[#111827]" />
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-[#F59E0B]" />
                        Dispatch Immediate SMS & Intake Link
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">Sub-2 sec trigger</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Sends confirmation SMS with calendar link, intake forms, and clinic directions.
                    </p>
                  </div>

                  {/* Node 4 */}
                  <div className="bg-[#0B0F19] border border-[#1F2937] rounded-xl p-4 relative group hover:border-[#10B981] transition-colors">
                    <span className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#111827]" />
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-emerald-400" />
                        Synchronize to CRM ({activeNiche.crm})
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">REST API Webhook</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Creates new patient record, saves call transcript, audio recording link, and scheduled slot.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Engine: Fully autonomous zero-code state machine</span>
                  <button className="text-[#06B6D4] hover:underline flex items-center gap-1">
                    <span>Add Custom Conditional Branch</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Workflow Performance & Real-Time Logs */}
              <div className="lg:col-span-5 space-y-6">
                {/* 3 Performance Metric Cards */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">Pipeline Telemetry</h4>
                    <span className="text-[10px] text-slate-500 font-mono">Last 30 Days</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937]">
                      <span className="text-[10px] text-slate-400 block mb-1">Tasks Run</span>
                      <span className="text-lg font-bold text-white font-mono">1,248</span>
                      <span className="text-[10px] text-emerald-400 block font-semibold">+32%</span>
                    </div>

                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937]">
                      <span className="text-[10px] text-slate-400 block mb-1">Leads Synced</span>
                      <span className="text-lg font-bold text-white font-mono">326</span>
                      <span className="text-[10px] text-emerald-400 block font-semibold">+28%</span>
                    </div>

                    <div className="bg-[#0B0F19] p-3 rounded-xl border border-[#1F2937]">
                      <span className="text-[10px] text-slate-400 block mb-1">Success Rate</span>
                      <span className="text-lg font-bold text-[#10B981] font-mono">99.4%</span>
                      <span className="text-[10px] text-emerald-400 block font-semibold">0 Errors</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Autonomous Activity Feed */}
                <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]">
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#10B981]" />
                      <span>Live Autonomous Action Logs</span>
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono">Real-time</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {[
                      { time: '12s ago', text: 'Intake SMS sent to +1 (512) 541-8923', status: 'Delivered', color: 'text-emerald-400' },
                      { time: '1m ago', text: 'Appointment slot booked in Dentrix calendar for Sarah Johnson', status: 'Synced', color: 'text-cyan-400' },
                      { time: '5m ago', text: 'Voice recording transcribing finished: 1m 24s duration', status: 'Indexed', color: 'text-slate-300' },
                      { time: '14m ago', text: 'New inbound call answered in 340ms', status: 'Success', color: 'text-emerald-400' },
                      { time: '22m ago', text: 'Follow-up reminder scheduled for Dr. Smith review', status: 'Queued', color: 'text-amber-400' }
                    ].map((log, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-[#0B0F19] border border-slate-800/80">
                        <div className="space-y-0.5">
                          <p className="text-slate-200 text-[11px] leading-tight">{log.text}</p>
                          <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold shrink-0 ${log.color}`}>
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          BOTTOM FOOTER BAR
      -------------------------------------------------------------- */}
      <footer className="border-t border-[#1F2937] bg-[#0B0F19] px-4 lg:px-8 py-3 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-slate-300 font-medium">Zyntax AI Autonomous Telephony Engine</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Designed for Dental, Real Estate & Consulting</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Latency: <strong className="text-emerald-400 font-mono">380ms</strong></span>
            <span>Uptime: <strong className="text-cyan-400 font-mono">99.98%</strong></span>
            <span>Security: <strong className="text-white">HIPAA / TLS 1.3</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
