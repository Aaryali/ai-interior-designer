'use client';

import React from 'react';
import { PlusCircle, Scan, Boxes, Sparkles, ArrowRight } from 'lucide-react';
import { QUICK_ACTIONS } from '../../data/dashboardData';

interface QuickActionsProps {
  onActionClick?: (actionId: string) => void;
}

const getActionIcon = (name: string, isPrimary = false) => {
  const className = `w-4 h-4 ${isPrimary ? 'text-[#C27453]' : 'text-[#78716C]'}`;
  switch (name) {
    case 'PlusCircle':
      return <PlusCircle className={className} />;
    case 'Scan':
      return <Scan className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {QUICK_ACTIONS.map((action) => {
        const isPrimary = action.primary;
        return (
          <button
            key={action.id}
            onClick={() => onActionClick && onActionClick(action.id)}
            type="button"
            className={`group text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              isPrimary
                ? 'bg-[#181716] text-[#FCFBF9] border-[#181716] shadow-sm hover:bg-[#2A2725] hover:shadow-md'
                : 'bg-[#FCFBF9] text-[#181716] border-[#DED8CB]/80 hover:bg-[#F5F1E9]/70 hover:border-[#78716C]/40 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isPrimary
                    ? 'bg-white/10 text-[#FCFBF9]'
                    : 'bg-[#F5F1E9] border border-[#DED8CB]/80'
                }`}
              >
                {getActionIcon(action.iconName, isPrimary)}
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                  isPrimary ? 'text-[#FCFBF9]' : 'text-[#78716C]'
                }`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h4
                className={`text-xs sm:text-sm font-medium tracking-tight ${
                  isPrimary ? 'text-[#FCFBF9]' : 'text-[#181716]'
                }`}
              >
                {action.label}
              </h4>
              {action.description && (
                <p
                  className={`text-[11px] font-light mt-0.5 ${
                    isPrimary ? 'text-[#A8A29E]' : 'text-[#78716C]'
                  }`}
                >
                  {action.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
