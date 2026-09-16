"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, Citation } from "@/types";
import { CitationPopover } from "./citation-popover";
import { ConfidenceBadge } from "./confidence-badge";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const PROMPTS = [
  "What are mandatory drug testing clauses in pilot employment contracts?",
  "What does FAR Part 117 require for flight crew rest and fatigue calls?",
  "What are FAA requirements for maintenance record retention?",
  "Does our HR handbook comply with FAA Part 5 Just Culture reporting?",
];

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome", role: "assistant",
      content: "Welcome to aeroAI. Ask any question about company manuals, employee contracts, HR policies, or aviation regulations — every answer cites verified sources.",
      confidence_score: 0.99,
      citations: [
        { source_type: "regulation", source_title: "14 CFR § 120 - Drug and Alcohol Testing", code_or_section: "§ 120.109", excerpt: "Types of drug and alcohol testing required for safety-sensitive personnel...", relevance_score: 0.98 },
        { source_type: "internal_manual", source_title: "Commercial Pilot Employment Agreement", code_or_section: "Pilot Contract Sec 4", excerpt: "Flight duty limits, fatigue declaration, and FAR Part 117 rest requirements...", relevance_score: 0.96 },
      ],
      created_at: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setMessages((p) => [...p, { id: `u-${Date.now()}`, role: "user", content: q, created_at: new Date().toISOString() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = res.ok ? await res.json() : null;
      setMessages((p) => [...p, {
        id: `a-${Date.now()}`, role: "assistant",
        content: data?.answer || "Unable to process the query. Please try again.",
        citations: data?.citations, confidence_score: data?.confidenceScore,
        created_at: new Date().toISOString(),
      }]);
    } catch { setMessages((p) => [...p, { id: `e-${Date.now()}`, role: "assistant", content: "Connection error. Please retry.", created_at: new Date().toISOString() }]); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-lg border border-brand-border bg-brand-bg overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-lg p-4 text-[13px] leading-relaxed ${
              msg.role === "user" ? "bg-brand-amber text-white" : "bg-brand-card text-brand-text border border-brand-border"
            }`}>
              {msg.role === "assistant" && msg.confidence_score && (
                <div className="mb-2"><ConfidenceBadge score={msg.confidence_score} /></div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.role === "assistant" && msg.citations && <CitationPopover citations={msg.citations} />}
              <p className={`mt-2 text-[10px] ${msg.role === "user" ? "text-white/60" : "text-brand-muted"}`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-brand-card border border-brand-border p-4 text-xs text-brand-muted">
              aeroAI is analyzing regulations, contracts, and procedures…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-5 py-2 border-t border-brand-border flex gap-2 overflow-x-auto">
        {PROMPTS.map((p, i) => (
          <button key={i} onClick={() => send(p)} className="shrink-0 rounded border border-brand-border bg-brand-surface px-2.5 py-1 text-[11px] text-brand-muted hover:text-brand-text hover:border-brand-amber/30 transition-colors">
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-4 border-t border-brand-border flex gap-2">
        <input
          value={input} onChange={(e) => setInput(e.target.value)} disabled={loading}
          placeholder="Ask aeroAI about employment contracts, HR policies, rest limits, or regulations…"
          className="flex-1 rounded-md border border-brand-border bg-brand-surface px-3 py-2 text-xs text-brand-text placeholder:text-brand-muted/60 focus:border-brand-amber/40 focus:outline-none"
        />
        <Button type="submit" disabled={!input.trim() || loading} size="sm" className="gap-1.5 px-4">
          <Send className="h-3 w-3" /> Send
        </Button>
      </form>
    </div>
  );
}
