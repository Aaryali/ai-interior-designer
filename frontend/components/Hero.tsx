'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Scan, Eye, Layers, Maximize2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_DETECTIONS } from '../data/mockData';

export const Hero: React.FC = () => {
  const [cvOverlayActive, setCvOverlayActive] = useState(true);
  const [activeDetectionId, setActiveDetectionId] = useState<string | null>(null);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF8F5]">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Subtle Ambient Radial Light Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#EAE5DC]/60 via-[#FAF8F5]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Academic Project Badge / Category Label */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F5F1E9] border border-[#DED8CB] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#C27453] animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide uppercase text-[#57534E]">
              Computer Vision & Generative AI Platform
            </span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-[#181716] leading-[1.1] mb-6">
            Reimagine Your{' '}
            <span className="font-serif italic font-normal text-[#C27453]">Space.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#57534E] font-light leading-relaxed max-w-2xl mx-auto">
            Turn a photo of your room into a personalized interior design — powered by computer vision and generative AI.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#181716] hover:bg-[#2A2725] text-[#FCFBF9] text-sm font-medium px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-98"
            >
              <span>Start Designing</span>
              <ArrowRight className="w-4 h-4 text-[#E9E4DA]" />
            </Link>

            <a
              href="#interactive-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FCFBF9] hover:bg-[#F5F1E9] text-[#181716] border border-[#DED8CB] text-sm font-medium px-6 py-3.5 rounded-full transition-colors duration-200"
            >
              <Eye className="w-4 h-4 text-[#78716C]" />
              <span>Explore Designs</span>
            </a>
          </div>

          {/* Capability Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#78716C]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C27453]" />
              Spatial Intelligence
            </span>
            <span className="text-[#DED8CB]">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C27453]" />
              Computer Vision
            </span>
            <span className="text-[#DED8CB]">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C27453]" />
              Generative AI
            </span>
          </div>
        </div>

        {/* Cinematic Visual Composition with Computer Vision Overlays */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Visual Frame */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#DED8CB] shadow-[0_20px_60px_-15px_rgba(24,23,22,0.12)] bg-[#181716]">
            {/* High-Quality Architectural Render */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#181716] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
                alt="Architectural Scandinavian Living Room with AI Spatial Analysis"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-101"
                loading="eager"
              />

              {/* Subtle ambient lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181716]/60 via-transparent to-[#181716]/20 pointer-events-none" />

              {/* Scanning Laser Line (Active when CV Overlay is on) */}
              {cvOverlayActive && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C27453]/80 to-transparent animate-scanline pointer-events-none shadow-[0_0_15px_#C27453]" />
              )}

              {/* Computer Vision Detection Overlays */}
              {cvOverlayActive && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Bounding Box 1: Seating Zone */}
                  <div
                    style={{
                      top: '46%',
                      left: '30%',
                      width: '42%',
                      height: '36%',
                    }}
                    className={`absolute border border-dashed rounded-md transition-all duration-300 pointer-events-auto cursor-pointer ${
                      activeDetectionId === 'det-1'
                        ? 'border-[#C27453] bg-[#C27453]/15 shadow-[0_0_12px_rgba(194,116,83,0.3)]'
                        : 'border-[#FCFBF9]/70 bg-black/10 hover:border-[#C27453] hover:bg-[#C27453]/10'
                    }`}
                    onClick={() =>
                      setActiveDetectionId(activeDetectionId === 'det-1' ? null : 'det-1')
                    }
                  >
                    <div className="absolute -top-6 left-0 bg-[#181716]/90 backdrop-blur-md text-[#FCFBF9] text-[10px] font-mono px-2 py-0.5 rounded border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
                      <span>Primary Seating [0.96]</span>
                    </div>
                  </div>

                  {/* Bounding Box 2: Daylight Source / Window */}
                  <div
                    style={{
                      top: '10%',
                      left: '68%',
                      width: '28%',
                      height: '56%',
                    }}
                    className={`absolute border border-dashed rounded-md transition-all duration-300 pointer-events-auto cursor-pointer ${
                      activeDetectionId === 'det-3'
                        ? 'border-amber-300 bg-amber-400/15 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                        : 'border-[#FCFBF9]/60 bg-black/10 hover:border-amber-300'
                    }`}
                    onClick={() =>
                      setActiveDetectionId(activeDetectionId === 'det-3' ? null : 'det-3')
                    }
                  >
                    <div className="absolute -top-6 left-0 bg-[#181716]/90 backdrop-blur-md text-[#FCFBF9] text-[10px] font-mono px-2 py-0.5 rounded border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>Daylight Aperture [0.94]</span>
                    </div>
                  </div>

                  {/* Floor Surface Detection */}
                  <div
                    style={{
                      top: '74%',
                      left: '10%',
                      width: '80%',
                      height: '24%',
                    }}
                    className="absolute border-t border-dashed border-[#FCFBF9]/50 pointer-events-none"
                  >
                    <div className="absolute top-2 right-4 bg-[#181716]/85 backdrop-blur-md text-[#E9E4DA] text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
                      Surface: French Oak Herringbone
                    </div>
                  </div>

                  {/* 3D Spatial Measurement Vectors */}
                  <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-3 bg-[#181716]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[#FCFBF9] text-[11px] font-mono shadow-md">
                    <span className="text-[#C27453]">W: 4.8m</span>
                    <span className="text-white/30">|</span>
                    <span className="text-amber-300">L: 6.2m</span>
                    <span className="text-white/30">|</span>
                    <span className="text-[#E9E4DA]">H: 2.9m</span>
                  </div>
                </div>
              )}

              {/* Floating Top Bar HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                {/* AI Status Badge */}
                <div className="pointer-events-auto inline-flex items-center gap-2 bg-[#181716]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[#FCFBF9] text-xs shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-subtle-pulse" />
                  <span className="font-medium tracking-tight">AI Spatial Analysis</span>
                  <span className="text-white/40 text-[10px]">Active</span>
                </div>

                {/* CV Overlay Interactive Toggle Button */}
                <button
                  type="button"
                  onClick={() => setCvOverlayActive(!cvOverlayActive)}
                  className="pointer-events-auto inline-flex items-center gap-1.5 bg-[#FCFBF9]/90 hover:bg-[#FCFBF9] text-[#181716] backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DED8CB] text-xs font-medium transition-all shadow-sm active:scale-95"
                  aria-label="Toggle computer vision overlay"
                >
                  <Scan className="w-3.5 h-3.5 text-[#C27453]" />
                  <span>{cvOverlayActive ? 'Hide Vision Overlay' : 'Show Vision Overlay'}</span>
                </button>
              </div>

              {/* Bottom Right Object Telemetry Pill */}
              <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 bg-[#181716]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[#FCFBF9] text-xs shadow-md pointer-events-none">
                <Layers className="w-3.5 h-3.5 text-[#C27453]" />
                <span className="font-mono text-[11px] text-[#E9E4DA]">
                  8 Objects Mapped • Warm Scandinavian Preset
                </span>
              </div>
            </div>
          </div>

          {/* Floating Subtle Annotation Card */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716C] px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C27453]" />
              <span>Contextual layout mapping & semantic surface understanding</span>
            </div>
            <div className="font-mono text-[11px] text-[#A8A29E]">
              Forma Spatial Engine • Generative Pipeline
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
