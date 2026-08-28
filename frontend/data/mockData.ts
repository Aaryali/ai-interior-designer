import {
  CapabilityItem,
  StepItem,
  LightingPreset,
  SeasonPreset,
  CameraAngle,
  ProductCatalogItem,
  ChatMessage,
  SpatialDetection
} from '../types';

export const HERO_DETECTIONS: SpatialDetection[] = [
  {
    id: 'det-1',
    label: 'Primary Seating Zone',
    category: 'furniture',
    confidence: 0.96,
    dimensions: { estimatedWidthM: 2.4, estimatedDepthM: 0.95, estimatedHeightM: 0.82 },
    material: 'Textured Bouclé & Solid Oak',
    box2d: { top: 48, left: 32, width: 36, height: 32 }
  },
  {
    id: 'det-2',
    label: 'Oak Hardwood Surface',
    category: 'surface',
    confidence: 0.98,
    material: 'Natural French Oak (Herringbone)',
    box2d: { top: 72, left: 12, width: 76, height: 26 }
  },
  {
    id: 'det-3',
    label: 'Natural Aperture / Daylight Source',
    category: 'lighting',
    confidence: 0.94,
    material: 'South-Facing Fenestration',
    box2d: { top: 12, left: 68, width: 28, height: 55 }
  },
  {
    id: 'det-4',
    label: 'Architectural Partition',
    category: 'architectural',
    confidence: 0.95,
    material: 'Limewash Micro-Cement',
    box2d: { top: 8, left: 6, width: 34, height: 70 }
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    title: 'AI Room Redesign',
    tagline: 'Style Synthesis',
    description: 'Transform an existing room into a completely new aesthetic using generative vision models while respecting room layout.',
    category: 'generation',
    iconName: 'Wand2',
    previewType: 'generative'
  },
  {
    id: 'cap-2',
    title: 'Computer Vision Analysis',
    tagline: 'Semantic Understanding',
    description: 'Identify furniture boundaries, surface planes, structural walls, and spatial layouts directly from photos.',
    category: 'vision',
    iconName: 'ScanLine',
    previewType: 'scan'
  },
  {
    id: 'cap-3',
    title: 'Product Visualization',
    tagline: 'Contextual In-Room Placement',
    description: 'Visualize catalog furniture inside your exact spatial context with automated style and color compatibility scoring.',
    category: 'spatial',
    iconName: 'Box',
    previewType: 'product'
  },
  {
    id: 'cap-4',
    title: 'Multi-Angle Design',
    tagline: 'Cross-Perspective Consistency',
    description: 'Maintain a spatially consistent design across different camera angles and room viewpoints.',
    category: 'spatial',
    iconName: 'Layers',
    previewType: 'multiview'
  },
  {
    id: 'cap-5',
    title: 'Lighting & Time of Day',
    tagline: 'Circadian Simulation',
    description: 'Simulate natural and artificial lighting shifts from crisp morning daylight to warm evening ambient tones.',
    category: 'generation',
    iconName: 'SunMedium',
    previewType: 'lighting'
  },
  {
    id: 'cap-6',
    title: 'Seasonal Transformation',
    tagline: 'Atmospheric Styling',
    description: 'Experience your interior design adapted across seasonal color palettes, textiles, and natural light conditions.',
    category: 'generation',
    iconName: 'Sparkles',
    previewType: 'generative'
  },
  {
    id: 'cap-7',
    title: '360° Virtual Tour',
    tagline: 'Interactive Exploration Concept',
    description: 'Preview interactive panoramic viewpoints to examine layout flow and material harmony across the entire room.',
    category: 'spatial',
    iconName: 'Compass',
    previewType: 'panorama'
  },
  {
    id: 'cap-8',
    title: 'AI Design Assistant',
    tagline: 'Conversational Spatial Editing',
    description: 'Iterate on colors, textures, and furniture arrangements using natural language prompts while retaining chosen elements.',
    category: 'interaction',
    iconName: 'MessageSquareText',
    previewType: 'chat'
  }
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    stepNumber: '01',
    title: 'Upload Your Space',
    description: 'Upload one or more photographs of your room from your smartphone or camera.',
    technicalSubtext: 'Accepts standard perspective captures; detects resolution & lighting conditions',
    iconName: 'UploadCloud'
  },
  {
    stepNumber: '02',
    title: 'AI Understands Your Room',
    description: 'Computer vision identifies furniture, surfaces, geometry, and spatial relationships.',
    technicalSubtext: 'Semantic segmentation maps structural boundaries, fixed fixtures & ambient light',
    iconName: 'Scan'
  },
  {
    stepNumber: '03',
    title: 'Generate & Customize',
    description: 'Generative AI transforms your space according to your style, palette, and constraints.',
    technicalSubtext: 'Conditioned generative diffusion synthesizes harmonious materials and lighting',
    iconName: 'Sparkles'
  },
  {
    stepNumber: '04',
    title: 'Visualize & Decide',
    description: 'Explore products, compare designs, inspect different angles, and walk through your final space.',
    technicalSubtext: 'Evaluate compatibility metrics, lighting variants & interactive viewpoints',
    iconName: 'Eye'
  }
];

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: 'morning',
    label: 'Morning Light',
    colorTemp: '5400K Crisp Daylight',
    description: 'Crisp, directional morning illumination with soft elongated shadows and natural cool undertones.',
    ambientTone: 'from-amber-50/40 via-sky-50/20 to-transparent',
    imageOverlayFilter: 'brightness(1.05) contrast(1.02) saturate(0.96)',
    lightSourceAngle: 'Low angle East-facing'
  },
  {
    id: 'afternoon',
    label: 'Afternoon Sun',
    colorTemp: '6200K Neutral Daylight',
    description: 'Bright, balanced overhead ambient light emphasizing texture details and neutral surface colors.',
    ambientTone: 'from-blue-50/20 via-stone-50/20 to-transparent',
    imageOverlayFilter: 'brightness(1.02) contrast(1.04) saturate(1.02)',
    lightSourceAngle: 'Direct overhead diffuse'
  },
  {
    id: 'golden_hour',
    label: 'Golden Hour',
    colorTemp: '3200K Warm Ember',
    description: 'Warm amber glow emphasizing natural wood grains, linen textures, and creating cozy atmospheric depth.',
    ambientTone: 'from-amber-500/20 via-orange-400/15 to-stone-900/30',
    imageOverlayFilter: 'sepia(0.2) saturate(1.25) contrast(1.05)',
    lightSourceAngle: 'Low angle West-facing horizon'
  },
  {
    id: 'night',
    label: 'Evening Ambience',
    colorTemp: '2700K Architectural Accent',
    description: 'Subdued evening mood with focused architectural sconces, floor uplighting, and warm cozy atmosphere.',
    ambientTone: 'from-indigo-950/60 via-stone-900/70 to-amber-900/30',
    imageOverlayFilter: 'brightness(0.78) contrast(1.2) saturate(1.1) hue-rotate(-10deg)',
    lightSourceAngle: 'Multi-point warm interior fixtures'
  }
];

