'use client';

import React, { useState } from 'react';
import {
  Box,
  CheckCircle2,
  Sliders,
  Tag,
  ArrowRight,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { PRODUCT_CATALOG } from '../data/mockData';
import { ProductCatalogItem } from '../types';

export const ProductPreview: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductCatalogItem>(PRODUCT_CATALOG[0]);
  const [highlightPlacement, setHighlightPlacement] = useState<boolean>(true);

  return (
    <section id="products" className="py-24 md:py-32 bg-[#FAF8F5] relative border-t border-[#DED8CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-4">
            <Box className="w-3.5 h-3.5 text-[#C27453]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
              Product Visualization
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-[#181716] leading-tight">
            Don&apos;t just imagine the product.{' '}
            <span className="font-serif italic font-normal text-[#C27453]">See it in your room.</span>
          </h2>
          <p className="text-base text-[#57534E] mt-3 font-light max-w-xl">
            Evaluate furniture placement inside your room context before purchasing. Our vision pipeline calculates aesthetic and dimensional compatibility metrics.
          </p>
        </div>

        {/* Product Switcher Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {PRODUCT_CATALOG.map((item) => {
            const isSelected = item.id === selectedProduct.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedProduct(item)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#181716] text-[#FCFBF9] border-stone-800 shadow-xs'
                    : 'bg-[#FCFBF9] text-[#57534E] border-[#DED8CB] hover:bg-[#F5F1E9]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Main Split Section: In-Room Visualizer on Left & Product Card Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Room with Contextual Placement Pin */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[16/11] bg-[#181716] border border-[#DED8CB] shadow-md flex flex-col justify-between p-6">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
              alt="In-room furniture placement visualizer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark gradient for pin visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Top Bar HUD */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-[#181716]/85 backdrop-blur-md text-[#FCFBF9] text-xs font-mono px-3 py-1.5 rounded-full border border-white/15">
                IN-CONTEXT PLACEMENT: {selectedProduct.category.toUpperCase()}
              </div>

              <button
                type="button"
                onClick={() => setHighlightPlacement(!highlightPlacement)}
                className="bg-[#FCFBF9]/90 hover:bg-[#FCFBF9] text-[#181716] text-xs font-medium px-3 py-1.5 rounded-full border border-[#DED8CB] shadow-xs"
              >
                {highlightPlacement ? 'Hide Anchor' : 'Highlight Anchor'}
              </button>
            </div>

            {/* Spatial Placement Pin Indicator */}
            {highlightPlacement && (
              <div className="absolute top-[52%] left-[46%] -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#C27453]/30 animate-ping absolute inset-0 -m-3" />
                  <div className="w-6 h-6 rounded-full bg-[#C27453] border-2 border-white text-white flex items-center justify-center shadow-xl">
                    <Box className="w-3 h-3 text-[#FCFBF9]" />
                  </div>
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-[#181716]/90 backdrop-blur-md text-[#FCFBF9] text-[11px] font-mono px-3 py-1.5 rounded-xl border border-white/20 whitespace-nowrap shadow-xl">
                    <span className="font-semibold">{selectedProduct.name}</span>
                    <span className="block text-[10px] text-[#A8A29E] font-normal">
                      Placement Anchor • Clearance: OK
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Metadata Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-[#181716]/85 backdrop-blur-md text-[#E9E4DA] text-[11px] font-mono px-3 py-1 rounded-full border border-white/15">
                Visual Spatial Suggestion
              </span>
              <span className="text-[10px] text-white/70 font-mono">
                Concept Preview Demo
              </span>
            </div>
          </div>

          {/* Right Column: Product Card & Compatibility Breakdown */}
          <div className="lg:col-span-5 bg-[#FCFBF9] rounded-3xl border border-[#DED8CB] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Product Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[11px] font-mono text-[#C27453] uppercase tracking-wider block mb-1">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#181716]">
                    {selectedProduct.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#78716C] block">Price</span>
                  <span className="text-lg font-semibold text-[#181716]">
                    ₹{selectedProduct.priceInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="grid grid-cols-2 gap-2.5 p-4 rounded-2xl bg-[#F5F1E9] border border-[#DED8CB]/60 text-xs mb-6">
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-mono">Material</span>
                  <span className="font-medium text-[#181716]">{selectedProduct.material}</span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-mono">Width</span>
                  <span className="font-medium text-[#181716]">{selectedProduct.widthCm} cm</span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-mono">Style</span>
                  <span className="font-medium text-[#181716]">{selectedProduct.style}</span>
                </div>
                <div>
                  <span className="text-[#78716C] block text-[10px] uppercase font-mono">Availability</span>
                  <span className="font-medium text-emerald-700">In Stock</span>
                </div>
              </div>

              {/* Compatibility Overall Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#181716]">
                      Compatibility Score
                    </span>
                  </div>
                  <span className="text-xl font-bold font-mono text-[#C27453]">
                    {selectedProduct.compatibilityScore}%
                  </span>
                </div>

                {/* Compatibility Breakdown Bars */}
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] text-[#57534E] mb-1">
                      <span>Size & Clearance</span>
                      <span className="font-mono">{selectedProduct.compatibilityBreakdown.size}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#EAE5DC] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#181716]"
                        style={{ width: `${selectedProduct.compatibilityBreakdown.size}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-[#57534E] mb-1">
                      <span>Style Harmony</span>
                      <span className="font-mono">{selectedProduct.compatibilityBreakdown.style}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#EAE5DC] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#C27453]"
                        style={{ width: `${selectedProduct.compatibilityBreakdown.style}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-[#57534E] mb-1">
                      <span>Color Palette Match</span>
                      <span className="font-mono">{selectedProduct.compatibilityBreakdown.color}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#EAE5DC] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#C27453]"
                        style={{ width: `${selectedProduct.compatibilityBreakdown.color}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-[#57534E] mb-1">
                      <span>Budget Alignment</span>
                      <span className="font-mono">{selectedProduct.compatibilityBreakdown.budget}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#EAE5DC] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#78716C]"
                        style={{ width: `${selectedProduct.compatibilityBreakdown.budget}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Action Button */}
            <div className="pt-4 border-t border-[#DED8CB]/60 flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#78716C]">
                Static UI Preview • Schema ready for Recommendation Engine
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-[#181716] text-[#FCFBF9] hover:bg-[#2A2725] px-4 py-2.5 rounded-full text-xs font-medium transition-colors"
              >
                <span>Add to Space</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
