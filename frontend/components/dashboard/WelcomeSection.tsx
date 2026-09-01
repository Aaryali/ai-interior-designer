'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Compass } from 'lucide-react';

interface WelcomeSectionProps {
  onNewDesignClick?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onNewDesignClick }) => {
  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FCFBF9] via-[#FAF8F5] to-[#F5F1E9] border border-[#DED8CB]/80 p-6 sm:p-8 md:p-10 shadow-[0_10px_30px_-15px_rgba(24,23,22,0.05)]">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Warm Ambient Radial Glow Accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-[#C27453]/10 via-[#FAF8F5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-4 sm:mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#57534E]">
            Forma Spatial Studio
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-light tracking-tight text-[#181716] leading-[1.2] mb-3 sm:mb-4">
          Create a space that{' '}
          <span className="font-serif italic font-normal text-[#C27453]">
            feels like you.
          </span>
        </h2>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed max-w-2xl mb-6 sm:mb-8">
          Transform your room with computer vision, generative AI, and intelligent product visualization.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={onNewDesignClick}
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-[#181716] hover:bg-[#2A2725] text-[#FCFBF9] text-xs sm:text-sm font-medium px-5 sm:px-6 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C27453]" />
            <span>+ New Design</span>
          </button>

          <Link
            href="/#features"
            className="inline-flex items-center justify-center gap-2 bg-[#FCFBF9] hover:bg-[#F5F1E9] text-[#181716] border border-[#DED8CB] text-xs sm:text-sm font-medium px-5 sm:px-6 py-3 rounded-full transition-colors duration-200 shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#78716C]" />
            <span>Explore Inspiration</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
