// Core type definitions for the Developer IDE Consumer Journey Map

export type InsightLayerKey =
  | 'painPoints'
  | 'motivations'
  | 'messagingOpportunities'
  | 'mediaTouchpoints';

export type MediaChannelCategory =
  | 'social'
  | 'owned'
  | 'earned'
  | 'in-product'
  | 'community'
  | 'event';

export interface InsightItem {
  id: string;          // stable unique id for keying
  title: string;       // short label shown collapsed
  description: string; // expanded detail text (may contain IDE tool names)
}

export interface MediaTouchpointItem extends InsightItem {
  channelCategory: MediaChannelCategory;
}

export interface InsightLayers {
  painPoints: InsightItem[];
  motivations: InsightItem[];
  messagingOpportunities: InsightItem[];
  mediaTouchpoints: MediaTouchpointItem[];
}

export interface JourneyStage {
  id: string;                          // kebab-case, used as route param
  label: string;                       // display name
  order: number;                       // 1–7, used for sequential nav
  isLoop: boolean;                     // true for Experimentation_Loop, Knowledge_Loop
  frictionIntensity: 1 | 2 | 3 | 4 | 5; // used in summary view friction bar
  summary: string;                     // one-sentence stage description for summary card
  insights: InsightLayers;
}

export const IDE_TOOLS = [
  'Kiro',
  'Cursor',
  'Claude Code',
  'GitHub Copilot',
  'Cline',
  'TRAE',
  'Antigravity',
] as const;

export type IDETool = typeof IDE_TOOLS[number];
