import React from 'react';
import type { JourneyStage } from '../types/journey';

export interface StageSummaryCardProps {
  stage: JourneyStage;
  onClick: () => void;
}

const FRICTION_COLORS = [
  'var(--color-friction-low)',  // segment 1
  'var(--color-friction-low)',  // segment 2
  'var(--color-friction-mid)',  // segment 3
  'var(--color-friction-high)', // segment 4
  'var(--color-friction-high)', // segment 5
];

function FrictionBar({ intensity }: { intensity: number }) {
  return (
    <div
      aria-label={`Friction intensity: ${intensity} of 5`}
      data-testid="friction-bar"
      style={{ display: 'flex', gap: '3px', marginTop: 'var(--space-sm)' }}
    >
      {FRICTION_COLORS.map((color, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '6px',
            borderRadius: '3px',
            background: i < intensity ? color : 'var(--color-surface-alt)',
          }}
        />
      ))}
    </div>
  );
}

export function StageSummaryCard({ stage, onClick }: StageSummaryCardProps) {
  const { painPoints, motivations, messagingOpportunities, mediaTouchpoints } = stage.insights;

  const insightCounts = [
    `${painPoints.length} pain points`,
    `${motivations.length} motivations`,
    `${messagingOpportunities.length} messaging`,
    `${mediaTouchpoints.length} touchpoints`,
  ].join(' · ');

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      data-testid="stage-summary-card"
      style={{
        background: 'var(--color-surface)',
        border: stage.isLoop
          ? '2px dashed var(--color-brand-blue)'
          : '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: 'var(--space-md)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Stage number + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-minor)',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.04em',
          }}
        >
          {stage.order}.
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-minor)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          {stage.label}
        </h2>
        {stage.isLoop && (
          <span
            data-testid="loop-badge"
            aria-label="Loop stage"
            style={{
              background: 'var(--color-brand-blue)',
              color: 'var(--color-text-on-blue)',
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '2px 8px',
              borderRadius: '3px',
              border: '1px dashed rgba(255,255,255,0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            Loop ↻
          </span>
        )}
      </div>

      {/* Summary */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          margin: 'var(--space-sm) 0 0',
          lineHeight: 1.5,
        }}
      >
        {stage.summary}
      </p>

      {/* Insight counts */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          margin: 'var(--space-sm) 0 0',
          opacity: 0.75,
        }}
      >
        {insightCounts}
      </p>

      {/* Friction bar */}
      <FrictionBar intensity={stage.frictionIntensity} />
    </article>
  );
}
