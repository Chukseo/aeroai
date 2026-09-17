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
    <div className="flex flex-col h-[calc(100dvh-7.5rem)] lg:h-[calc(100vh-9rem)] rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm">

      {/* Chat header */}
      <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-stone-100 bg-stone-50/80">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-stone-800 tracking-tight">aeroAI</span>
            <span className="ml-1.5 sm:ml-2 text-[10px] text-stone-400">FAA Compliance</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-medium text-stone-400">Groq Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 sm:space-y-5 bg-stone-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-amber-600 text-white font-medium shadow-sm rounded-br-sm"
                  : "bg-white border border-stone-200 text-stone-800 shadow-sm rounded-bl-sm"
              }`}
            >
              {msg.role === "assistant" && msg.confidence_score && (
                <div className="mb-2">
                  <ConfidenceBadge score={msg.confidence_score} />
                </div>
              )}
              {msg.role === "assistant" && msg.engineNotice && (
                <div className="mb-2 flex items-start gap-1.5 rounded-lg bg-yellow-50 border border-yellow-200 px-2.5 py-1.5 text-[10px] text-yellow-700">
                  <span className="mt-px shrink-0">⚠</span>
                  <span>{msg.engineNotice}</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.role === "assistant" && msg.citations && (
                <CitationPopover citations={msg.citations} />
              )}
              <p className={`mt-2 text-[10px] ${msg.role === "user" ? "text-white/60" : "text-stone-400"}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-sm shadow-sm p-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-stone-400">
                  Analysing regulations, contracts, and procedures…
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-3 sm:px-4 py-2 border-t border-stone-100 bg-white flex gap-1.5 sm:gap-2 overflow-x-auto">
        {PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => send(p)}
            className="shrink-0 rounded-lg border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[11px] text-stone-500 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-all whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="p-2.5 sm:p-4 border-t border-stone-200 bg-white flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Ask aeroAI about contracts, rest limits..."
          className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-xs text-stone-700 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none transition-all shadow-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
