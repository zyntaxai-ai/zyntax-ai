import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zyntax AI — Autonomous AI Receptionist & Lead Recovery",
  description:
    "Sub-500ms AI receptionist that answers missed calls, schedules appointments, and automates CRM workflows for high-ticket local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0B0F19] text-slate-100 antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-400`}>
        {children}
      </body>
    </html>
  );
}
