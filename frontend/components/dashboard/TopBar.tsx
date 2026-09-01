'use client';

import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';

interface TopBarProps {
  onOpenMobileMenu: () => void;
  onNewDesignClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileMenu,
  onNewDesignClick
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-[#FCFBF9]/90 backdrop-blur-md border-b border-[#DED8CB]/60 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between">
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenMobileMenu}
            type="button"
            className="md:hidden p-2 rounded-lg text-[#181716] hover:bg-[#F5F1E9] transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-sans font-medium text-[#181716] tracking-tight">
                Dashboard
              </h1>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-md bg-[#F5F1E9] text-[#78716C] border border-[#DED8CB]/60">
                Workspace
              </span>
            </div>
            <p className="text-xs text-[#78716C] font-light hidden md:block">
              Overview of room projects, spatial insights, and creative sessions.
            </p>
          </div>
        </div>

        {/* Right Side: Status Indicator, Notifications & User Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Neutral Status Indicator - Studio Workspace */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F1E9] border border-[#DED8CB]/70 text-xs text-[#57534E]">
            <span className="w-2 h-2 rounded-full bg-[#78716C]/60" />
            <span className="font-medium text-[11px] tracking-tight">
              Studio Workspace
            </span>
          </div>

          {/* Notifications Affordance */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              type="button"
              className="p-2 rounded-full text-[#57534E] hover:text-[#181716] hover:bg-[#F5F1E9] transition-colors relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C27453]"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C27453] rounded-full ring-2 ring-[#FCFBF9]" />
            </button>

            {/* Notifications Dropdown Preview */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#FCFBF9] border border-[#DED8CB] shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E9E4DA]">
                  <span className="text-xs font-semibold text-[#181716] uppercase tracking-wider">
                    Studio Activity
                  </span>
                  <span className="text-[10px] text-[#78716C]">Mock Feed</span>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F5F1E9] text-[#181716]">
                    <p className="font-medium text-[11px]">Scandinavian Living Room</p>
                    <p className="text-[10px] text-[#78716C] mt-0.5">
                      3D spatial zones and material synthesis prepared.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F5F1E9]/60 text-[#181716]">
                    <p className="font-medium text-[11px]">Product Catalog Updated</p>
                    <p className="text-[10px] text-[#78716C] mt-0.5">
                      New oak credenzas and linen seating indexed.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-1.5 sm:pl-2 border-l border-[#DED8CB]/60">
            <div className="w-8 h-8 rounded-full bg-[#181716] text-[#FCFBF9] flex items-center justify-center text-xs font-medium font-mono shadow-xs">
              AS
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-medium text-[#181716] leading-tight">
                Studio Architect
              </span>
              <span className="text-[10px] text-[#78716C]">
                Pro Creator
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
