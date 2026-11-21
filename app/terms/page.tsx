export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <a href="/" className="text-xs text-emerald-400 hover:underline">← Back to Zyntax AI</a>
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026 • Zyntax AI</p>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            By accessing Zyntax AI or initiating a 7-Day Free Pilot, you agree to use our voice AI and automated SMS messaging tools in compliance with applicable telecommunications laws, including TCPA and A2P 10DLC guidelines.
          </p>
          <p>
            <strong>Subscriptions &amp; Pilot:</strong> Standard plans ($199/mo Starter, $299/mo Growth Pro, $599/mo Scale) include a 7-day trial period and may be canceled anytime from your workspace settings before billing begins.
          </p>
        </div>
      </div>
    </div>
  );
}
