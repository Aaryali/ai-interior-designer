'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Sparkles,
  Layers,
  Armchair,
  Compass,
  Sliders,
  X,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { DASHBOARD_NAV_ITEMS, DASHBOARD_SECONDARY_NAV } from '../../data/dashboardData';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onNewDesignClick?: () => void;
}

const getNavIcon = (name: string, className = 'w-4 h-4') => {
  switch (name) {
    case 'LayoutGrid':
      return <LayoutGrid className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Armchair':
      return <Armchair className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Sliders':
      return <Sliders className={className} />;
    default:
      return <LayoutGrid className={className} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  onCloseMobile,
  onNewDesignClick
}) => {
  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FCFBF9] text-[#181716] select-none">
      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-[#DED8CB]/60 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[#181716] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C27453] rounded-md"
          aria-label="Forma Home"
        >
          <div className="w-8 h-8 rounded-lg bg-[#181716] text-[#FCFBF9] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs">
            {/* Architectural Abstract Glyph */}
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
              FORMA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#78716C] font-medium -mt-1">
              Studio Workspace
            </span>
          </div>
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          type="button"
          className="md:hidden p-1.5 rounded-lg text-[#78716C] hover:text-[#181716] hover:bg-[#F5F1E9] transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Button in Sidebar */}
      <div className="px-4 pt-5 pb-2">
        <button
          onClick={() => {
            if (onNewDesignClick) onNewDesignClick();
            onCloseMobile();
          }}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-[#181716] hover:bg-[#2A2725] text-[#FCFBF9] text-xs font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C27453]" />
          <span>New Design</span>
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
          Studio
        </div>

        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = item.isActive;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onCloseMobile}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#181716] text-[#FCFBF9] shadow-xs'
                  : 'text-[#57534E] hover:text-[#181716] hover:bg-[#F5F1E9]/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`transition-colors ${
                    isActive ? 'text-[#C27453]' : 'text-[#78716C] group-hover:text-[#181716]'
                  }`}
                >
                  {getNavIcon(item.iconName)}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium ${
                    isActive
                      ? 'bg-white/20 text-[#FCFBF9]'
                      : 'bg-[#E9E4DA] text-[#57534E]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Secondary Navigation Section */}
        <div className="pt-6">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
            Preferences
          </div>

          {DASHBOARD_SECONDARY_NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onCloseMobile}
              className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-[#57534E] hover:text-[#181716] hover:bg-[#F5F1E9]/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#78716C] group-hover:text-[#181716]">
                  {getNavIcon(item.iconName)}
                </span>
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Editorial Studio Footer Note */}
      <div className="p-4 m-3 rounded-2xl bg-[#F5F1E9]/70 border border-[#DED8CB]/60">
        <div className="flex items-center gap-2 mb-1.5 text-[11px] font-medium text-[#181716]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
          <span>Forma Studio v0.1</span>
        </div>
        <p className="text-[11px] text-[#78716C] leading-relaxed font-light mb-2.5">
          Prototype workspace for AI interior design & product staging.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#181716] hover:text-[#C27453] transition-colors"
        >
          <span>Return to Overview</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r border-[#DED8CB]/60 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#181716]/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FCFBF9] shadow-2xl z-10 animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
