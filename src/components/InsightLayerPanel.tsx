import type { InsightLayerKey, InsightItem as InsightItemType } from '../types/journey';
import { InsightItem } from './InsightItem';

export interface InsightLayerPanelProps {
  layer: InsightLayerKey;
  items: InsightItemType[];
  expandedItems: Set<string>;
  onToggleItem: (id: string) => void;
}

const LAYER_HEADINGS: Record<InsightLayerKey, string> = {
  painPoints: 'Pain Points',
  motivations: 'Motivations',
  messagingOpportunities: 'Messaging Opportunities',
  mediaTouchpoints: 'Media Touchpoints',
};

export function InsightLayerPanel({ layer, items, expandedItems, onToggleItem }: InsightLayerPanelProps) {
  return (
    <section
      aria-label={LAYER_HEADINGS[layer]}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <h2
        style={{
          margin: 0,
          padding: 'var(--space-sm) var(--space-md)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-minor)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--color-text-primary)',
          background: 'var(--color-surface-alt)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {LAYER_HEADINGS[layer]}
      </h2>
      <ul style={{ margin: 0, padding: 0 }}>
        {items.map(item => (
          <InsightItem
            key={item.id}
            item={item}
            isExpanded={expandedItems.has(item.id)}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </ul>
    </section>
  );
}
