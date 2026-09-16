import React from "react";
import Link from "next/link";
import { Plane, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070d18] flex items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
          <Plane className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold text-white">404 - Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested aviation compliance resource or manual route does not exist.
        </p>
        <div className="pt-2">
          <Link href="/dashboard">
            <Button variant="aviation" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
