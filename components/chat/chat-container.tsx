"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types";
import { CitationPopover } from "./citation-popover";
import { ConfidenceBadge } from "./confidence-badge";
import { Send, Sparkles } from "lucide-react";

const PROMPTS = [
  "Does Section 4 of our SkyWings contract satisfy 14 CFR § 117.25 sleep requirements?",
  "What are mandatory drug testing clauses for pilot employment contracts?",
  "How long must a Part 145 station retain torque wrench calibration records?",
  "Can an airline terminate an A&P who self-reports under our Part 5 SMS program?",
];

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome",
      role: "assistant",
      content:
        "Welcome to aeroAI — your FAA compliance intelligence engine. Ask any question about company manuals, employee contracts, HR policies, or aviation regulations. Every answer is backed by verified citations.",
      confidence_score: 0.99,
      citations: [
        {
          source_type: "regulation",
          source_title: "14 CFR § 120 - Drug and Alcohol Testing",
          code_or_section: "§ 120.109",
          excerpt: "Types of drug and alcohol testing required for safety-sensitive personnel...",
          relevance_score: 0.98,
        },
        {
          source_type: "internal_manual",
          source_title: "Commercial Pilot Employment Agreement",
          code_or_section: "Pilot Contract Sec 4",
          excerpt: "Flight duty limits, fatigue declaration, and FAR Part 117 rest requirements...",
          relevance_score: 0.96,
        },
      ],
      created_at: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setMessages((p) => [
      ...p,
      { id: `u-${Date.now()}`, role: "user", content: q, created_at: new Date().toISOString() },
    ]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = res.ok ? await res.json() : null;
      setMessages((p) => [
        ...p,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data?.answer || "Unable to process the query. Please try again.",
          citations: data?.citations,
          confidence_score: data?.confidenceScore,
          engineNotice: data?.engineNotice,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: "Connection error. Please retry.",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-2xl border border-white/[0.07] bg-[#0d0f16]/90 backdrop-blur-xl overflow-hidden shadow-[0_8px_64px_rgba(0,0,0,0.6)]">

      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <Sparkles className="h-3.5 w-3.5 text-black" />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-100 tracking-tight">aeroAI</span>
            <span className="ml-2 text-[10px] text-zinc-500">FAA Compliance Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-medium text-zinc-500">Groq LPU Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-2xl p-4 text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-amber-500 to-amber-400 text-black font-medium shadow-[0_4px_20px_rgba(245,158,11,0.25)] rounded-br-sm"
                  : "framer-card rounded-bl-sm border border-white/[0.08]"
              }`}
            >
              {msg.role === "assistant" && msg.confidence_score && (
                <div className="mb-2">
                  <ConfidenceBadge score={msg.confidence_score} />
                </div>
              )}
              {msg.role === "assistant" && msg.engineNotice && (
                <div className="mb-2 flex items-start gap-1.5 rounded-lg bg-yellow-500/[0.08] border border-yellow-500/20 px-2.5 py-1.5 text-[10px] text-yellow-400">
                  <span className="mt-px shrink-0">⚠</span>
                  <span>{msg.engineNotice}</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.role === "assistant" && msg.citations && (
                <CitationPopover citations={msg.citations} />
              )}
              <p className={`mt-2 text-[10px] ${msg.role === "user" ? "text-black/50" : "text-zinc-600"}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="framer-card rounded-2xl rounded-bl-sm border border-white/[0.08] p-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-zinc-500">
                  Analysing regulations, contracts, and procedures…
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 py-2 border-t border-white/[0.05] flex gap-2 overflow-x-auto">
        {PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => send(p)}
            className="shrink-0 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-[11px] text-zinc-500 hover:border-amber-500/30 hover:text-zinc-300 hover:bg-amber-500/[0.05] transition-all whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="p-4 border-t border-white/[0.06] flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Ask aeroAI about contracts, HR policies, rest limits, or regulations…"
          className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/30 focus:bg-white/[0.05] focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2.5 text-xs font-bold text-black shadow-[0_0_16px_rgba(245,158,11,0.2)] hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="h-3.5 w-3.5" />
          Send
        </button>
      </form>
    </div>
  );
}
