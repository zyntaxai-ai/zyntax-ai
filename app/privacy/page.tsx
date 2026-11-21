export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <a href="/" className="text-xs text-emerald-400 hover:underline">← Back to Zyntax AI</a>
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last Updated: November 2026 • Zyntax AI</p>
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Zyntax AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) protects the privacy and security of business tenants and their callers. We collect phone numbers, call transcripts, and appointment metadata strictly to operate AI receptionist and automated scheduling workflows.
          </p>
          <p>
            <strong>SMS &amp; Mobile Information Sharing:</strong> No mobile information, phone numbers, or SMS opt-in consent data will be shared with third parties or affiliates for marketing or promotional purposes. All data is isolated per tenant and encrypted in transit and at rest.
          </p>
          <p>
            <strong>HIPAA Alignment:</strong> For healthcare and dental workspaces, Zyntax AI enforces strict access controls, encrypted storage, and Business Associate Agreement (BAA) safeguards.
          </p>
        </div>
      </div>
    </div>
  );
}