export const SEASON_PRESETS: SeasonPreset[] = [
  {
    id: 'spring',
    label: 'Spring',
    paletteName: 'Botanical & Crisp Linens',
    description: 'Fresh botanical greens, airy off-white linens, and subtle sage undertones celebrating renewed light.',
    accentColors: ['#8A9A86', '#E8ECE6', '#D4B996'],
    atmosphericDescription: 'Gentle diffuse morning illumination with fresh organic foliage accents.'
  },
  {
    id: 'summer',
    label: 'Summer',
    paletteName: 'Warm Travertine & Rattan',
    description: 'Light honey oak, warm travertine textures, breathable natural jute, and bright airy spaces.',
    accentColors: ['#D6A874', '#F4E9D8', '#688B8C'],
    atmosphericDescription: 'High luminous energy with sun-drenched surfaces and minimal drape.'
  },
  {
    id: 'autumn',
    label: 'Autumn',
    paletteName: 'Terracotta & Brushed Bronze',
    description: 'Rich earthy terracotta, warm brushed bronze metal accents, textured bouclé, and deep amber timber.',
    accentColors: ['#B85D38', '#9C6F44', '#4A3B32'],
    atmosphericDescription: 'Enveloping warmth with layered wool throws and golden ambient illumination.'
  },
  {
    id: 'winter',
    label: 'Winter',
    paletteName: 'Cashmere & Deep Charcoal',
    description: 'Plush charcoal stone, muted alabaster, cashmere accents, and warm architectural focus lighting.',
    accentColors: ['#2B2D2F', '#D8D4CE', '#A67C52'],
    atmosphericDescription: 'Intimate cocooning contrast with soft low-glare point lighting.'
  }
];

