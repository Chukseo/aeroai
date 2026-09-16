"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("compliance@skywings-aero.com");
  const [password, setPassword] = useState("••••••••••••");
  const [role, setRole] = useState("compliance_manager");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-md bg-brand-amber text-white text-sm font-bold">
            A
          </div>
          <h1 className="text-lg font-bold text-brand-heading">
            AeroCompliance
          </h1>
          <p className="text-xs text-brand-muted">
            Sign in to your aviation compliance portal
          </p>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-card p-6 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1">
                Corporate Email
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
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-muted mb-1">
                Assigned Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-md border border-brand-border bg-brand-surface p-2 text-xs text-brand-text focus:border-brand-amber/40 focus:outline-none"
              >
                <option value="compliance_manager">Compliance Manager</option>
                <option value="admin">Administrator</option>
                <option value="auditor">Auditor</option>
                <option value="operations_user">Operations User</option>
              </select>
            </div>

            <Button type="submit" className="w-full h-9 mt-2">
              Sign In
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-brand-border text-center text-xs text-brand-muted">
            <span>New organization? </span>
            <Link href="/register" className="text-brand-amber hover:underline font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
