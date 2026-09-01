'use client';

import React from 'react';
import { AIInsight } from '../../types';
import { SunMedium, Palette, Maximize, Sparkles } from 'lucide-react';

interface AIInsightsProps {
  insights: AIInsight[];
}

const getCategoryIcon = (category: AIInsight['category']) => {
  switch (category) {
    case 'lighting':
      return <SunMedium className="w-4 h-4 text-[#C27453]" />;
    case 'materials':
    case 'color':
      return <Palette className="w-4 h-4 text-[#C4975D]" />;
    case 'spatial':
    case 'products':
      return <Maximize className="w-4 h-4 text-[#78716C]" />;
    default:
      return <Sparkles className="w-4 h-4 text-[#C27453]" />;
  }
};

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <div className="bg-[#FCFBF9] border border-[#DED8CB]/80 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-8px_rgba(24,23,22,0.03)] flex flex-col justify-between">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E9E4DA]/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F5F1E9] border border-[#DED8CB] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#C27453]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#181716] tracking-tight">
                AI Design Intelligence
              </h3>
              <p className="text-[10px] text-[#78716C] font-light">
                Sample preview of computer vision & spatial analysis
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono text-[#78716C] bg-[#F5F1E9] px-2 py-0.5 rounded-md border border-[#DED8CB]/60">
            Preview Mode
          </span>
        </div>

        {/* List of Insights */}
        <div className="space-y-3.5">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="group p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DED8CB]/60 hover:border-[#78716C]/40 hover:bg-[#F5F1E9]/60 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#FCFBF9] border border-[#DED8CB]/70 shrink-0 shadow-2xs mt-0.5">
                  {getCategoryIcon(insight.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#78716C] bg-[#E9E4DA]/60 px-1.5 py-0.5 rounded">
                      {insight.tag}
                    </span>
                    {insight.confidenceScore && (
                      <span className="text-[10px] text-[#78716C] font-mono">
                        {Math.round(insight.confidenceScore * 100)}% match
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#242220] font-normal leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Disclaimer Note */}
      <div className="mt-5 pt-3 border-t border-[#E9E4DA]/70 flex items-center justify-between text-[11px] text-[#78716C]">
        <span>Mock visual intelligence preview</span>
        <span className="text-[#A8A29E] font-mono text-[10px]">FastAPI Ready</span>
      </div>
    </div>
  );
};
