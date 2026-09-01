'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { TopBar } from '../../components/dashboard/TopBar';
import { WelcomeSection } from '../../components/dashboard/WelcomeSection';
import { NewDesignCard } from '../../components/dashboard/NewDesignCard';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { RecentProjects } from '../../components/dashboard/RecentProjects';
import { AIInsights } from '../../components/dashboard/AIInsights';
import { MOCK_PROJECTS, MOCK_AI_INSIGHTS } from '../../data/dashboardData';
import { Project } from '../../types';

export default function DashboardPage() {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);
  const newDesignRef = useRef<HTMLDivElement>(null);

  const handleScrollToNewDesign = () => {
    newDesignRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'new-design' || actionId === 'analyze-room') {
      handleScrollToNewDesign();
    } else if (actionId === 'explore-products') {
      router.push('/#products');
    } else if (actionId === 'open-inspiration') {
      router.push('/#features');
    }
  };

  const handleSampleRoomSelected = (roomName: string) => {
    setNotificationBanner(`Loaded sample: ${roomName}. Ready to explore spatial transformations.`);
    setTimeout(() => setNotificationBanner(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181716] flex flex-col md:flex-row antialiased selection:bg-[#DED8CB]">
      {/* 1. Sidebar (Persistent on Desktop, Slide-over Drawer on Mobile) */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onNewDesignClick={handleScrollToNewDesign}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onNewDesignClick={handleScrollToNewDesign}
        />

        {/* Studio Notification / Feedback Toast */}
        {notificationBanner && (
          <div className="mx-4 sm:mx-8 lg:mx-10 mt-4 p-3.5 rounded-2xl bg-[#181716] text-[#FCFBF9] text-xs flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C27453]" />
              <span>{notificationBanner}</span>
            </div>
            <button
              onClick={() => setNotificationBanner(null)}
              className="text-[#A8A29E] hover:text-[#FCFBF9] text-xs font-mono px-2 py-0.5"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8 sm:space-y-10">
          {/* Welcome / Architectural Hero Banner */}
          <WelcomeSection onNewDesignClick={handleScrollToNewDesign} />

          {/* Quick Actions Bar */}
          <QuickActions onActionClick={handleQuickAction} />

          {/* Ingestion & AI Intelligence Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {/* New Design & Room Upload Card (Spans 2 columns on wide screens) */}
            <div ref={newDesignRef} className="lg:col-span-2">
              <NewDesignCard
                onSampleRoomSelected={handleSampleRoomSelected}
                onUploadInitiated={() => {
                  setNotificationBanner('Room visual uploaded. Simulating spatial geometry analysis...');
                  setTimeout(() => setNotificationBanner(null), 5000);
                }}
              />
            </div>

            {/* AI Design Intelligence Preview Panel (Spans 1 column) */}
            <div className="lg:col-span-1 h-full">
              <AIInsights insights={MOCK_AI_INSIGHTS} />
            </div>
          </div>

          {/* Recent Projects Section (with built-in Empty State tester) */}
          <RecentProjects
            projects={MOCK_PROJECTS}
            onNewDesignClick={handleScrollToNewDesign}
            onSelectProject={(project) => {
              setSelectedProject(project);
              setNotificationBanner(`Selected project: ${project.name}`);
              setTimeout(() => setNotificationBanner(null), 4000);
            }}
          />
        </main>
      </div>
    </div>
  );
}
