/**
 * Tests for StageDetailView and related panel components
 * Validates: Requirements 2.1, 3.3, 4.3, 5.3, 6.3, 7.2, 7.3, 7.4
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as fc from 'fast-check';
import { StageDetailView } from '../views/StageDetailView';
import { JOURNEY_STAGES } from '../data/journeyStages';
import type { InsightLayerKey } from '../types/journey';

const LAYER_KEYS: InsightLayerKey[] = [
  'painPoints',
  'motivations',
  'messagingOpportunities',
  'mediaTouchpoints',
];

// Labels used in InsightLayerControls toggle buttons
const LAYER_TOGGLE_LABELS: Record<InsightLayerKey, string> = {
  painPoints: 'Pain Points',
  motivations: 'Motivations',
  messagingOpportunities: 'Messaging',
  mediaTouchpoints: 'Media Touchpoints',
};

// Labels used in InsightLayerPanel section aria-labels
const LAYER_HEADINGS: Record<InsightLayerKey, string> = {
  painPoints: 'Pain Points',
  motivations: 'Motivations',
  messagingOpportunities: 'Messaging Opportunities',
  mediaTouchpoints: 'Media Touchpoints',
};

function renderStageDetail(stageId: string) {
  return render(
    <MemoryRouter initialEntries={[`/stage/${stageId}`]}>
      <Routes>
        <Route path="/stage/:stageId" element={<StageDetailView />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('StageDetailView', () => {
  // Property 10: Stage panel defaults to all layers visible
  it('Property 10: stage panel defaults to all layers visible', () => {
    // Feature: developer-ide-consumer-journey, Property 10: Stage panel defaults to all layers visible
    fc.assert(
      fc.property(fc.constantFrom(...JOURNEY_STAGES), (stage) => {
        const { unmount, container } = renderStageDetail(stage.id);
        for (const layer of LAYER_KEYS) {
          const region = container.querySelector(`[aria-label="${LAYER_HEADINGS[layer]}"]`);
          expect(region).toBeTruthy();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Property 8: Hidden insight layers are absent from the DOM
  it('Property 8: toggling a layer off removes it from the DOM', () => {
    // Feature: developer-ide-consumer-journey, Property 8: Hidden insight layers are absent from the DOM
    fc.assert(
      fc.property(fc.constantFrom(...LAYER_KEYS), (layer) => {
        const stage = JOURNEY_STAGES[0];
        const { unmount, container } = renderStageDetail(stage.id);

        // Find the toggle button for this layer — use getAllByRole and pick first to avoid
        // multiple-element errors when fast-check runs multiple iterations in the same DOM
        const toggleBtns = screen.getAllByRole('button', { name: new RegExp(`^${LAYER_TOGGLE_LABELS[layer]}$`) });
        fireEvent.click(toggleBtns[0]);

        // The layer section should no longer be in the DOM
        const region = container.querySelector(`[aria-label="${LAYER_HEADINGS[layer]}"]`);
        expect(region).toBeNull();

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('toggling a layer off then on restores it', () => {
    const stage = JOURNEY_STAGES[0];
    renderStageDetail(stage.id);

    const toggleBtn = screen.getByRole('button', { name: 'Pain Points' });
    fireEvent.click(toggleBtn); // hide
    expect(screen.queryByRole('region', { name: 'Pain Points' })).toBeNull();

    fireEvent.click(toggleBtn); // show again
    expect(screen.getByRole('region', { name: 'Pain Points' })).toBeTruthy();
  });

  // Property 6: Loop stage panels include a cycle indicator
  it('Property 6: loop stage panels include a cycle indicator', () => {
    // Feature: developer-ide-consumer-journey, Property 6: Loop stage panels include a cycle indicator
    fc.assert(
      fc.property(fc.constantFrom(...JOURNEY_STAGES), (stage) => {
        const { unmount, container } = renderStageDetail(stage.id);
        const cyclicalIndicator = container.querySelector('[aria-label="Cyclical stage — this phase repeats"]');
        if (stage.isLoop) {
          expect(cyclicalIndicator).toBeTruthy();
        } else {
          expect(cyclicalIndicator).toBeNull();
        }
        unmount();
      }),
      { numRuns: 100 }
    );
  });

  // Property 2: Insight item expand/collapse round trip
  it('Property 2: insight item expand/collapse round trip', () => {
    // Feature: developer-ide-consumer-journey, Property 2: Insight item expand/collapse round trip
    const stage = JOURNEY_STAGES[0];
    renderStageDetail(stage.id);

    // Get all expandable buttons (insight items)
    const expandButtons = screen.getAllByRole('button', { name: stage.insights.painPoints[0].title });
    const btn = expandButtons[0];

    // Initially collapsed
    expect(btn.getAttribute('aria-expanded')).toBe('false');

    // Click to expand
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('true');

    // Click to collapse — round trip
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  // Property 9: Insight layer visibility state preserved across hide/show
  it('Property 9: expanded items are preserved when layer is hidden and shown', () => {
    // Feature: developer-ide-consumer-journey, Property 9: Insight layer visibility state preserved across hide/show
    const stage = JOURNEY_STAGES[0];
    renderStageDetail(stage.id);

    // Expand the first pain point item
    const itemBtn = screen.getByRole('button', { name: stage.insights.painPoints[0].title });
    fireEvent.click(itemBtn);
    expect(itemBtn.getAttribute('aria-expanded')).toBe('true');

    // Hide the pain points layer
    const layerToggle = screen.getByRole('button', { name: 'Pain Points' });
    fireEvent.click(layerToggle);
    expect(screen.queryByRole('region', { name: 'Pain Points' })).toBeNull();

    // Show the pain points layer again
    fireEvent.click(layerToggle);

    // The item should still be expanded
    const itemBtnAfter = screen.getByRole('button', { name: stage.insights.painPoints[0].title });
    expect(itemBtnAfter.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders StageNotFound for unknown stageId', () => {
    render(
      <MemoryRouter initialEntries={['/stage/nonexistent-stage']}>
        <Routes>
          <Route path="/stage/:stageId" element={<StageDetailView />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/stage not found/i)).toBeTruthy();
  });
});
