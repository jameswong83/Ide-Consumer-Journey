# Implementation Plan: Developer IDE Consumer Journey Map

## Overview

Build a React 18 + TypeScript + Vite SPA that renders an interactive seven-stage developer journey map. Implementation proceeds from data layer → brand theme → core components → views → routing → testing.

## Tasks

- [x] 1. Initialize project and configure tooling
  - Scaffold Vite + React 18 + TypeScript project (`npm create vite@latest`)
  - Install dependencies: `react-router-dom@6`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `fast-check`, `jsdom`
  - Configure `vite.config.ts` with Vitest and jsdom test environment
  - Add Google Fonts import for League Gothic and Dancing Script in `index.html`
  - _Requirements: 11.1, 11.2, 12.1_

- [x] 2. Define core TypeScript types and data models
  - [x] 2.1 Create `src/types/journey.ts` with all core interfaces
    - Define `InsightLayerKey`, `MediaChannelCategory`, `InsightItem`, `MediaTouchpointItem`, `InsightLayers`, `JourneyStage`
    - Define `IDETool` type and `IDE_TOOLS` const array
    - _Requirements: 3.1, 4.1, 5.1, 6.1, 6.2, 8.1_

  - [x] 2.2 Create `src/data/journeyStages.ts` with all 7 stage definitions
    - Implement all 7 stages: Trigger, Evaluation_Research, Trial, Experimentation_Loop, Commitment_SignUp, Rapid_Experimentation, Knowledge_Loop
    - Each stage must have ≥3 pain points, ≥3 motivations, ≥2 messaging opportunities, ≥3 media touchpoints
    - Set `isLoop: true` for `experimentation-loop` and `knowledge-loop`; assign `frictionIntensity` 1–5 per stage
    - Reference at least 5 distinct IDE tools (Kiro, Cursor, Claude Code, GitHub Copilot, Cline) across content
    - Export `JOURNEY_STAGES`, `STAGE_MAP`, `IDE_TOOLS`
    - _Requirements: 1.1, 2.2, 2.3, 3.1, 3.2, 4.1, 5.1, 5.2, 6.1, 6.4, 8.1_

  - [ ]* 2.3 Write property tests for data integrity (Properties 1, 11, 13)
    - **Property 1: All stages meet minimum insight content counts** — `fc.constantFrom(...JOURNEY_STAGES)` → assert array lengths ≥ minimums
    - **Property 11: All media touchpoints have a valid channel category** — `fc.constantFrom(...allTouchpoints)` → assert `channelCategory` in valid set
    - **Property 13: Journey content references at least five distinct IDE tools** — scan all content, assert distinct tool count ≥ 5
    - File: `src/__tests__/data.test.ts`
    - **Validates: Requirements 3.1, 4.1, 5.1, 6.1, 6.2, 8.1**

- [x] 3. Implement brand theme
  - [x] 3.1 Create `src/styles/brand-theme.css` with all CSS custom properties
    - Define color palette (`--color-brand-blue: #4DC8E8`, `--color-background: #F0EDE4`, etc.)
    - Define typography variables (`--font-heading`, `--font-body`, `--font-emphasis`)
    - Define type scale (`--text-cta: 72px` through `--text-body: 12px`) and spacing scale
    - _Requirements: 12.1, 12.3, 12.4_

  - [x] 3.2 Create `src/components/BrandThemeProvider.tsx`
    - Component that imports `brand-theme.css` and wraps children; sets `font-family` on `body`
    - _Requirements: 12.1, 12.3_

  - [ ]* 3.3 Write unit test for BrandThemeProvider
    - Assert CSS custom properties are present on document root after mount
    - File: `src/__tests__/brand.test.tsx`
    - **Validates: Requirements 12.1**

- [x] 4. Implement utility: `renderWithToolRefs`
  - [x] 4.1 Create `src/utils/renderWithToolRefs.tsx`
    - Pure function `renderWithToolRefs(text: string): ReactNode`
    - Case-sensitive scan for known IDE tool names; wrap matches in `<IDEToolBadge>` (`<mark>` element with sky blue styling)
    - Return original string as text node if no matches found
    - _Requirements: 8.2_

  - [ ]* 4.2 Write property test for IDE tool badge rendering (Property 12)
    - **Property 12: IDE tool names in content are rendered as distinct badges** — `fc.constantFrom(...IDE_TOOLS)` + `fc.string()` → inject tool name, assert `IDEToolBadge` present
    - Also test edge cases: empty string, no tool names, multiple tool names
    - File: `src/__tests__/renderUtils.test.ts`
    - **Validates: Requirements 8.2**

- [x] 5. Implement JourneyNavigator component
  - [x] 5.1 Create `src/components/JourneyNavigator.tsx` and `StageNavItem.tsx`
    - Render all 7 stages as nav items with label; show ↻ icon for loop stages
    - Apply active CSS class / `aria-current="page"` to the active stage item exclusively
    - Include prev/next `NavArrows` for sequential navigation
    - Responsive: horizontal rail at 1024–1279px, vertical left rail (240px) at 1280px+
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 10.1_

  - [ ]* 5.2 Write property tests for navigator behavior (Properties 3, 4, 5)
    - **Property 3: Active stage is visually distinguished in navigator** — `fc.constantFrom(...JOURNEY_STAGES)` → render nav, assert single active item
    - **Property 4: Sequential navigation covers all stages** — `fc.integer({min:1, max:6})` → click next, assert N+1 active
    - **Property 5: Loop stages have nav indicator** — `fc.constantFrom(...JOURNEY_STAGES)` → assert ↻ indicator presence matches `isLoop`
    - File: `src/__tests__/navigator.test.tsx`
    - **Validates: Requirements 1.4, 1.5, 1.6**

