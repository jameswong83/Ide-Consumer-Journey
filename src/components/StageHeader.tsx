import React from 'react';
import type { JourneyStage } from '../types/journey';

interface StageHeaderProps {
  stage: JourneyStage;
}

function LoopIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}
    >
      <path
        d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8"
        stroke="var(--color-brand-blue)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polyline
        points="20,4 20,9 15,9"
        stroke="var(--color-brand-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StageHeader({ stage }: StageHeaderProps) {
  return (
    <header
      style={{
        padding: 'var(--space-lg) var(--space-xl)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-major)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--color-text-primary)',
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {stage.label}
      </h1>
      {stage.isLoop && (
        <p
          aria-label="Cyclical stage — this phase repeats"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'var(--space-sm)',
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: 'var(--text-body)',
            color: 'var(--color-brand-blue)',
          }}
        >
          <LoopIcon />
          Cyclical Stage — this phase repeats
        </p>
      )}
    </header>
  );
}
