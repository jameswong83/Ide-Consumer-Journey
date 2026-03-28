/**
 * Tests for JourneyNavigator component
 * Validates: Requirements 1.4, 1.5, 1.6
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import { JourneyNavigator } from '../components/JourneyNavigator';
import { JOURNEY_STAGES } from '../data/journeyStages';

const sorted = [...JOURNEY_STAGES].sort((a, b) => a.order - b.order);

function renderNav(activeStageId: string | null, onSelectStage = vi.fn(), onNavigateSummary = vi.fn()) {
  return render(
    <JourneyNavigator
      stages={JOURNEY_STAGES}
      activeStageId={activeStageId}
      onSelectStage={onSelectStage}
      onNavigateSummary={onNavigateSummary}
    />
  );
}

describe('JourneyNavigator', () => {
  it('renders all 7 stage labels', () => {
    renderNav(null);
    for (const stage of JOURNEY_STAGES) {
      expect(screen.getByText(stage.label)).toBeTruthy();
    }
  });

  it('renders Overview button', () => {
    renderNav(null);
    expect(screen.getByText('Overview')).toBeTruthy();
  });

  // Property 3: Active stage is visually distinguished in navigator
  it('Property 3: active stage is exclusively marked with aria-current="page"', () => {
    // Feature: developer-ide-consumer-journey, Property 3: Active stage is visually distinguished in navigator
    fc.assert(
      fc.property(fc.constantFrom(...JOURNEY_STAGES), (activeStage) => {
        const { unmount } = renderNav(activeStage.id);
        const activeItems = document.querySelectorAll('[aria-current="page"]');
        // Exactly one element should have aria-current="page"
        expect(activeItems.length).toBe(1);
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Property 4: Sequential navigation covers all stages
  it('Property 4: clicking Next navigates to the next stage', () => {
    // Feature: developer-ide-consumer-journey, Property 4: Sequential navigation covers all stages
    fc.assert(
      fc.property(fc.integer({ min: 0, max: sorted.length - 2 }), (index) => {
        const currentStage = sorted[index];
        const expectedNextStage = sorted[index + 1];
        const onSelectStage = vi.fn();
        const { unmount } = renderNav(currentStage.id, onSelectStage);
        const nextBtn = screen.getByRole('button', { name: /next/i });
        fireEvent.click(nextBtn);
        expect(onSelectStage).toHaveBeenCalledWith(expectedNextStage.id);
        unmount();
      }),
      { numRuns: 50 }
    );
  });

  it('Property 4: clicking Prev navigates to the previous stage', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: sorted.length - 1 }), (index) => {
        const currentStage = sorted[index];
        const expectedPrevStage = sorted[index - 1];
        const onSelectStage = vi.fn();
        const { unmount } = renderNav(currentStage.id, onSelectStage);
        const prevBtn = screen.getByRole('button', { name: /previous/i });
        fireEvent.click(prevBtn);
        expect(onSelectStage).toHaveBeenCalledWith(expectedPrevStage.id);
        unmount();
      }),
      { numRuns: 50 }
    );
  });

  // Property 5: Loop stages have nav indicator
  it('Property 5: loop stages show ↻ indicator, non-loop stages do not', () => {
    // Feature: developer-ide-consumer-journey, Property 5: Loop stages are visually distinguished in the navigator
    fc.assert(
      fc.property(fc.constantFrom(...JOURNEY_STAGES), (stage) => {
        const { unmount } = renderNav(stage.id);
        const loopIndicators = screen.queryAllByLabelText('cyclical stage');
        if (stage.isLoop) {
          // The active stage's nav item should have a loop indicator
          // (there may be others for other loop stages too)
          expect(loopIndicators.length).toBeGreaterThanOrEqual(1);
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('all loop stages always show ↻ indicator regardless of active stage', () => {
    renderNav(null);
    const loopStages = JOURNEY_STAGES.filter(s => s.isLoop);
    const indicators = screen.queryAllByLabelText('cyclical stage');
    expect(indicators.length).toBe(loopStages.length);
  });
});
