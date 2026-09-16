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
      bg: "bg-amber-50",
      border: "border-amber-200",
      valueColor: "text-amber-700",
      dot: "bg-amber-500",
      subColor: "text-amber-600/70",
    },
    {
      label: "Indexed Manuals",
      value: String(totalDocs),
      sub: "All vectorised · RAG ready",
      icon: "📂",
      bg: "bg-sky-50",
      border: "border-sky-200",
      valueColor: "text-sky-700",
      dot: "bg-sky-500",
      subColor: "text-sky-600/70",
    },
    {
      label: "Open Gaps",
      value: String(openGaps),
      sub: "2 missing · 2 weak clauses",
      icon: "⚠",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      valueColor: "text-yellow-700",
      dot: "bg-yellow-500",
      subColor: "text-yellow-600/70",
    },
    {
      label: "High-Risk Items",
      value: String(highRiskCount),
      sub: "Record retention breach",
      icon: "🔺",
      bg: "bg-red-50",
      border: "border-red-200",
      valueColor: "text-red-700",
      dot: "bg-red-500",
      subColor: "text-red-600/70",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={`${item.bg} border ${item.border} rounded-xl p-5 shadow-sm transition-all hover:shadow-md`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
              {item.label}
            </p>
            <span className="text-base">{item.icon}</span>
          </div>

          <p className={`text-3xl font-bold tracking-tight ${item.valueColor} tabular-nums`}>
            {item.value}
          </p>

          <div className="mt-3 flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
            <p className={`text-[11px] ${item.subColor}`}>{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
