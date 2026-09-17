"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ConnStatus = { connected: boolean; status: string; message: string } | null;

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [connStatus, setConnStatus] = useState<ConnStatus>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const testConnection = async () => {
    setTesting(true);
    setConnStatus(null);
    try {
      const res = await fetch("/api/ai/test-connection");
      const data = await res.json();
      setConnStatus(data);
    } catch {
      setConnStatus({ connected: false, status: "error", message: "Could not reach the test endpoint." });
    } finally {
      setTesting(false);
    }
  };

  const statusColor = connStatus
    ? connStatus.status === "ready"
      ? "text-green-400 border-green-500/30 bg-green-500/10"
      : connStatus.status === "credit_balance_exhausted"
      ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
      : "text-red-400 border-red-500/30 bg-red-500/10"
    : "";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-brand-heading">Settings</h1>
        <p className="text-xs text-brand-muted">
          Configure model parameters, vector database credentials, and organizational rules
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-brand-heading">AI Configuration</h3>

            <div>
              <label className="block text-brand-muted mb-1 font-medium">OpenAI API Key</label>
              <Input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-... (optional in local mode)"
              />
              <p className="mt-1 text-[10px] text-brand-muted">
                When empty, aeroAI runs on the local deterministic aviation compliance engine.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-muted mb-1 font-medium">Reasoning Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
                >
                  <option value="openai/gpt-oss-120b">GPT-OSS 120B (Groq Fast LPU)</option>
                  <option value="qwen/qwen3.8-27b">Qwen 3.8 27B (Groq Fast)</option>
                  <option value="gpt-4o">GPT-4o (OpenAI Production)</option>
                  <option value="gpt-4o-mini">GPT-4o-mini (OpenAI Fast)</option>
                </select>
              </div>

              <div>
                <label className="block text-brand-muted mb-1 font-medium">Embedding Model</label>
                <select className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none">
                  <option>text-embedding-3-small (1536 dims)</option>
                  <option>text-embedding-3-large (3072 dims)</option>
                </select>
              </div>
            </div>

            {/* Connection test */}
            <div className="pt-1 space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={testConnection}
                disabled={testing}
                className="text-xs w-full sm:w-auto"
              >
                {testing ? "Testing…" : "Test OpenAI Connection"}
              </Button>

              {connStatus && (
                <div className={`flex items-start gap-2 rounded border px-3 py-2 text-[11px] ${statusColor}`}>
                  <span className="mt-px shrink-0">
                    {connStatus.status === "ready" ? "✓" : "⚠"}
                  </span>
                  <span>{connStatus.message}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-brand-heading">Data & Storage Status</h3>

            <div className="flex items-center justify-between text-xs py-1 border-b border-brand-border/60">
              <span className="text-brand-muted">Vector Store</span>
              <span className="font-mono text-brand-green">1,536-dim pgvector HNSW</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-brand-border/60">
              <span className="text-brand-muted">Tenant Isolation</span>
              <span className="font-mono text-brand-green">Row Level Security (RLS) Active</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-brand-muted">Regulatory Base</span>
              <span className="font-mono text-brand-text">FAA 14 CFR (US Aviation)</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-brand-green font-medium text-center sm:text-right">Configuration saved</span>
          )}
          <Button type="submit" size="sm" className="w-full sm:w-auto">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
