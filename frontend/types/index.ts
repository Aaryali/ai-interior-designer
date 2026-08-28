/**
 * TypeScript definitions for Forma - AI-Powered Virtual Interior Design System.
 * Structured to align with the future FastAPI backend schema and response models.
 */

export interface SpatialDetection {
  id: string;
  label: string;
  category: 'furniture' | 'surface' | 'architectural' | 'lighting';
  confidence: number; // 0.0 - 1.0 (e.g. 0.94)
  dimensions?: {
    estimatedWidthM: number;
    estimatedDepthM: number;
    estimatedHeightM: number;
  };
  material?: string;
  box2d?: {
    top: number; // percentage (0-100)
    left: number; // percentage (0-100)
    width: number; // percentage (0-100)
    height: number; // percentage (0-100)
  };
}

export interface RoomTransformation {
  id: string;
  roomType: 'living_room' | 'bedroom' | 'dining_room' | 'office' | 'studio';
  style: string;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  detectedObjectsCount: number;
  palette: string[];
  detections: SpatialDetection[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'vision' | 'generation' | 'spatial' | 'interaction';
  iconName: string;
  highlightMetric?: string;
  previewType: 'scan' | 'multiview' | 'lighting' | 'materials' | 'chat' | 'product' | 'panorama' | 'generative';
}

export interface StepItem {
  stepNumber: string;
  title: string;
  description: string;
  technicalSubtext: string;
  iconName: string;
}

export interface LightingPreset {
  id: 'morning' | 'afternoon' | 'golden_hour' | 'night';
  label: string;
  colorTemp: string;
  description: string;
  ambientTone: string;
  imageOverlayFilter: string;
  lightSourceAngle: string;
}

export interface SeasonPreset {
  id: 'spring' | 'summer' | 'autumn' | 'winter';
  label: string;
  paletteName: string;
  description: string;
  accentColors: string[];
  atmosphericDescription: string;
}

export interface CameraAngle {
  id: 'front' | 'left' | 'right' | 'isometric';
  label: string;
  angleDescription: string;
  fov: string;
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  category: string;
  material: string;
  widthCm: number;
  depthCm: number;
  heightCm: number;
  style: string;
  priceInr: number;
  compatibilityScore: number; // 0-100
  compatibilityBreakdown: {
    size: number;
    style: number;
    color: number;
    budget: number;
  };
  description: string;
  inStock: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  suggestedActions?: string[];
  modifiedAttributes?: {
    material?: string;
    lighting?: string;
    stylePalette?: string;
    preservedObjects?: string[];
  };
}
