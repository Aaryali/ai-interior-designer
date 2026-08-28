'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, ArrowLeftRight, Check, Info } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'split' | 'before' | 'after'>('split');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
      if (viewMode !== 'split') {
        setViewMode('split');
      }
    },
    [viewMode]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const effectivePosition =
    viewMode === 'before' ? 100 : viewMode === 'after' ? 0 : sliderPosition;

  return (
    <section id="interactive-demo" className="py-20 md:py-28 bg-[#FAF8F5] relative border-t border-[#DED8CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C27453]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                AI Transformation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-light tracking-tight text-[#181716]">
              Witness the <span className="font-serif italic font-normal text-[#C27453]">Transition.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2 max-w-xl">
              Drag the interactive slider to compare the original raw room capture with the AI-synthesized Scandinavian interior redesign.
            </p>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F1E9] border border-[#DED8CB] rounded-full self-start md:self-auto">
            <button
              type="button"
              onClick={() => {
                setViewMode('before');
                setSliderPosition(100);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'before'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-xs'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              Original View
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('split');
                setSliderPosition(50);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'split'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-xs'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              Split Slider
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('after');
                setSliderPosition(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                viewMode === 'after'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-xs'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              AI Redesign
            </button>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div className="relative max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Before and After Room Comparison Slider"
            aria-valuenow={Math.round(effectivePosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden select-none cursor-ew-resize border border-[#DED8CB] shadow-[0_20px_50px_rgba(24,23,22,0.08)] bg-[#181716] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C27453]"
          >
            {/* AFTER IMAGE (Transformed Room - Underneath) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85"
                alt="After: AI-Generated Warm Scandinavian Interior"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-[#181716]/85 backdrop-blur-md text-[#FCFBF9] text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                AFTER • AI REDESIGN
              </div>
            </div>

            {/* BEFORE IMAGE (Raw/Unfurnished Room - Clipped Overlay) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden transition-[clip-path] duration-75"
              style={{
                clipPath: `polygon(0 0, ${effectivePosition}% 0, ${effectivePosition}% 100%, 0 100%)`,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85"
                alt="Before: Unstyled Room Capture"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 left-4 bg-[#181716]/85 backdrop-blur-md text-[#FCFBF9] text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                BEFORE • ORIGINAL SPACE
              </div>
            </div>

            {/* Draggable Divider Line and Thumb Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${effectivePosition}%` }}
            >
              {/* Handle Thumb */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#181716] border-2 border-white text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 pointer-events-auto">
                <ArrowLeftRight className="w-4 h-4 text-[#FCFBF9]" />
              </div>
            </div>

            {/* Bottom Metadata Overlay */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 bg-[#181716]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[#FCFBF9] text-xs shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#C27453]" />
                <span className="font-mono text-[11px] text-[#E9E4DA]">
                  Room analyzed • 8 objects detected • Scandinavian style
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#181716]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[#A8A29E] text-[11px]">
                <span>Drag handle or use arrow keys</span>
              </div>
            </div>
          </div>

          {/* Transformation Attributes Row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#F5F1E9]/70 border border-[#DED8CB]/60">
              <span className="block text-[11px] font-medium text-[#78716C] uppercase tracking-wider">Style</span>
              <span className="text-sm font-semibold text-[#181716]">Warm Scandinavian</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F1E9]/70 border border-[#DED8CB]/60">
              <span className="block text-[11px] font-medium text-[#78716C] uppercase tracking-wider">Materials</span>
              <span className="text-sm font-semibold text-[#181716]">Oak, Linen, Travertine</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F1E9]/70 border border-[#DED8CB]/60">
              <span className="block text-[11px] font-medium text-[#78716C] uppercase tracking-wider">Lighting</span>
              <span className="text-sm font-semibold text-[#181716]">Diffuse Daylight (4800K)</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F1E9]/70 border border-[#DED8CB]/60">
              <span className="block text-[11px] font-medium text-[#78716C] uppercase tracking-wider">Structural Elements</span>
              <span className="text-sm font-semibold text-[#181716]">Window & Walls Preserved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
