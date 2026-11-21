export default function TcpaCompliancePage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <a href="/" className="text-xs text-emerald-400 hover:underline">← Back to Zyntax AI</a>
        <h1 className="text-3xl font-black text-white">TCPA &amp; SMS Opt-In Policy</h1>
        <p className="text-xs text-slate-400">A2P 10DLC Messaging Compliance • Zyntax AI</p>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            When a caller contacts a business powered by Zyntax AI or submits their phone number via our live demo widget, they consent to receive transactional voice calls and SMS appointment confirmations or missed-call follow-up links.
          </p>
          <p>
            <strong>Opt-Out Instructions:</strong> Recipients may opt out of automated SMS messages at any time by replying <strong>STOP</strong>. Reply <strong>HELP</strong> for support. Message and data rates may apply.
          </p>
        </div>
      </div>
    </div>
  );
}
