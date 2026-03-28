# Design Document

## Overview

The Developer IDE Consumer Journey Map is a React single-page application (SPA) that renders an interactive, seven-stage developer journey. It targets AWS Marketing Managers and Directors who need a strategic reference artifact for campaign planning around AI-powered IDE tools (Kiro, Cursor, Claude Code, GitHub Copilot, Cline, TRAE, Antigravity).

The application has two primary views:
- **Summary View** — all seven stages visible simultaneously with friction intensity indicators and loop-stage differentiation
- **Stage Detail View** — a focused Stage_Panel for a selected journey stage, with four independently toggleable Insight_Layers

The app is a deployable static bundle (Vite + React) with no backend dependency. All journey content is co-located as structured TypeScript data. Visual design follows Initiative and IPG Media brand guidelines.

### Technology Stack

- React 18 + TypeScript
- Vite (build tooling, static output)
- React Router v6 (hash-based routing for static hosting compatibility)
- CSS Modules or Tailwind CSS for styling
- No external state management library — React `useState`/`useContext` is sufficient
- Vitest + fast-check for testing

---

## Architecture

### Application Shell

```
App
├── BrandThemeProvider        (CSS custom properties, typography injection)
├── Router
│   ├── Route "/"             → SummaryView
│   └── Route "/stage/:id"   → StageDetailView
├── JourneyNavigator          (persistent rail, all views)
└── [view outlet]
```

### Routing

Hash-based routing (`HashRouter`) ensures the app works on any static host without server-side redirect rules. Two routes:

| Route | Component | Description |
|---|---|---|
| `#/` | `SummaryView` | Overview of all 7 stages |
| `#/stage/:stageId` | `StageDetailView` | Detail panel for one stage |

`stageId` matches the `id` field on each `JourneyStage` data object (e.g., `experimentation-loop`).

### State Management

All state is local to the component tree — no Redux or Zustand needed.

| State | Owner | Type |
|---|---|---|
| Active stage | URL param (router) | `string` (stageId) |
| Visible insight layers | `StageDetailView` | `Record<InsightLayerKey, boolean>` |
| Expanded insight items | `InsightLayer` | `Set<string>` (item ids) |

When a user navigates away from a stage and returns, the insight layer toggle state resets to "all visible" (per Requirement 7.4). Expanded item state is ephemeral within the panel session.

---

## Components and Interfaces

### Component Tree

```
App
├── BrandThemeProvider
├── JourneyNavigator
│   ├── StageNavItem (×7)          — label, loop indicator, active state
│   └── NavArrows                  — prev/next sequential navigation
├── SummaryView
│   ├── SummaryHeader
│   └── StageSummaryCard (×7)      — friction bar, loop badge, insight counts
│       └── [click → navigate to /stage/:id]
└── StageDetailView
    ├── StageHeader                — stage name, loop indicator if applicable
    ├── InsightLayerControls       — four toggle buttons
    └── InsightLayerPanel (×0–4)   — conditionally rendered per toggle state
        ├── InsightLayerHeader
        └── InsightItem (×n)       — expandable, IDE tool refs highlighted
```

### Component Interfaces

```typescript
// JourneyNavigator
interface JourneyNavigatorProps {
  stages: JourneyStage[];
  activeStageId: string | null;  // null when in summary view
  onSelectStage: (id: string) => void;
  onNavigateSummary: () => void;
}

// StageNavItem
interface StageNavItemProps {
  stage: JourneyStage;
  isActive: boolean;
  isLoop: boolean;
  onClick: () => void;
}

// StageSummaryCard
interface StageSummaryCardProps {
  stage: JourneyStage;
  onClick: () => void;
}

// InsightLayerControls
interface InsightLayerControlsProps {
  visibleLayers: Record<InsightLayerKey, boolean>;
  onToggle: (layer: InsightLayerKey) => void;
}

// InsightLayerPanel
interface InsightLayerPanelProps {
  layer: InsightLayerKey;
  items: InsightItem[];
}

// InsightItem
interface InsightItemProps {
  item: InsightItem;
  isExpanded: boolean;
  onToggle: () => void;
}
```

### IDE Tool Reference Rendering

Any string content containing an IDE tool name is parsed at render time. A utility `renderWithToolRefs(text: string): ReactNode` scans for known tool names and wraps them in `<IDEToolBadge>` — a styled inline `<mark>` element. This is purely presentational and requires no data-layer changes.

---

## Data Models

### Core Types

