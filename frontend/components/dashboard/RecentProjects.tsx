'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from './EmptyState';
import { ArrowRight } from 'lucide-react';

interface RecentProjectsProps {
  projects: Project[];
  onNewDesignClick?: () => void;
  onSelectProject?: (project: Project) => void;
}

export const RecentProjects: React.FC<RecentProjectsProps> = ({
  projects,
  onNewDesignClick,
  onSelectProject
}) => {
  const [showEmptyPreview, setShowEmptyPreview] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const displayProjects = showEmptyPreview
    ? []
    : selectedFilter === 'all'
    ? projects
    : projects.filter((p) => p.roomType.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="projects" className="space-y-4 sm:space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-sans font-medium text-[#181716] tracking-tight">
              Recent Projects
            </h3>
            <span className="text-xs font-mono text-[#78716C] bg-[#F5F1E9] px-2 py-0.5 rounded-full border border-[#DED8CB]/60">
              {displayProjects.length}
            </span>
          </div>

          {/* Discreet Preview Toggle for Prototype Testing */}
          <button
            onClick={() => setShowEmptyPreview(!showEmptyPreview)}
            type="button"
            className="text-[11px] text-[#78716C] hover:text-[#181716] underline underline-offset-2 ml-2 transition-colors cursor-pointer"
            title="Toggle between populated and first-time empty state"
          >
            {showEmptyPreview ? 'Show mock projects' : 'Preview empty state'}
          </button>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Room Filter Pills */}
          {!showEmptyPreview && (
            <div className="hidden sm:flex items-center gap-1 bg-[#F5F1E9] p-1 rounded-xl border border-[#DED8CB]/70 text-[11px]">
              <button
                onClick={() => setSelectedFilter('all')}
                type="button"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-[#FCFBF9] text-[#181716] font-medium shadow-2xs'
                    : 'text-[#78716C] hover:text-[#181716]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('living')}
                type="button"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFilter === 'living'
                    ? 'bg-[#FCFBF9] text-[#181716] font-medium shadow-2xs'
                    : 'text-[#78716C] hover:text-[#181716]'
                }`}
              >
                Living
              </button>
              <button
                onClick={() => setSelectedFilter('bed')}
                type="button"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFilter === 'bed'
                    ? 'bg-[#FCFBF9] text-[#181716] font-medium shadow-2xs'
                    : 'text-[#78716C] hover:text-[#181716]'
                }`}
              >
                Bedroom
              </button>
              <button
                onClick={() => setSelectedFilter('office')}
                type="button"
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedFilter === 'office'
                    ? 'bg-[#FCFBF9] text-[#181716] font-medium shadow-2xs'
                    : 'text-[#78716C] hover:text-[#181716]'
                }`}
              >
                Office
              </button>
            </div>
          )}

          <Link
            href="/#features"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] hover:text-[#181716] transition-colors"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid or Empty State */}
      {displayProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={onSelectProject}
            />
          ))}
        </div>
      ) : (
        <EmptyState onNewDesignClick={onNewDesignClick} />
      )}
    </section>
  );
};
