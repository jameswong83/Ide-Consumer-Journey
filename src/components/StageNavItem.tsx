import React from 'react';
import type { JourneyStage } from '../types/journey';

export interface StageNavItemProps {
  stage: JourneyStage;
  isActive: boolean;
  isLoop: boolean;
  onClick: () => void;
}

export function StageNavItem({ stage, isActive, isLoop, onClick }: StageNavItemProps) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
        padding: '8px 12px',
        background: isActive ? 'var(--color-brand-blue)' : 'transparent',
        color: isActive ? 'var(--color-text-on-blue)' : 'var(--color-text-primary)',
        border: 'none',
        borderLeft: isLoop ? '3px solid var(--color-brand-blue)' : '3px solid transparent',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-body)',
        fontWeight: isActive ? 600 : 400,
        transition: 'background 0.15s, color 0.15s',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {stage.label}
      </span>
      {isLoop && (
        <span
          aria-label="cyclical stage"
          title="Cyclical stage"
          style={{ fontSize: '14px', flexShrink: 0, color: isActive ? 'var(--color-text-on-blue)' : 'var(--color-brand-blue)' }}
        >
          ↻
        </span>
      )}
    </button>
  );
}
