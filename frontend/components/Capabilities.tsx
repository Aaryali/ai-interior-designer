'use client';

import React from 'react';
import {
  Wand2,
  ScanLine,
  Box,
  Layers,
  SunMedium,
  Sparkles,
  Compass,
  MessageSquareText,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { CAPABILITIES } from '../data/mockData';

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-24 md:py-32 bg-[#FAF8F5] relative border-t border-[#DED8CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-[#181716] leading-tight">
            From empty room to{' '}
            <span className="font-serif italic font-normal text-[#C27453]">complete vision.</span>
          </h2>
          <p className="text-base text-[#57534E] mt-4 font-light leading-relaxed">
            Our computer vision and generative AI architecture analyzes your existing space to synthesize realistic, layout-aware interior designs and contextual product visualizations.
          </p>
        </div>

        {/* Asymmetrical Bento Grid with Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Card 1: AI Room Redesign (Large Hero Card - 2 cols on lg) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-[#181716] text-[#FCFBF9] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border border-stone-800 shadow-lg group">
            {/* Background image subtle overlay */}
            <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C27453]/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wand2 className="w-32 h-32 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#FCFBF9] border border-white/15">
                  <Wand2 className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#A8A29E] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  01 • Style Synthesis
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-normal tracking-tight text-[#FCFBF9] mb-3">
                AI Room Redesign
              </h3>
              <p className="text-sm text-[#D8D4CE] font-light leading-relaxed max-w-lg">
                Transform an existing room into a completely new design. Generative vision models synthesize new aesthetics, textures, and palettes while honoring your room’s structural envelope.
              </p>
            </div>

            {/* Visual Mini Mock */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#A8A29E] relative z-10">
              <span>Layout-preserving synthesis</span>
              <span className="font-mono text-white/60">Conditioned Diffusion</span>
            </div>
          </div>

          {/* Card 2: Computer Vision Analysis (1 col) */}
          <div className="rounded-3xl bg-[#FCFBF9] p-7 sm:p-8 flex flex-col justify-between border border-[#DED8CB] shadow-xs hover:border-[#C27453]/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#F5F1E9] flex items-center justify-center text-[#181716] border border-[#DED8CB]">
                  <ScanLine className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  02
                </span>
              </div>
              <h3 className="text-xl font-sans font-medium text-[#181716] mb-2">
                Computer Vision Analysis
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Understand furniture, surfaces, room structure and spatial relationships directly from standard camera captures.
              </p>
            </div>

            {/* Mini Visual HUD element */}
            <div className="mt-6 p-3 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 font-mono text-[10px] text-[#57534E] space-y-1">
              <div className="flex justify-between">
                <span>Wall Segmentation:</span>
                <span className="text-[#C27453]">Detected</span>
              </div>
              <div className="flex justify-between">
                <span>Floor Plane:</span>
                <span className="text-[#181716]">Identified</span>
              </div>
            </div>
          </div>

          {/* Card 3: Product Visualization (1 col) */}
          <div className="rounded-3xl bg-[#FCFBF9] p-7 sm:p-8 flex flex-col justify-between border border-[#DED8CB] shadow-xs hover:border-[#C27453]/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#F5F1E9] flex items-center justify-center text-[#181716] border border-[#DED8CB]">
                  <Box className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  03
                </span>
              </div>
              <h3 className="text-xl font-sans font-medium text-[#181716] mb-2">
                Product Visualization
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                See real furniture and products inside your own space with automated visual style and color compatibility scoring.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DED8CB]/60 flex items-center justify-between text-xs text-[#78716C]">
              <span>In-Context Placement</span>
              <span className="font-mono text-[#C27453] font-medium">92% Match</span>
            </div>
          </div>

          {/* Card 4: Multi-Angle Design (1 col) */}
          <div className="rounded-3xl bg-[#FCFBF9] p-7 sm:p-8 flex flex-col justify-between border border-[#DED8CB] shadow-xs hover:border-[#C27453]/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#F5F1E9] flex items-center justify-center text-[#181716] border border-[#DED8CB]">
                  <Layers className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  04
                </span>
              </div>
              <h3 className="text-xl font-sans font-medium text-[#181716] mb-2">
                Multi-Angle Design
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Maintain a spatially consistent design across multiple room views, preserving furniture positions and finishes.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-[10px] font-mono text-[#78716C]">
              <span className="px-2 py-0.5 rounded bg-[#F5F1E9] border border-[#DED8CB]">Front</span>
              <span className="px-2 py-0.5 rounded bg-[#F5F1E9] border border-[#DED8CB]">Left</span>
              <span className="px-2 py-0.5 rounded bg-[#F5F1E9] border border-[#DED8CB]">Right</span>
            </div>
          </div>

          {/* Card 5: Lighting & Time of Day (1 col) */}
          <div className="rounded-3xl bg-[#FCFBF9] p-7 sm:p-8 flex flex-col justify-between border border-[#DED8CB] shadow-xs hover:border-[#C27453]/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#F5F1E9] flex items-center justify-center text-[#181716] border border-[#DED8CB]">
                  <SunMedium className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  05
                </span>
              </div>
              <h3 className="text-xl font-sans font-medium text-[#181716] mb-2">
                Lighting & Time of Day
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Explore your space from morning light to evening ambience with adjustable lighting temperatures.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DED8CB]/60 flex items-center justify-between text-xs text-[#78716C]">
              <span>Circadian Light Shifts</span>
              <span className="font-mono text-[#57534E]">2700K - 6500K</span>
            </div>
          </div>

          {/* Card 6: Seasonal Transformation (1 col) */}
          <div className="rounded-3xl bg-[#FCFBF9] p-7 sm:p-8 flex flex-col justify-between border border-[#DED8CB] shadow-xs hover:border-[#C27453]/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#F5F1E9] flex items-center justify-center text-[#181716] border border-[#DED8CB]">
                  <Sparkles className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  06
                </span>
              </div>
              <h3 className="text-xl font-sans font-medium text-[#181716] mb-2">
                Seasonal Transformation
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Experience your design across different seasons, adapting textiles, botanicals, and seasonal moods.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#8A9A86]" title="Spring" />
              <span className="w-3 h-3 rounded-full bg-[#D6A874]" title="Summer" />
              <span className="w-3 h-3 rounded-full bg-[#B85D38]" title="Autumn" />
              <span className="w-3 h-3 rounded-full bg-[#2B2D2F]" title="Winter" />
              <span className="text-[10px] text-[#78716C] ml-1">4 Palette Presets</span>
            </div>
          </div>

          {/* Card 7: 360° Virtual Tour Preview (1 col) */}
          <div className="rounded-3xl bg-[#FCFBF9] p-7 sm:p-8 flex flex-col justify-between border border-[#DED8CB] shadow-xs hover:border-[#C27453]/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#F5F1E9] flex items-center justify-center text-[#181716] border border-[#DED8CB]">
                  <Compass className="w-5 h-5 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  07
                </span>
              </div>
              <h3 className="text-xl font-sans font-medium text-[#181716] mb-2">
                360° Virtual Tour
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Step inside your redesigned space and explore panoramic room perspectives interactively.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DED8CB]/60 flex items-center justify-between text-xs text-[#78716C]">
              <span>Interactive Concept</span>
              <span className="font-mono text-[#57534E]">Preview Demo</span>
            </div>
          </div>

          {/* Card 8: AI Design Assistant (Large Card - 2 cols on lg) */}
          <div className="md:col-span-2 lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#F5F1E9] to-[#EAE5DC] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-[#DED8CB] shadow-xs">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#181716] text-[#FCFBF9] flex items-center justify-center">
                  <MessageSquareText className="w-4 h-4 text-[#C27453]" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716C]">
                  08 • Conversational Spatial Editing
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-light text-[#181716] mb-2">
                AI Design Assistant
              </h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Describe what you want in plain natural language and let AI transform the room while locking in elements you want to keep.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/80 border border-[#DED8CB] text-xs text-[#181716] shadow-xs font-mono">
                &ldquo;Keep the bookshelf&rdquo;
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/80 border border-[#DED8CB] text-xs text-[#181716] shadow-xs font-mono">
                &ldquo;Make lighting warmer&rdquo;
              </span>
              <a
                href="#ai-assistant"
                className="inline-flex items-center gap-1.5 bg-[#181716] text-[#FCFBF9] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#2A2725] transition-colors"
              >
                <span>Try Assistant Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