```typescript
type InsightLayerKey = 'painPoints' | 'motivations' | 'messagingOpportunities' | 'mediaTouchpoints';

type MediaChannelCategory = 'social' | 'owned' | 'earned' | 'in-product' | 'community' | 'event';

interface InsightItem {
  id: string;                    // stable unique id for keying
  title: string;                 // short label shown collapsed
  description: string;           // expanded detail text (may contain IDE tool names)
}

interface MediaTouchpointItem extends InsightItem {
  channelCategory: MediaChannelCategory;
}

interface InsightLayers {
  painPoints: InsightItem[];
  motivations: InsightItem[];
  messagingOpportunities: InsightItem[];  // description = rationale
  mediaTouchpoints: MediaTouchpointItem[];
}

interface JourneyStage {
  id: string;                    // kebab-case, used as route param
  label: string;                 // display name
  order: number;                 // 1–7, used for sequential nav
  isLoop: boolean;               // true for Experimentation_Loop, Knowledge_Loop
  frictionIntensity: 1 | 2 | 3 | 4 | 5;  // used in summary view friction bar
  summary: string;               // one-sentence stage description for summary card
  insights: InsightLayers;
}
```

### Content Schema — Stage Registry

All journey content lives in a single file: `src/data/journeyStages.ts`, exporting:

```typescript
export const JOURNEY_STAGES: JourneyStage[] = [
  // ordered array, index 0 = Trigger, index 6 = Knowledge_Loop
];

export const STAGE_MAP: Record<string, JourneyStage> = 
  Object.fromEntries(JOURNEY_STAGES.map(s => [s.id, s]));

export const IDE_TOOLS = [
  'Kiro', 'Cursor', 'Claude Code', 'GitHub Copilot', 'Cline', 'TRAE', 'Antigravity'
] as const;

export type IDETool = typeof IDE_TOOLS[number];
```

### Stage Definitions (Schema Examples)

```typescript
// Trigger stage (order: 1, isLoop: false)
{
  id: 'trigger',
  label: 'Trigger',
  order: 1,
  isLoop: false,
  frictionIntensity: 2,
  summary: 'Developer encounters a pain point or hears about AI IDE tools for the first time.',
  insights: {
    painPoints: [
      { id: 'trigger-pp-1', title: 'Repetitive boilerplate slows velocity', description: '...' },
      { id: 'trigger-pp-2', title: 'Context switching between docs and editor', description: '...' },
      { id: 'trigger-pp-3', title: 'Peer pressure without clear signal', description: '...' },
    ],
    motivations: [ /* ≥3 items */ ],
    messagingOpportunities: [ /* ≥2 items */ ],
    mediaTouchpoints: [ /* ≥3 items with channelCategory */ ],
  }
}

// Experimentation_Loop (order: 4, isLoop: true)
{
  id: 'experimentation-loop',
  label: 'Experimentation Loop',
  order: 4,
  isLoop: true,
  frictionIntensity: 4,
  summary: 'Developer cycles through multiple tools, comparing capabilities before committing.',
  insights: { /* ... */ }
}

// Knowledge_Loop (order: 7, isLoop: true)
{
  id: 'knowledge-loop',
  label: 'Knowledge Loop',
  order: 7,
  isLoop: true,
  frictionIntensity: 3,
  summary: 'Continuous cycle: knowledge gathering → problem solving → advocacy → back to knowledge gathering.',
  insights: { /* ... */ }
}
```

---

## Brand Theme Implementation

### Initiative / IPG Visual Identity

The Brand_Theme is implemented as a set of CSS custom properties injected by `BrandThemeProvider` at the root level, derived directly from the Initiative Font Use Guide.

**Typography system (from Initiative brand guide):**
- Primary typeface / Headings: `League Gothic Regular` (condensed, all-caps impact headlines) — loaded via Google Fonts (`@import` from `fonts.googleapis.com/css2?family=League+Gothic`)
- Complementary typeface / Sub-headings & body: `Aldine 721 BT` → web fallback: `'Palatino Linotype', 'Book Antiqua', Palatino, serif` (Aldine 721 BT is a licensed font; the serif fallback preserves the oldstyle character)
- Embellishment / Emphasis: `Brand Pro Regular` (script) → web fallback: `'Dancing Script', cursive` (loaded via Google Fonts for decorative callouts only)
- Body copy: Aldine 721 BT Roman (regular weight); Sub-headings: Aldine 721 BT Roman Bold
- Canada/regional body copy: `Goudy Old Style` → web fallback: `Georgia, serif`