export const CAMERA_ANGLES: CameraAngle[] = [
  {
    id: 'front',
    label: 'Front View',
    angleDescription: 'Axial wide-angle perspective showcasing main seating composition and focal wall.',
    fov: '78° Standard Interior'
  },
  {
    id: 'left',
    label: 'Left Perspective',
    angleDescription: 'Angled architectural perspective highlighting fenestration and natural light entry.',
    fov: '65° Directional'
  },
  {
    id: 'right',
    label: 'Right Perspective',
    angleDescription: 'Detailed view emphasizing spatial circulation, cabinetry, and secondary furniture.',
    fov: '65° Directional'
  },
  {
    id: 'isometric',
    label: '3D Spatial Plan',
    angleDescription: 'Elevated cutaway perspective illustrating furniture clearances and room flow.',
    fov: 'Isometric Plan'
  }
];

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
  {
    id: 'prod-1',
    name: 'Nordic Oak Lounge Chair',
    category: 'Seating',
    material: 'FSC Solid Oak & Natural Linen',
    widthCm: 78,
    depthCm: 84,
    heightCm: 76,
    style: 'Scandinavian Minimalist',
    priceInr: 24999,
    compatibilityScore: 92,
    compatibilityBreakdown: {
      size: 95,
      style: 94,
      color: 89,
      budget: 90
    },
    description: 'Handcrafted solid white oak frame with ergonomic low-profile posture and breathable natural linen upholstery.',
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Travertine Monolith Coffee Table',
    category: 'Tables',
    material: 'Honed Italian Travertine',
    widthCm: 110,
    depthCm: 60,
    heightCm: 38,
    style: 'Modern Architectural',
    priceInr: 32500,
    compatibilityScore: 88,
    compatibilityBreakdown: {
      size: 91,
      style: 93,
      color: 86,
      budget: 82
    },
    description: 'Substantial natural vein travertine table featuring rounded geometric edges and matte honed protective sealant.',
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Brushed Brass Cantilever Floor Lamp',
    category: 'Lighting',
    material: 'Spun Brass & Cast Iron Base',
    widthCm: 42,
    depthCm: 120,
    heightCm: 185,
    style: 'Warm Contemporary',
    priceInr: 14200,
    compatibilityScore: 95,
    compatibilityBreakdown: {
      size: 96,
      style: 98,
      color: 93,
      budget: 93
    },
    description: 'Architectural arching silhouette with 2700K warm diffused shade designed for reading zones.',
    inStock: true
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: '10:14 AM',
    text: 'Make this room warmer and more minimal. Keep the bookshelf and preserve the natural window light.'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    timestamp: '10:14 AM',
    text: "I've analyzed your room geometry. I kept the existing oak bookshelf in place, introduced warm limewash wall textures, simplified the seating palette to natural bouclé, and adjusted the ambient color temperature to 3200K warm glow.",
    suggestedActions: [
      'Replace Sofa with Bouclé Minimalist',
      'Set Lighting to 3200K Warm Ambient',
      'Apply Natural Oak Herringbone',
      'Add Architectural Olive Planter'
    ],
    modifiedAttributes: {
      material: 'Limewash plaster & white oak',
      lighting: '3200K Warm Ambient',
      stylePalette: 'Warm Scandinavian Minimalist',
      preservedObjects: ['Custom Wall Bookshelf', 'South Window Frame']
    }
  }
];
