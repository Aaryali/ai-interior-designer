'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Sparkles, Compass } from 'lucide-react';

export interface NavbarProps {
  brandName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ brandName = 'Forma' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Design Studio', href: '#studio' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Features', href: '#features' },
    { label: 'Products', href: '#products' },
    { label: 'AI Assistant', href: '#ai-assistant' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#DED8CB]/60 shadow-[0_4px_20px_rgba(24,23,22,0.03)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-[#181716] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C27453] rounded-md"
            aria-label={`${brandName} Home`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#181716] text-[#FCFBF9] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
              {/* Architectural abstract glyph */}
              <svg
                width="18"
                height="18"
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
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeDasharray="2 2"
                />
                <path
                  d="M12 3V21"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeDasharray="2 2"
                />
                <circle cx="12" cy="12" r="3" fill="#C27453" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-semibold text-lg tracking-tight text-[#181716]">
                {brandName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] font-medium -mt-1 hidden sm:block">
                Spatial AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-[#F5F1E9]/70 backdrop-blur-sm border border-[#DED8CB]/60 rounded-full px-4 py-1.5 shadow-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-[#57534E] hover:text-[#181716] transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-white/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C27453]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#demo"
              className="text-xs font-medium text-[#57534E] hover:text-[#181716] px-3.5 py-2 transition-colors duration-200"
            >
              Sign In
            </a>
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 bg-[#181716] hover:bg-[#2A2725] text-[#FCFBF9] text-xs font-medium px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <span>Start Designing</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 text-[#E9E4DA]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 bg-[#181716] text-[#FCFBF9] text-xs font-medium px-3 py-2 rounded-full"
            >
              <span>Start</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-[#181716] hover:bg-[#E9E4DA]/60 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#DED8CB] px-6 py-6 shadow-xl transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#181716] py-2.5 border-b border-[#E9E4DA]/60 hover:text-[#C27453] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-medium text-[#57534E] bg-[#F5F1E9] rounded-lg"
              >
                Sign In
              </a>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-medium text-[#FCFBF9] bg-[#181716] rounded-lg flex items-center justify-center gap-2"
              >
                <span>Start Designing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
