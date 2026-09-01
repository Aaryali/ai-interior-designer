'use client';

import React from 'react';
import { Project } from '../../types';
import { Clock, ArrowUpRight, Box } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'Design ready':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FCFBF9]/90 text-[#181716] border border-[#DED8CB] shadow-2xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C27453]" />
            Design ready
          </span>
        );
      case 'Analysis complete':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FCFBF9]/90 text-[#181716] border border-[#DED8CB] shadow-2xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#78716C]" />
            Analysis complete
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FCFBF9]/90 text-[#78716C] border border-[#DED8CB] shadow-2xs backdrop-blur-xs">
            {status}
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onClick && onClick(project)}
      className="group relative bg-[#FCFBF9] border border-[#DED8CB]/80 rounded-2xl overflow-hidden hover:border-[#181716]/30 transition-all duration-300 shadow-[0_4px_16px_-4px_rgba(24,23,22,0.03)] hover:shadow-[0_12px_30px_-8px_rgba(24,23,22,0.08)] cursor-pointer flex flex-col"
    >
      {/* Thumbnail Aspect Frame */}
      <div className="relative aspect-[16/10] w-full bg-[#181716] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient Top Vignette for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Status & Room Type Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {getStatusBadge(project.status)}

          <span className="text-[10px] font-mono uppercase tracking-wider text-[#FCFBF9] bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
            {project.roomType}
          </span>
        </div>

        {/* Bottom Quick Info Overlay on Image */}
        {project.detectedCount && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-[#FCFBF9]/90 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs pointer-events-none">
            <Box className="w-3 h-3 text-[#C27453]" />
            <span>{project.detectedCount} zones detected</span>
          </div>
        )}

        {/* Hover Action Affordance */}
        <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#FCFBF9] text-[#181716] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-medium text-[#181716] tracking-tight group-hover:text-[#C27453] transition-colors line-clamp-1">
              {project.name}
            </h4>
          </div>

          {project.style && (
            <p className="text-xs text-[#78716C] font-light line-clamp-1 mb-3">
              {project.style}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-[#E9E4DA]/70 flex items-center justify-between text-[11px] text-[#A8A29E]">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#78716C]" />
            <span>{project.updatedAt}</span>
          </div>

          {project.palette && (
            <div className="flex items-center gap-1">
              {project.palette.slice(0, 3).map((color, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
