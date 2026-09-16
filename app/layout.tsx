import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AeroCompliance - aeroAI",
  description:
    "aeroAI: AI-powered Aviation Compliance, Employee Contracts, Regulatory Gap Analysis, Audit Readiness, and Procedure Verification for FAA, EASA, ICAO, and DOT standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#111318] text-[#e0dbd3] antialiased selection:bg-[#c4841d]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
