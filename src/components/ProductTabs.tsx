"use client";

import { useState } from "react";

interface ProductTabsProps {
  benefits?: string[];
  description?: string;
}

export default function ProductTabs({ benefits, description }: ProductTabsProps) {
  const hasBenefits = benefits && benefits.length > 0;
  const [activeTab, setActiveTab] = useState<"benefits" | "description">(
    hasBenefits ? "benefits" : "description"
  );

  return (
    <div className="mb-10">
      {/* Tabs Header */}
      <div className="flex gap-4 border-b border-slate-200 mb-6">
        {hasBenefits && (
          <button
            onClick={() => setActiveTab("benefits")}
            className={`pb-3 px-2 text-sm font-black transition-colors relative ${
              activeTab === "benefits"
                ? "text-[#0A192F]"
                : "text-slate-400 hover:text-[#0A192F]"
            }`}
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Beneficios
            {activeTab === "benefits" && (
              <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#0A192F]" />
            )}
          </button>
        )}
        {description && (
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 px-2 text-sm font-black transition-colors relative ${
              activeTab === "description"
                ? "text-[#0A192F]"
                : "text-slate-400 hover:text-[#0A192F]"
            }`}
            style={{ fontFamily: "var(--font-lexend, Lexend)" }}
          >
            Descripción
            {activeTab === "description" && (
              <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#0A192F]" />
            )}
          </button>
        )}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[120px]">
        {activeTab === "benefits" && hasBenefits && (
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#0A192F] text-[20px] leading-tight">
                  check_circle
                </span>
                <span className="text-slate-700 font-medium text-sm leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "description" && description && (
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 text-sm leading-relaxed font-medium whitespace-pre-line">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
