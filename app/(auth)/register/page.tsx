"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [orgName, setOrgName] = useState("SkyWings Air Charter & MRO");
  const [iataCode, setIataCode] = useState("SKW / Part 145");
  const [domain, setDomain] = useState("FAA");
  const [email, setEmail] = useState("compliance@skywings-aero.com");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-md bg-brand-amber text-white text-sm font-bold">
            A
          </div>
          <h1 className="text-lg font-bold text-brand-heading">
            Register Organization
          </h1>
          <p className="text-xs text-brand-muted">
            Workspace setup for Part 121, 135, 145, or CAMO
          </p>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-card p-6 shadow-xl">
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1">
                Organization Name
              </label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Atlas Air Maintenance"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-brand-muted mb-1">
                  Certificate / ICAO
                </label>
                <Input
                  value={iataCode}
                  onChange={(e) => setIataCode(e.target.value)}
                  placeholder="Part 145 #4321"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-muted mb-1">
                  Authority
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
                >
                  <option value="FAA">FAA (United States)</option>
                  <option value="EASA">EASA (European Union)</option>
                  <option value="ICAO">ICAO Standard</option>
                  <option value="DUAL">Dual FAA & EASA</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1">
                Admin Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
              />
            </div>

            <Button type="submit" className="w-full h-9 mt-2">
              Create Organization
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-brand-border text-center text-xs text-brand-muted">
            <span>Already registered? </span>
            <Link href="/login" className="text-brand-amber hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
