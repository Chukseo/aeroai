import React from "react";
import { DocumentGeneratorView } from "@/components/generator/document-generator-view";

export const metadata = {
  title: "US Aviation Document Generator - AeroCompliance AI",
  description:
    "Generate industry-standard, professionally formatted, and FAA-compliant aviation agreements, pilot contracts, A&P mechanic agreements, Part 5 SMS policies, and Part 145 vendor contracts in US standards.",
};

export default function DocumentGeneratorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-heading">
          US Aviation Document Generator
        </h1>
        <p className="text-xs text-brand-muted">
          Create complete, editable, and legally structured agreements tailored strictly to United States Federal Aviation Regulations (FAA 14 CFR Part 121, 135, 145, FAR Part 117, DOT 49 CFR Part 40, and PRD Part 111).
        </p>
      </div>

      <DocumentGeneratorView />
    </div>
  );
}
