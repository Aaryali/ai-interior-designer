'use client';

import React from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onNewDesignClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewDesignClick }) => {
  return (
    <div className="bg-[#FCFBF9] border border-[#DED8CB]/80 rounded-3xl p-8 sm:p-12 text-center shadow-[0_4px_20px_-8px_rgba(24,23,22,0.03)] relative overflow-hidden">
      {/* Background Architectural Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* Subtle Icon Composition */}
        <div className="w-16 h-16 rounded-3xl bg-[#F5F1E9] border border-[#DED8CB] flex items-center justify-center text-[#181716] mb-5 shadow-xs">
          <Sparkles className="w-7 h-7 text-[#C27453]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#181716] tracking-tight mb-2">
          No designs yet.
        </h3>

        <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed mb-6">
          Your next room transformation starts here. Upload a room photo or start with a sample layout to explore spatial AI redesigns.
        </p>

        <button
          onClick={onNewDesignClick}
          type="button"
          className="inline-flex items-center justify-center gap-2 bg-[#181716] hover:bg-[#2A2725] text-[#FCFBF9] text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all duration-200 shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C27453]" />
          <span>Create your first design</span>
        </button>
      </div>
    </div>
  );
};