- [x] 6. Implement Stage Panel components
  - [x] 6.1 Create `src/components/StageHeader.tsx`
    - Render stage label in League Gothic; show ↻ SVG icon + "Cyclical Stage — this phase repeats" subtitle for loop stages
    - _Requirements: 2.1_

  - [x] 6.2 Create `src/components/InsightLayerControls.tsx`
    - Four toggle buttons (one per `InsightLayerKey`); visually indicate active/inactive state
    - Apply sky blue accent for active toggles per brand theme
    - _Requirements: 7.1, 12.4_

  - [x] 6.3 Create `src/components/InsightItem.tsx` and `InsightLayerPanel.tsx`
    - `InsightItem`: expandable item showing title collapsed, title + description expanded; use `renderWithToolRefs` on description
    - `InsightLayerPanel`: renders list of `InsightItem` components for a given layer
    - _Requirements: 3.3, 4.3, 5.3, 6.3, 8.2_

  - [x] 6.4 Create `src/views/StageDetailView.tsx`
    - Manage `visibleLayers: Record<InsightLayerKey, boolean>` state (default all true)
    - Manage `expandedItems: Set<string>` state per layer
    - Render `StageHeader`, `InsightLayerControls`, and conditionally render `InsightLayerPanel` for each visible layer
    - Reset all layer visibility to default on stage change (new route param)
    - Render `StageNotFound` fallback if `stageId` not in `STAGE_MAP`
    - _Requirements: 2.1, 7.1, 7.2, 7.3, 7.4_

  - [ ]* 6.5 Write property tests for stage panel behavior (Properties 2, 6, 8, 9, 10)
    - **Property 2: Insight item expand/collapse round trip** — `fc.constantFrom(...allInsightItems)` → simulate two clicks, assert state restored
    - **Property 6: Loop stage panels include a cycle indicator** — `fc.constantFrom(...JOURNEY_STAGES)` → render panel, assert indicator presence matches `isLoop`
    - **Property 8: Hidden insight layers are absent from the DOM** — `fc.constantFrom('painPoints','motivations','messagingOpportunities','mediaTouchpoints')` → toggle off, assert content absent
    - **Property 9: Insight layer visibility state preserved across hide/show** — hide layer, show layer, assert expanded set unchanged
    - **Property 10: Stage panel defaults to all layers visible** — fresh render of any stage, assert all 4 layers visible
    - File: `src/__tests__/stagePanel.test.tsx`
    - **Validates: Requirements 2.1, 3.3, 4.3, 5.3, 6.3, 7.2, 7.3, 7.4**

- [x] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Implement Summary View
  - [x] 8.1 Create `src/components/StageSummaryCard.tsx`
    - Render stage number, label, loop badge (sky blue bg, white League Gothic text, dashed border) for loop stages
    - Render one-sentence summary and insight counts ("4 pain points · 3 motivations · 2 messaging · 4 touchpoints")
    - Render friction intensity bar: 5-segment bar, color-coded (`--color-friction-low` → `--color-friction-mid` → `--color-friction-high`)
    - On click, navigate to `#/stage/:stageId`
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 8.2 Create `src/views/SummaryView.tsx`
    - Render responsive grid of all 7 `StageSummaryCard` components
    - Render curved SVG connector arrow (sky blue stroke) between Knowledge_Loop and Experimentation_Loop
    - Responsive grid: 2-col at 1024–1279px, 3–4 col at 1280–1919px, 7-col single row at 1920px+
    - _Requirements: 9.1, 9.4, 10.1_

  - [ ]* 8.3 Write property tests for summary view (Properties 7, 14, 15)
    - **Property 7: Loop stages are visually differentiated in summary cards** — `fc.constantFrom(...JOURNEY_STAGES)` → render card, assert loop badge presence matches `isLoop`
    - **Property 14: Summary view navigation to any stage** — `fc.constantFrom(...JOURNEY_STAGES)` → click card, assert navigation to `#/stage/:stageId`
    - **Property 15: All summary cards render a friction intensity indicator** — `fc.constantFrom(...JOURNEY_STAGES)` → render card, assert friction indicator element present
    - File: `src/__tests__/summaryView.test.tsx`
    - **Validates: Requirements 9.2, 9.3, 9.4**

- [x] 9. Wire routing and application shell
  - [x] 9.1 Create `src/App.tsx` with `HashRouter` and route configuration
    - Route `#/` → `SummaryView`
    - Route `#/stage/:stageId` → `StageDetailView`
    - Redirect `#/stage/` (no id) → `#/`
    - Wrap in `BrandThemeProvider`; render `JourneyNavigator` as persistent rail outside route outlet
    - _Requirements: 1.3, 11.1, 11.2_

  - [x] 9.2 Create `src/main.tsx` entry point
    - Mount `App` into `#root`; import global `brand-theme.css`
    - _Requirements: 11.1_

- [x] 10. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations per property
- All 15 correctness properties from the design document are covered across test files
- Loop stages (`experimentation-loop`, `knowledge-loop`) require special handling in every component layer
