'use client';

import React, { useState } from 'react';
import { UploadCloud, Scan, Sparkles, Eye, ArrowRight, Check } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepIcons = [
    <UploadCloud key="1" className="w-5 h-5" />,
    <Scan key="2" className="w-5 h-5" />,
    <Sparkles key="3" className="w-5 h-5" />,
    <Eye key="4" className="w-5 h-5" />,
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#FAF8F5] relative border-t border-[#DED8CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E9] border border-[#DED8CB] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
              Process & Methodology
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-[#181716]">
            Architectural precision in{' '}
            <span className="font-serif italic font-normal text-[#C27453]">four steps.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-3 font-light max-w-xl mx-auto">
            From initial photo upload to generative synthesis and contextual product validation.
          </p>
        </div>

        {/* 4-Step Progressive Timeline Cards */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-[#DED8CB] -translate-y-12 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#181716] text-[#FCFBF9] border-stone-800 shadow-xl scale-[1.02]'
                      : 'bg-[#FCFBF9] text-[#181716] border-[#DED8CB] hover:border-[#C27453]/40 shadow-xs hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Step Header with Icon & Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#C27453] text-[#FCFBF9] shadow-sm'
                            : 'bg-[#F5F1E9] text-[#181716] border border-[#DED8CB]'
                        }`}
                      >
                        {stepIcons[idx]}
                      </div>
                      <span
                        className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isActive
                            ? 'bg-white/10 text-[#FCFBF9] border border-white/15'
                            : 'bg-[#F5F1E9] text-[#78716C] border border-[#DED8CB]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3
                      className={`text-lg font-sans font-medium mb-2.5 ${
                        isActive ? 'text-[#FCFBF9]' : 'text-[#181716]'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed font-light ${
                        isActive ? 'text-[#D8D4CE]' : 'text-[#57534E]'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Technical Subtext */}
                  <div
                    className={`mt-6 pt-4 border-t text-[11px] ${
                      isActive
                        ? 'border-white/10 text-[#A8A29E]'
                        : 'border-[#DED8CB]/60 text-[#78716C]'
                    }`}
                  >
                    <span className="font-mono">{step.technicalSubtext}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Highlight Interactive Preview Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#F5F1E9] border border-[#DED8CB] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#181716] text-[#FCFBF9] flex items-center justify-center font-mono text-xs font-bold shrink-0">
              {HOW_IT_WORKS_STEPS[activeStep].stepNumber}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#181716]">
                Current Step: {HOW_IT_WORKS_STEPS[activeStep].title}
              </h4>
              <p className="text-xs text-[#57534E] mt-0.5">
                {HOW_IT_WORKS_STEPS[activeStep].technicalSubtext}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 3))}
              className="px-3.5 py-1.5 rounded-full bg-[#FCFBF9] border border-[#DED8CB] text-xs font-medium text-[#181716] hover:bg-white transition-colors"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev < 3 ? prev + 1 : 0))}
              className="px-4 py-1.5 rounded-full bg-[#181716] text-[#FCFBF9] text-xs font-medium hover:bg-[#2A2725] transition-colors flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
