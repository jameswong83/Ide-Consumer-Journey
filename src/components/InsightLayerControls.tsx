import type { InsightLayerKey } from '../types/journey';

export interface InsightLayerControlsProps {
  visibleLayers: Record<InsightLayerKey, boolean>;
  onToggle: (layer: InsightLayerKey) => void;
}

const LAYER_LABELS: Record<InsightLayerKey, string> = {
  painPoints: 'Pain Points',
  motivations: 'Motivations',
  messagingOpportunities: 'Messaging',
  mediaTouchpoints: 'Media Touchpoints',
};

const LAYER_KEYS: InsightLayerKey[] = [
  'painPoints',
  'motivations',
  'messagingOpportunities',
  'mediaTouchpoints',
];

export function InsightLayerControls({ visibleLayers, onToggle }: InsightLayerControlsProps) {
  return (
    <div
      role="group"
      aria-label="Toggle insight layers"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-sm)',
        padding: 'var(--space-md) var(--space-xl)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      {LAYER_KEYS.map(layer => {
        const isActive = visibleLayers[layer];
        return (
          <button
            key={layer}
            onClick={() => onToggle(layer)}
            aria-pressed={isActive}
            style={{
              padding: '6px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              fontWeight: isActive ? 'bold' : 'normal',
              background: isActive ? 'var(--color-brand-blue)' : 'var(--color-surface-alt)',
              color: isActive ? 'var(--color-text-on-blue)' : 'var(--color-text-secondary)',
              border: `1px solid ${isActive ? 'var(--color-brand-blue)' : 'var(--color-border)'}`,
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s, border-color 0.15s',
            }}
          >
            {LAYER_LABELS[layer]}
          </button>
        );
      })}
    </div>
  );
}
