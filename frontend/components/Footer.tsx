'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileText, Code2, Sparkles } from 'lucide-react';

export interface FooterProps {
  brandName?: string;
}

export const Footer: React.FC<FooterProps> = ({ brandName = 'Forma' }) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#DED8CB] pt-16 pb-12 text-[#181716]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#DED8CB]/60">
          {/* Col 1 & 2: Brand Information & Project Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#181716] text-[#FCFBF9] flex items-center justify-center">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#FAF8F5]"
                >
                  <path
                    d="M3 21V3H21V21H3Z"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" fill="#C27453" />
                </svg>
              </div>
              <span className="font-sans font-semibold text-lg tracking-tight text-[#181716]">
                {brandName}
              </span>
            </div>

            <p className="text-xs text-[#57534E] leading-relaxed max-w-sm font-light">
              AI-Powered Virtual Interior Design and Product Visualization System Using Computer Vision & Generative AI.
            </p>

            <div className="p-3 rounded-xl bg-[#F5F1E9] border border-[#DED8CB] text-[11px] text-[#78716C] max-w-sm space-y-1">
              <div className="font-semibold text-[#181716] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C27453]" />
                <span>Academic AI/ML Capstone Project</span>
              </div>
              <p>Designed with FastAPI, Next.js, PyTorch, Stable Diffusion, and YOLO/SAM Vision pipelines.</p>
            </div>
          </div>

          {/* Col 3: Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181716] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-[#57534E]">
              <li>
                <a href="#studio" className="hover:text-[#C27453] transition-colors">
                  Design Studio
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#C27453] transition-colors">
                  Product Visualization
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#C27453] transition-colors">
                  360° Tour Preview
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="hover:text-[#C27453] transition-colors">
                  AI Design Assistant
                </a>
              </li>
              <li>
                <a href="#interactive-demo" className="hover:text-[#C27453] transition-colors">
                  Before / After Slider
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181716] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[#57534E]">
              <li>
                <a href="#how-it-works" className="hover:text-[#C27453] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[#C27453] transition-colors">
                  Platform Capabilities
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#C27453] transition-colors">
                  Lighting & Seasons
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C27453] transition-colors inline-flex items-center gap-1"
                >
                  <span>Project Documentation</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A8A29E]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Project & Engineering */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181716] mb-4">
              Engineering
            </h4>
            <ul className="space-y-2.5 text-xs text-[#57534E]">
              <li>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C27453] transition-colors inline-flex items-center gap-1"
                >
                  <Code2 className="w-3 h-3 text-[#78716C]" />
                  <span>FastAPI Backend Docs</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C27453] transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5 text-[#78716C] fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <span className="text-[#A8A29E] font-mono text-[11px] block mt-2">
                  Stack: Next.js + FastAPI + PyTorch
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#privacy" className="hover:text-[#181716] transition-colors">
              Privacy Policy
            </a>
            <span className="text-[#DED8CB]">•</span>
            <a href="#terms" className="hover:text-[#181716] transition-colors">
              Terms of Service
            </a>
            <span className="text-[#DED8CB]">•</span>
            <a href="#architecture" className="hover:text-[#181716] transition-colors">
              System Architecture
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
