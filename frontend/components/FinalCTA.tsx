'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, ShieldCheck, Box, Scan } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section id="studio" className="py-24 md:py-36 bg-[#181716] text-[#FCFBF9] relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-dark-grid-pattern opacity-40 pointer-events-none" />

      {/* Warm Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C27453]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Architectural Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#C27453]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#E9E4DA]">
            AI Interior Design & Product Visualization
          </span>
        </div>

        {/* Headlines */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-[#FCFBF9] leading-[1.1] mb-6 max-w-4xl mx-auto">
          Your room is only{' '}
          <span className="font-serif italic font-normal text-[#C27453]">the beginning.</span>
        </h2>

        <p className="text-lg sm:text-xl text-[#D8D4CE] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Design it. Visualize it. Experience it.
        </p>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FCFBF9] hover:bg-[#EAE5DC] text-[#181716] text-sm font-medium px-8 py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-98"
          >
            <span>Start Designing</span>
            <ArrowRight className="w-4 h-4 text-[#181716]" />
          </Link>

          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-[#FCFBF9] border border-white/20 text-sm font-medium px-7 py-4 rounded-full backdrop-blur-md transition-colors"
          >
            <span>Explore Feature Studio</span>
          </a>
        </div>

        {/* Honest Capability Highlights */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Scan className="w-4 h-4 text-[#C27453]" />
              <h3 className="text-sm font-medium text-[#FCFBF9]">Computer Vision</h3>
            </div>
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
              Detects structural boundaries, lighting apertures, and existing furniture placements.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C27453]" />
              <h3 className="text-sm font-medium text-[#FCFBF9]">Generative AI</h3>
            </div>
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
              Synthesizes harmonious materials, textures, and curated interior styles on demand.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-4 h-4 text-[#C27453]" />
              <h3 className="text-sm font-medium text-[#FCFBF9]">Product Validation</h3>
            </div>
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed">
              Contextual in-room furniture placement with style and palette compatibility scoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
