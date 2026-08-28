'use client';

import React, { useState } from 'react';
import {
  Layers,
  Sun,
  Moon,
  Sparkles,
  Compass,
  ArrowRight,
  Eye,
  Sliders,
  RotateCw,
  Box
} from 'lucide-react';
import {
  LIGHTING_PRESETS,
  SEASON_PRESETS,
  CAMERA_ANGLES
} from '../data/mockData';

export const FeatureShowcase: React.FC = () => {
  // State for active feature showcase tab
  const [activeTab, setActiveTab] = useState<'angles' | 'lighting' | 'seasons' | 'panorama'>('lighting');

  // Interactive sub-states
  const [selectedAngle, setSelectedAngle] = useState<'front' | 'left' | 'right' | 'isometric'>('front');
  const [selectedLighting, setSelectedLighting] = useState<'morning' | 'afternoon' | 'golden_hour' | 'night'>('golden_hour');
  const [selectedSeason, setSelectedSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('autumn');
  const [panOffset, setPanOffset] = useState<number>(0);

  // Active items
  const currentLighting = LIGHTING_PRESETS.find((l) => l.id === selectedLighting) || LIGHTING_PRESETS[0];
  const currentSeason = SEASON_PRESETS.find((s) => s.id === selectedSeason) || SEASON_PRESETS[0];
  const currentAngle = CAMERA_ANGLES.find((a) => a.id === selectedAngle) || CAMERA_ANGLES[0];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#FAF8F5] relative border-t border-[#DED8CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
              Feature Studio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-[#181716]">
            One room.{' '}
            <span className="font-serif italic font-normal text-[#C27453]">Infinite possibilities.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-3 font-light max-w-xl mx-auto">
            Interact with our spatial intelligence features: circadian lighting simulation, multi-angle consistency, seasonal palettes, and panoramic exploration.
          </p>
        </div>

        {/* Feature Tab Navigation */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#F5F1E9] border border-[#DED8CB] rounded-full shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('lighting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'lighting'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-sm'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#C27453]" />
              <span>Lighting Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('angles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'angles'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-sm'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C27453]" />
              <span>Multi-Angle Design</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('seasons')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'seasons'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-sm'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C27453]" />
              <span>Seasons Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('panorama')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'panorama'
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-sm'
                  : 'text-[#57534E] hover:text-[#181716]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#C27453]" />
              <span>360° Concept Tour</span>
            </button>
          </div>
        </div>

        {/* Feature Interactive Display Card */}
        <div className="bg-[#FCFBF9] rounded-3xl border border-[#DED8CB] p-6 sm:p-10 shadow-sm">
          {/* TAB 1: LIGHTING STUDIO */}
          {activeTab === 'lighting' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Stage */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#181716] border border-[#DED8CB] shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
                  alt="Interior Room Lighting Simulation"
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: currentLighting.imageOverlayFilter,
                  }}
                />

                {/* Dynamic Ambient Tone Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${currentLighting.ambientTone} transition-all duration-700 pointer-events-none`}
                />

                {/* Top Status HUD */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-[#181716]/80 backdrop-blur-md text-[#FCFBF9] text-xs font-mono px-3 py-1 rounded-full border border-white/15">
                    {currentLighting.colorTemp}
                  </span>
                  <span className="bg-[#181716]/80 backdrop-blur-md text-[#E9E4DA] text-[11px] font-mono px-3 py-1 rounded-full border border-white/15">
                    {currentLighting.lightSourceAngle}
                  </span>
                </div>
              </div>

              {/* Right Interactive Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#C27453] uppercase tracking-wider mb-1">
                    LIGHTING STUDIO
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-light text-[#181716] mb-3">
                    See how your space changes with the light.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                    {currentLighting.description}
                  </p>

                  {/* Preset Buttons Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {LIGHTING_PRESETS.map((preset) => {
                      const isSel = preset.id === selectedLighting;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setSelectedLighting(preset.id)}
                          className={`p-3.5 rounded-xl text-left border transition-all ${
                            isSel
                              ? 'bg-[#181716] text-[#FCFBF9] border-stone-800 shadow-sm'
                              : 'bg-[#F5F1E9] text-[#181716] border-[#DED8CB] hover:bg-[#EAE5DC]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">{preset.label}</span>
                            {preset.id === 'night' ? (
                              <Moon className="w-3 h-3 text-[#C27453]" />
                            ) : (
                              <Sun className="w-3 h-3 text-[#C27453]" />
                            )}
                          </div>
                          <span className="text-[10px] font-mono opacity-70 block">
                            {preset.colorTemp}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs text-[#57534E] flex items-center justify-between">
                  <span>Circadian Lighting Simulation</span>
                  <span className="font-mono text-[#181716] text-[11px]">Interactive Preset</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MULTI-ANGLE DESIGN */}
          {activeTab === 'angles' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Stage */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#181716] border border-[#DED8CB] shadow-md">
                <img
                  src={
                    selectedAngle === 'front'
                      ? 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
                      : selectedAngle === 'left'
                      ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
                      : selectedAngle === 'right'
                      ? 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85'
                      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
                  }
                  alt={`Room perspective: ${currentAngle.label}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                <div className="absolute top-4 left-4 bg-[#181716]/80 backdrop-blur-md text-[#FCFBF9] text-xs font-mono px-3 py-1 rounded-full border border-white/15">
                  CAMERA: {currentAngle.label.toUpperCase()}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#181716]/80 backdrop-blur-md text-[#E9E4DA] text-[11px] font-mono px-3 py-1 rounded-full border border-white/15">
                  FOV: {currentAngle.fov}
                </div>
              </div>

              {/* Right Interactive Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#C27453] uppercase tracking-wider mb-1">
                    MULTI-ANGLE DESIGN
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-light text-[#181716] mb-3">
                    Design once. See it from every perspective.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                    {currentAngle.angleDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {CAMERA_ANGLES.map((angle) => {
                      const isSel = angle.id === selectedAngle;
                      return (
                        <button
                          key={angle.id}
                          type="button"
                          onClick={() => setSelectedAngle(angle.id as any)}
                          className={`p-3.5 rounded-xl text-left border transition-all ${
                            isSel
                              ? 'bg-[#181716] text-[#FCFBF9] border-stone-800 shadow-sm'
                              : 'bg-[#F5F1E9] text-[#181716] border-[#DED8CB] hover:bg-[#EAE5DC]'
                          }`}
                        >
                          <span className="text-xs font-medium block">{angle.label}</span>
                          <span className="text-[10px] font-mono opacity-70 block mt-0.5">
                            {angle.fov}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs text-[#57534E] flex items-center justify-between">
                  <span>Spatial Multi-View Sync</span>
                  <span className="font-mono text-[#181716] text-[11px]">Spatially Consistent</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEASONS STUDIO */}
          {activeTab === 'seasons' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Stage */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#181716] border border-[#DED8CB] shadow-md">
                <img
                  src={
                    selectedSeason === 'spring'
                      ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
                      : selectedSeason === 'summer'
                      ? 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
                      : selectedSeason === 'autumn'
                      ? 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85'
                      : 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85'
                  }
                  alt={`Room during ${currentSeason.label}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                <div className="absolute top-4 left-4 bg-[#181716]/80 backdrop-blur-md text-[#FCFBF9] text-xs font-mono px-3 py-1 rounded-full border border-white/15">
                  SEASON: {currentSeason.label.toUpperCase()}
                </div>

                <div className="absolute bottom-4 left-4 bg-[#181716]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
                  <span className="text-[11px] text-[#FCFBF9] font-mono">Palette:</span>
                  <div className="flex gap-1">
                    {currentSeason.accentColors.map((color, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Interactive Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#C27453] uppercase tracking-wider mb-1">
                    SEASONS STUDIO
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-light text-[#181716] mb-3">
                    Your room, through every season.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                    {currentSeason.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {SEASON_PRESETS.map((season) => {
                      const isSel = season.id === selectedSeason;
                      return (
                        <button
                          key={season.id}
                          type="button"
                          onClick={() => setSelectedSeason(season.id as any)}
                          className={`p-3.5 rounded-xl text-left border transition-all ${
                            isSel
                              ? 'bg-[#181716] text-[#FCFBF9] border-stone-800 shadow-sm'
                              : 'bg-[#F5F1E9] text-[#181716] border-[#DED8CB] hover:bg-[#EAE5DC]'
                          }`}
                        >
                          <span className="text-xs font-medium block">{season.label}</span>
                          <span className="text-[10px] opacity-70 block mt-0.5 truncate">
                            {season.paletteName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs text-[#57534E] flex items-center justify-between">
                  <span>Atmospheric Textile Shift</span>
                  <span className="font-mono text-[#181716] text-[11px]">Seasonal Synthesis</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 360° CONCEPT TOUR */}
          {activeTab === 'panorama' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Stage (Interactive Drag-to-Pan Concept Demo) */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#181716] border border-[#DED8CB] shadow-md group">
                <div
                  className="w-[140%] h-full flex transition-transform duration-300"
                  style={{ transform: `translateX(-${panOffset}%)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
                    alt="360 Panorama Room Concept Preview"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>

                {/* Hotspot Pins */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative group/pin cursor-pointer">
                    <span className="w-4 h-4 rounded-full bg-[#C27453] animate-ping absolute inset-0 opacity-75" />
                    <span className="w-4 h-4 rounded-full bg-[#FCFBF9] border-2 border-[#C27453] relative block shadow-lg" />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#181716]/90 backdrop-blur-md text-[#FCFBF9] text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap border border-white/15 opacity-0 group-hover/pin:opacity-100 transition-opacity">
                      Lounge Hotspot
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-[#181716]/80 backdrop-blur-md text-[#FCFBF9] text-xs font-mono px-3 py-1 rounded-full border border-white/15 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#C27453]" />
                  <span>360° VIRTUAL TOUR • CONCEPT DEMO</span>
                </div>

                {/* Pan Slider Controller */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#181716]/85 backdrop-blur-md p-2.5 rounded-xl border border-white/15 flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#FCFBF9] shrink-0">Pan Room:</span>
                  <input
                    type="range"
                    min="0"
                    max="28"
                    value={panOffset}
                    onChange={(e) => setPanOffset(Number(e.target.value))}
                    className="w-full accent-[#C27453] cursor-ew-resize"
                  />
                </div>
              </div>

              {/* Right Interactive Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#C27453] uppercase tracking-wider mb-1">
                    360° TOUR PREVIEW
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-light text-[#181716] mb-3">
                    Step inside your redesigned space.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-6 font-light">
                    Explore room layouts and spatial compositions interactively. Pan horizontally to inspect seamless textures, material transitions, and furniture groupings.
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div className="p-3 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs text-[#181716] flex items-center justify-between">
                      <span>Interactive Pan Viewer</span>
                      <span className="font-mono text-[#C27453] text-[11px]">Enabled</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs text-[#181716] flex items-center justify-between">
                      <span>Spatial Hotspot Anchors</span>
                      <span className="font-mono text-[#57534E] text-[11px]">Interactive</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs text-[#78716C] flex items-center justify-between">
                  <span>Product Concept Preview</span>
                  <span className="font-mono text-[10px]">No backend connection required</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