**Color palette (from Initiative brand guide):**
- Signature sky blue: `#4DC8E8` — primary brand color, used on backgrounds, CTAs, active states, and large display elements
- Off-white / cream: `#F0EDE4` — primary light background (matches the guide's warm parchment tone)
- Near-black / dark charcoal: `#1C1C1C` — primary text on light backgrounds, 3D shadow base
- White: `#FFFFFF` — text on blue backgrounds, card surfaces
- Loop/accent indicator: `#4DC8E8` (sky blue) with white text — loop badges use the brand blue

```css
/* src/styles/brand-theme.css */
:root {
  /* Initiative Color Palette */
  --color-brand-blue: #4DC8E8;       /* Initiative signature sky blue */
  --color-background: #F0EDE4;       /* warm cream/off-white — primary bg */
  --color-surface: #FFFFFF;          /* white — card and panel surfaces */
  --color-surface-alt: #E8E4DA;      /* slightly darker cream — alternate panels */
  --color-text-primary: #1C1C1C;     /* near-black — primary text */
  --color-text-secondary: #555555;   /* mid-grey — secondary/muted text */
  --color-text-on-blue: #FFFFFF;     /* white text on blue backgrounds */
  --color-accent: #4DC8E8;           /* sky blue — active states, highlights */
  --color-loop-indicator: #4DC8E8;   /* sky blue — loop stage badges */
  --color-border: #C8C4BA;           /* warm grey — card borders */
  --color-friction-low: #4DC8E8;     /* blue — low friction */
  --color-friction-mid: #F5A623;     /* amber — mid friction */
  --color-friction-high: #1C1C1C;    /* dark — high friction */

  /* Typography — Initiative brand fonts */
  --font-heading: 'League Gothic', 'Arial Narrow', sans-serif;   /* primary: League Gothic Regular */
  --font-body: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; /* Aldine 721 BT fallback */
  --font-emphasis: 'Dancing Script', cursive;                     /* Brand Pro Regular fallback */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Type scale — matching Initiative size guidance */
  --text-cta: 72px;        /* CTA Heading — League Gothic, 72pt+ */
  --text-major: 28px;      /* Major Header — League Gothic, 28pt */
  --text-minor: 20px;      /* Minor Header — League Gothic, 20pt */
  --text-subhead: 16px;    /* Sub Heading — Aldine 721 BT Bold */
  --text-body: 12px;       /* Body Copy — Aldine 721 BT Roman, 12pt */

  /* Spacing scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
}
```

### Loop Stage Visual Treatment

Loop stages receive distinct visual treatment at every level, using the Initiative sky blue (`--color-brand-blue`) as the loop accent:

- **Navigator rail**: loop icon (↻) rendered alongside stage label; sky blue (`--color-brand-blue`) left border
- **Summary card**: "Loop" badge — sky blue background, white League Gothic text; dashed border instead of solid
- **Stage panel header**: cycle arrow SVG icon in sky blue; subtitle text "Cyclical Stage — this phase repeats" in Aldine 721 BT italic
- **Summary view layout**: loop stages rendered with a curved connector arrow (sky blue stroke) between them and their preceding/following stages, visually breaking the linear flow

### Visual Aesthetic

The overall aesthetic follows the Initiative brand guide's light-mode presentation style:
- Warm cream/off-white (`#F0EDE4`) backgrounds — not dark mode
- Sky blue (`#4DC8E8`) as the dominant accent throughout
- League Gothic for all major headings — condensed, uppercase, high impact
- Aldine 721 BT (serif fallback) for body copy and sub-headings — editorial feel
- Brand Pro / Dancing Script used sparingly for emphasis callouts only
- Thin horizontal rules with small circle endpoints (matching the guide's decorative dividers) between sections

### Responsive Layout

| Viewport | Navigator | Summary | Stage Panel |
|---|---|---|---|
| 1024–1279px | Horizontal top rail, compact labels | 2-column card grid | Single column |
| 1280–1919px | Vertical left rail (240px) | 3–4 column card grid | Two-column insight layout |
| 1920–2560px | Vertical left rail (280px) | 7-column single row | Three-column insight layout |

---

## Summary View Layout

The summary view renders all seven `StageSummaryCard` components in a responsive grid. Each card shows:

1. Stage number and label
2. Loop badge (if applicable)
3. One-sentence summary
4. Friction intensity bar (1–5 scale, color-coded low/mid/high)
5. Insight counts (e.g., "4 pain points · 3 motivations · 2 messaging · 4 touchpoints")

Loop stages in the summary view are connected by a curved SVG arrow overlay that visually communicates the cyclical relationship. The arrow connects Knowledge_Loop back toward Experimentation_Loop, reinforcing the non-linear nature.

```
[Trigger] → [Eval/Research] → [Trial] → [Exp. Loop ↻] → [Commitment] → [Rapid Exp.] → [Knowledge Loop ↻]
                                                ↑_______________________________________________|
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: All stages meet minimum insight content counts

*For any* journey stage in the stage registry, the pain points array must contain at least 3 items, the motivations array at least 3 items, the messaging opportunities array at least 2 items, and the media touchpoints array at least 3 items.

**Validates: Requirements 3.1, 4.1, 5.1, 6.1**

---

### Property 2: Insight item expand/collapse round trip

*For any* insight item across any layer and any stage, clicking the item when collapsed should set it to expanded, and clicking again should return it to collapsed — restoring the original state.

**Validates: Requirements 3.3, 4.3, 5.3, 6.3**

---

### Property 3: Active stage is visually distinguished in navigator

*For any* stage selected as active, the corresponding nav item should carry the active CSS class (or equivalent aria-current attribute), and no other nav item should carry that class simultaneously.

**Validates: Requirements 1.4**

---

### Property 4: Sequential navigation covers all stages

*For any* stage at position N (where N < 7), activating the "next" control should result in the stage at position N+1 becoming active. For any stage at position N (where N > 1), activating "previous" should result in position N-1 becoming active.

**Validates: Requirements 1.5**

---

### Property 5: Loop stages are visually distinguished in the navigator

*For any* stage where `isLoop === true`, the navigator item should render a loop indicator element. *For any* stage where `isLoop === false`, no loop indicator should be present on that nav item.

**Validates: Requirements 1.6**

---

### Property 6: Loop stage panels include a cycle indicator

*For any* stage where `isLoop === true`, the rendered Stage_Panel should contain a loop/cycle indicator element. *For any* stage where `isLoop === false`, no such indicator should appear in the panel header.

**Validates: Requirements 2.1**

---

### Property 7: Loop stages are visually differentiated in summary cards

*For any* stage where `isLoop === true`, the corresponding StageSummaryCard should render a loop badge element. *For any* stage where `isLoop === false`, no loop badge should appear on that card.

**Validates: Requirements 2.4, 9.4**

---

### Property 8: Hidden insight layers are absent from the DOM

*For any* InsightLayerKey, when that layer is toggled off, the content of that layer (its items) should not be present in the rendered output. When toggled back on, the content should reappear.

**Validates: Requirements 7.2**

---

### Property 9: Insight layer visibility state is preserved across hide/show

*For any* insight layer with some items in an expanded state, hiding the layer and then showing it again should result in the same set of items being expanded as before the hide.

**Validates: Requirements 7.3**

---

### Property 10: Stage panel defaults to all layers visible

*For any* stage panel on first render (no prior toggle interaction), all four InsightLayerKeys should be in the visible state.

**Validates: Requirements 7.4**

---

### Property 11: All media touchpoints have a valid channel category

*For any* media touchpoint item across all stages, the `channelCategory` field must be one of the valid `MediaChannelCategory` values: `'social' | 'owned' | 'earned' | 'in-product' | 'community' | 'event'`.

**Validates: Requirements 6.2**

---

### Property 12: IDE tool names in content are rendered as distinct badges

*For any* content string passed to `renderWithToolRefs` that contains a known IDE tool name, the returned React node tree should contain at least one `IDEToolBadge` element wrapping that tool name.

**Validates: Requirements 8.2**

---

### Property 13: Journey content references at least five distinct IDE tools

*For any* complete rendering of the journey data, scanning all insight item titles and descriptions across all stages should yield at least five distinct IDE tool names from the known tools list.

**Validates: Requirements 8.1**

---

### Property 14: Summary view navigation to any stage

*For any* StageSummaryCard in the summary view, clicking it should trigger navigation to the corresponding stage detail route (`#/stage/:stageId`).

**Validates: Requirements 9.2**

---

### Property 15: All summary cards render a friction intensity indicator

*For any* stage, the StageSummaryCard should render a friction indicator element whose visual representation corresponds to the stage's `frictionIntensity` value (1–5).

**Validates: Requirements 9.3**

---

## Error Handling

### Missing or Malformed Stage Data

- If a route param `stageId` does not match any key in `STAGE_MAP`, the app renders a `StageNotFound` fallback component with a link back to the summary view.
- TypeScript's type system enforces the `JourneyStage` schema at build time, preventing malformed data from reaching runtime.

### IDE Tool Reference Parsing

- `renderWithToolRefs` is a pure function. If the input string is empty or contains no tool names, it returns the original string as a text node — no error thrown.
- Tool name matching is case-sensitive and exact to avoid false positives (e.g., "cursor" in a sentence vs "Cursor" the product).

### Routing Edge Cases

- Navigating to `#/stage/` with no id redirects to `#/`.
- The app does not use `BrowserRouter` to avoid 404s on direct URL access on static hosts.

### Insight Layer State

- Toggle state is initialized from a constant default (all visible). There is no persistence to localStorage, so there is no risk of stale or corrupted state across sessions.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:

- **Unit tests** cover specific examples, integration points, and edge cases
- **Property tests** verify universal invariants across generated inputs

### Property-Based Testing

Library: **fast-check** (TypeScript-native, works with Vitest)

Each property test runs a minimum of **100 iterations**. Each test is tagged with a comment referencing the design property it validates.

Tag format: `// Feature: developer-ide-consumer-journey, Property {N}: {property_text}`

| Design Property | Test Description | fast-check Approach |
|---|---|---|
| Property 1 | All stages meet minimum insight counts | `fc.constantFrom(...JOURNEY_STAGES)` → assert array lengths |
| Property 2 | Expand/collapse round trip | `fc.constantFrom(...allInsightItems)` → simulate two clicks, assert state |
| Property 3 | Active stage exclusive highlight | `fc.constantFrom(...JOURNEY_STAGES)` → render nav, assert single active |
| Property 4 | Sequential nav covers all stages | `fc.integer({min:1, max:6})` → click next, assert N+1 active |
| Property 5 | Loop stages have nav indicator | `fc.constantFrom(...JOURNEY_STAGES)` → assert indicator presence matches isLoop |
| Property 6 | Loop stage panels have cycle indicator | `fc.constantFrom(...JOURNEY_STAGES)` → render panel, assert indicator |
| Property 7 | Loop summary cards have badge | `fc.constantFrom(...JOURNEY_STAGES)` → render card, assert badge |
| Property 8 | Hidden layers absent from DOM | `fc.constantFrom('painPoints','motivations','messagingOpportunities','mediaTouchpoints')` → toggle off, assert absent |
| Property 9 | Layer state preserved across hide/show | `fc.constantFrom(...JOURNEY_STAGES)` + `fc.set(fc.nat())` → hide/show, assert expanded set unchanged |
| Property 10 | Default all layers visible | `fc.constantFrom(...JOURNEY_STAGES)` → fresh render, assert all 4 visible |
| Property 11 | All touchpoints have valid channel category | `fc.constantFrom(...allTouchpoints)` → assert channelCategory in valid set |
| Property 12 | IDE tool names render as badges | `fc.constantFrom(...IDE_TOOLS)` + `fc.string()` → inject tool name, assert badge present |
| Property 13 | ≥5 distinct IDE tools in content | Scan all stage content once → assert distinct tool count ≥ 5 |
| Property 14 | Summary card navigates to stage | `fc.constantFrom(...JOURNEY_STAGES)` → click card, assert route |
| Property 15 | Friction indicator present on all cards | `fc.constantFrom(...JOURNEY_STAGES)` → render card, assert indicator element |

### Unit Tests

Unit tests focus on:

- **Specific examples**: Verify the 7 stages render in correct order in the navigator
- **Edge cases**: `renderWithToolRefs` with empty string, string with no tool names, string with multiple tool names
- **Integration**: Navigating from summary view to a stage panel and back
- **Brand theme**: CSS custom properties are present in the document root after `BrandThemeProvider` mounts
- **Accessibility**: Loop stages have `aria-label` containing "cyclical" or equivalent

### Test File Structure

```
src/
  __tests__/
    data.test.ts          — Property 1, 11, 13 (data integrity)
    navigator.test.tsx    — Properties 3, 4, 5 (nav behavior)
    stagePanel.test.tsx   — Properties 2, 6, 8, 9, 10 (panel behavior)
    summaryView.test.tsx  — Properties 7, 14, 15 (summary view)
    renderUtils.test.ts   — Property 12 (IDE tool badge rendering)
    brand.test.tsx        — Brand theme unit example
```
