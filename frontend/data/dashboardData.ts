import { Project, AIInsight, QuickActionItem, SidebarNavItem } from '../types';

/**
 * Mock data for the Forma Studio Dashboard.
 * NOTE: These are typed mock entities designed to match the future FastAPI/PostgreSQL response schemas.
 * No actual database connection or backend AI is currently active.
 */

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: 'Warm Scandinavian Living Room',
    roomType: 'Living Room',
    thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    status: 'Design ready',
    createdAt: '2026-08-28T10:30:00Z',
    updatedAt: '2 hours ago',
    detectedCount: 4,
    style: 'Japandi & Warm Minimalist',
    palette: ['#FAF8F5', '#DED8CB', '#C27453', '#242220'],
    dimensionsEstimatedM: { width: 5.2, length: 4.4, height: 2.8 },
    notes: 'South-facing natural light with French herringbone oak flooring.'
  },
  {
    id: 'proj-002',
    name: 'Minimal Bedroom',
    roomType: 'Bedroom',
    thumbnail: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    status: 'Analysis complete',
    createdAt: '2026-08-25T14:15:00Z',
    updatedAt: 'Yesterday',
    detectedCount: 3,
    style: 'Calm Sanctuary & Limewash',
    palette: ['#F5F1E9', '#E9E4DA', '#9A8E85', '#181716'],
    dimensionsEstimatedM: { width: 4.1, length: 3.8, height: 2.7 },
    notes: 'Soft textured limewash walls with low-profile platform bed.'
  },
  {
    id: 'proj-003',
    name: 'Contemporary Workspace',
    roomType: 'Home Office',
    thumbnail: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80',
    status: 'Design ready',
    createdAt: '2026-08-20T09:00:00Z',
    updatedAt: '3 days ago',
    detectedCount: 5,
    style: 'Architectural Mid-Century',
    palette: ['#EAE5DC', '#C4975D', '#57534E', '#181716'],
    dimensionsEstimatedM: { width: 3.6, length: 3.2, height: 2.8 },
    notes: 'Solid walnut desk clearance mapped with acoustic panel backdrop.'
  }
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-01',
    category: 'lighting',
    title: 'Natural Illumination Vector',
    text: 'Your room receives strong natural light from the south-facing window.',
    confidenceScore: 0.94,
    tag: 'Aperture Scan',
    actionLabel: 'Preview Golden Hour'
  },
  {
    id: 'ins-02',
    category: 'materials',
    title: 'Surface Harmony',
    text: 'Warm wood tones may complement the existing flooring.',
    confidenceScore: 0.91,
    tag: 'Material Synergy',
    actionLabel: 'View Palettes'
  },
  {
    id: 'ins-03',
    category: 'spatial',
    title: 'Spatial Clearance',
    text: 'Available space beside the sofa could accommodate a compact accent chair.',
    confidenceScore: 0.88,
    tag: 'Zone Planning',
    actionLabel: 'Check Placement'
  }
];

export const DASHBOARD_NAV_ITEMS: SidebarNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    iconName: 'LayoutGrid',
    isActive: true
  },
  {
    id: 'studio',
    label: 'Design Studio',
    href: '/#studio',
    iconName: 'Sparkles'
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/dashboard#projects',
    iconName: 'Layers',
    badge: '3'
  },
  {
    id: 'products',
    label: 'Products',
    href: '/#products',
    iconName: 'Armchair'
  },
  {
    id: 'inspiration',
    label: 'Inspiration',
    href: '/#features',
    iconName: 'Compass'
  }
];

export const DASHBOARD_SECONDARY_NAV: SidebarNavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard#settings',
    iconName: 'Sliders'
  }
];

export const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'new-design',
    label: '+ New Design',
    description: 'Start with photo or plan',
    iconName: 'PlusCircle',
    primary: true
  },
  {
    id: 'analyze-room',
    label: 'Analyze Room',
    description: 'Detect spatial zones',
    iconName: 'Scan'
  },
  {
    id: 'explore-products',
    label: 'Explore Products',
    description: 'Compatible furniture',
    iconName: 'Boxes'
  },
  {
    id: 'open-inspiration',
    label: 'Open Inspiration',
    description: 'Editorial styles & moodboards',
    iconName: 'Sparkles'
  }
];
