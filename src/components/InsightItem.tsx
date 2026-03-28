import type { InsightItem as InsightItemType } from '../types/journey';
import { renderWithToolRefs } from '../utils/renderWithToolRefs';

export interface InsightItemProps {
  item: InsightItemType;
  isExpanded: boolean;
  onToggle: () => void;
}

export function InsightItem({ item, isExpanded, onToggle }: InsightItemProps) {
  return (
    <li
      style={{
        borderBottom: '1px solid var(--color-border)',
        listStyle: 'none',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-sm) var(--space-md)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-body)',
          fontWeight: 'bold',
          color: 'var(--color-text-primary)',
          textAlign: 'left',
        }}
      >
        <span>{item.title}</span>
        <span
          aria-hidden="true"
          style={{
            fontSize: '10px',
            color: 'var(--color-text-secondary)',
            marginLeft: 'var(--space-sm)',
            flexShrink: 0,
          }}
        >
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>
      {isExpanded && (
        <p
          style={{
            margin: 0,
            padding: '0 var(--space-md) var(--space-sm)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {renderWithToolRefs(item.description)}
        </p>
      )}
    </li>
  );
}
