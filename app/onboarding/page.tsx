"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  Building2,
  Briefcase,
  Check,
  ArrowRight,
  PhoneCall,
  Building
} from "lucide-react";

type NicheType = "dental" | "realestate" | "consulting";

export default function OnboardingPage() {
  const router = useRouter();
  const [niche, setNiche] = useState<NicheType>("dental");
  const [businessName, setBusinessName] = useState("Austin Family Dental");
  const [forwardingPhone, setForwardingPhone] = useState("+1 (512) 849-3921");

  const handleNicheChange = (selected: NicheType) => {
    setNiche(selected);
    if (selected === "dental") setBusinessName("Austin Family Dental");
    if (selected === "realestate") setBusinessName("Vance Luxury Realty");
    if (selected === "consulting") setBusinessName("Apex Growth Advisory");
  };

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    const avgTicket = niche === "dental" ? 250 : niche === "realestate" ? 5000 : 1500;

    localStorage.setItem(
      "zyntax_tenant",
      JSON.stringify({
        niche,
        businessName,
        forwardingPhone,
        avgTicket
      })
    );
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-[#111827] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step 2 of 2 • Workspace Calibration
          </span>
          <h1 className="text-3xl font-black text-white mt-4 mb-2">
            What type of business do you run?
          </h1>
          <p className="text-xs text-slate-400">
            Select your industry to configure AI triage scripts, CRM sync, and ROI tracking.
          </p>
        </div>

        <form onSubmit={handleCompleteOnboarding} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                id: "dental" as NicheType,
                title: "Dental Clinic",
                desc: "Missed patient calls, emergency triage & Dentrix sync",
                ticket: "Avg Ticket: $250",
                icon: Stethoscope
              },
              {
                id: "realestate" as NicheType,
                title: "Real Estate",
                desc: "Buyer inquiries, property tours & FUB sync",
                ticket: "Avg Ticket: $5,000",
                icon: Building2
              },
              {
                id: "consulting" as NicheType,
                title: "Consulting",
                desc: "Discovery call qualification & retainer intake",
                ticket: "Avg Ticket: $1,500",
                icon: Briefcase
              }
            ].map((item) => {
              const Icon = item.icon;
              const active = niche === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleNicheChange(item.id)}
                  className={`cursor-pointer rounded-xl p-5 border-2 transition relative flex flex-col justify-between ${
                    active
                      ? "border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10"
                      : "border-[#1F2937] bg-[#0B0F19] hover:border-slate-700"
                  }`}
                >
                  {active && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-white mb-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 mb-3">{item.desc}</p>
                  </div>
                  <span className="inline-block bg-[#111827] border border-[#1F2937] text-emerald-400 text-[11px] font-mono px-2 py-1 rounded text-center font-semibold">
                    {item.ticket}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                Clinic / Company Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                Main Business Forwarding Number
              </label>
              <div className="relative">
                <PhoneCall className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={forwardingPhone}
                  onChange={(e) => setForwardingPhone(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-[#1F2937] focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            <span>Launch Live Telemetry Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
