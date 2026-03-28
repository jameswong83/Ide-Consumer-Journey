/**
 * Data integrity tests for journeyStages.ts
 * Validates: Requirements 3.1, 4.1, 5.1, 6.1, 6.2, 8.1
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { JOURNEY_STAGES, STAGE_MAP, IDE_TOOLS } from '../data/journeyStages';
import type { MediaChannelCategory } from '../types/journey';

const VALID_CHANNEL_CATEGORIES: MediaChannelCategory[] = [
  'social', 'owned', 'earned', 'in-product', 'community', 'event',
];

// Collect all touchpoints across all stages
const allTouchpoints = JOURNEY_STAGES.flatMap(s => s.insights.mediaTouchpoints);

describe('Journey data integrity', () => {
  it('exports 7 stages', () => {
    expect(JOURNEY_STAGES).toHaveLength(7);
  });

  it('STAGE_MAP contains all stage ids', () => {
    for (const stage of JOURNEY_STAGES) {
      expect(STAGE_MAP[stage.id]).toBe(stage);
    }
  });

  it('stages have sequential order values 1–7', () => {
    const orders = JOURNEY_STAGES.map(s => s.order).sort((a, b) => a - b);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('exactly two stages are loop stages', () => {
    const loopStages = JOURNEY_STAGES.filter(s => s.isLoop);
    expect(loopStages).toHaveLength(2);
    const loopIds = loopStages.map(s => s.id);
    expect(loopIds).toContain('experimentation-loop');
    expect(loopIds).toContain('knowledge-loop');
  });

  // Property 1: All stages meet minimum insight content counts
  it('Property 1: all stages meet minimum insight content counts', () => {
    // Feature: developer-ide-consumer-journey, Property 1: All stages meet minimum insight content counts
    fc.assert(
      fc.property(fc.constantFrom(...JOURNEY_STAGES), (stage) => {
        expect(stage.insights.painPoints.length).toBeGreaterThanOrEqual(3);
        expect(stage.insights.motivations.length).toBeGreaterThanOrEqual(3);
        expect(stage.insights.messagingOpportunities.length).toBeGreaterThanOrEqual(2);
        expect(stage.insights.mediaTouchpoints.length).toBeGreaterThanOrEqual(3);
      }),
      { numRuns: 100 }
    );
  });

  // Property 11: All media touchpoints have a valid channel category
  it('Property 11: all media touchpoints have a valid channel category', () => {
    // Feature: developer-ide-consumer-journey, Property 11: All media touchpoints have a valid channel category
    fc.assert(
      fc.property(fc.constantFrom(...allTouchpoints), (touchpoint) => {
        expect(VALID_CHANNEL_CATEGORIES).toContain(touchpoint.channelCategory);
      }),
      { numRuns: 100 }
    );
  });

  // Property 13: Journey content references at least five distinct IDE tools
  it('Property 13: journey content references at least five distinct IDE tools', () => {
    // Feature: developer-ide-consumer-journey, Property 13: Journey content references at least five distinct IDE tools
    const allContent = JOURNEY_STAGES.flatMap(stage => [
      ...stage.insights.painPoints.flatMap(i => [i.title, i.description]),
      ...stage.insights.motivations.flatMap(i => [i.title, i.description]),
      ...stage.insights.messagingOpportunities.flatMap(i => [i.title, i.description]),
      ...stage.insights.mediaTouchpoints.flatMap(i => [i.title, i.description]),
    ]).join(' ');

    const foundTools = IDE_TOOLS.filter(tool => allContent.includes(tool));
    expect(foundTools.length).toBeGreaterThanOrEqual(5);
  });
});
