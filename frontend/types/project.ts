/**
 * TypeScript definitions for Forma Application Dashboard & Project Management.
 * Designed to seamlessly interface with future FastAPI backend models and PostgreSQL tables.
 */

export type ProjectStatus = 'Design ready' | 'Analysis complete' | 'In progress' | 'Draft';

export type RoomType =
  | 'Living Room'
  | 'Bedroom'
  | 'Home Office'
  | 'Dining Room'
  | 'Studio'
  | 'Kitchen'
  | 'Lounge';

export interface Project {
  id: string;
  name: string;
  roomType: RoomType;
  thumbnail: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  detectedCount?: number;
  style?: string;
  palette?: string[];
  dimensionsEstimatedM?: {
    width: number;
    length: number;
    height: number;
  };
  notes?: string;
}

export type InsightCategory = 'lighting' | 'materials' | 'spatial' | 'products' | 'color';

export interface AIInsight {
  id: string;
  category: InsightCategory;
  title: string;
  text: string;
  confidenceScore?: number; // e.g. 0.94
  tag: string;
  actionLabel?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  description?: string;
  iconName: string;
  href?: string;
  badge?: string;
  primary?: boolean;
}

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: string;
  isActive?: boolean;
}
