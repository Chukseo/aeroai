import React from "react";

interface ComplianceScoreCardProps {
  score?: number;
  totalDocs?: number;
  openGaps?: number;
  highRiskCount?: number;
}

export function ComplianceScoreCard({
  score = 92.4,
  totalDocs = 48,
  openGaps = 4,
  highRiskCount = 1,
}: ComplianceScoreCardProps) {
  const items = [
    {
      label: "Compliance Score",
      value: `${score.toFixed(1)}%`,
      sub: "+2.8% since last cycle",
      icon: "🛡",
      glow: "from-amber-500/20 via-amber-500/5 to-transparent",
      ring: "border-amber-500/25",
      valueColor: "text-amber-400",
      dot: "bg-amber-400",
    },
    {
      label: "Indexed Manuals",
      value: String(totalDocs),
      sub: "All vectorised · RAG ready",
      icon: "📂",
      glow: "from-sky-500/15 via-sky-500/5 to-transparent",
      ring: "border-sky-500/20",
      valueColor: "text-sky-300",
      dot: "bg-sky-400",
    },
    {
      label: "Open Gaps",
      value: String(openGaps),
      sub: "2 missing · 2 weak clauses",
      icon: "⚠",
      glow: "from-yellow-500/15 via-yellow-500/5 to-transparent",
      ring: "border-yellow-500/20",
      valueColor: "text-yellow-400",
      dot: "bg-yellow-400",
    },
    {
      label: "High-Risk Items",
      value: String(highRiskCount),
      sub: "Record retention breach",
      icon: "🔺",
      glow: "from-red-500/20 via-red-500/5 to-transparent",
      ring: "border-red-500/25",
      valueColor: "text-red-400",
      dot: "bg-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={`framer-card rounded-xl border ${item.ring} overflow-hidden relative group`}
        >
          {/* Glow gradient top */}
          <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${item.glow} pointer-events-none`} />

          <div className="relative p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                {item.label}
              </p>
              <span className="text-base">{item.icon}</span>
            </div>

            <p className={`text-3xl font-bold tracking-tight ${item.valueColor} tabular-nums`}>
              {item.value}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
              <p className="text-[11px] text-zinc-500">{item.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

