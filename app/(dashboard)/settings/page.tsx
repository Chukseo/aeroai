"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-brand-heading">
          Settings
        </h1>
        <p className="text-xs text-brand-muted">
          Configure model parameters, vector database credentials, and organizational rules
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-brand-heading">
              AI Configuration
            </h3>

            <div>
              <label className="block text-brand-muted mb-1 font-medium">
                OpenAI API Key
              </label>
              <Input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-... (optional in local mode)"
              />
              <p className="mt-1 text-[10px] text-brand-muted">
                When empty, the system runs with local pre-seeded deterministic aviation intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-brand-muted mb-1 font-medium">
                  Reasoning Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
                >
                  <option value="gpt-4o">GPT-4o (Production Compliance)</option>
                  <option value="gpt-4o-mini">GPT-4o-mini (Fast Triage)</option>
                  <option value="o1">o1 (Complex Multi-Regulatory Proofs)</option>
                  <option value="gpt-5">GPT-5 (Next-Gen Reasoning)</option>
                </select>
              </div>

              <div>
                <label className="block text-brand-muted mb-1 font-medium">
                  Embedding Model
                </label>
                <select className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none">
                  <option>text-embedding-3-small (1536 dims)</option>
                  <option>text-embedding-3-large (3072 dims)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-brand-heading">
              Data & Storage Status
            </h3>

            <div className="flex items-center justify-between text-xs py-1 border-b border-brand-border/60">
              <span className="text-brand-muted">Vector Store</span>
              <span className="font-mono text-brand-green">1,536-dim pgvector HNSW</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1 border-b border-brand-border/60">
              <span className="text-brand-muted">Tenant Isolation</span>
              <span className="font-mono text-brand-green">Row Level Security (RLS) Active</span>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-brand-muted">Seeded Regulatory Base</span>
              <span className="font-mono text-brand-text">FAA 14 CFR, EASA, ICAO</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-brand-green font-medium">
              Configuration saved
            </span>
          )}
          <Button type="submit" size="sm">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
