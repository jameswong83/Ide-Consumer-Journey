import type { JourneyStage } from '../types/journey';
import { StageNavItem } from './StageNavItem';

export interface JourneyNavigatorProps {
  stages: JourneyStage[];
  activeStageId: string | null;
  onSelectStage: (id: string) => void;
  onNavigateSummary: () => void;
}

interface NavArrowsProps {
  stages: JourneyStage[];
  activeStageId: string | null;
  onSelectStage: (id: string) => void;
}

function NavArrows({ stages, activeStageId, onSelectStage }: NavArrowsProps) {
  const sorted = [...stages].sort((a, b) => a.order - b.order);
  const activeIndex = activeStageId ? sorted.findIndex(s => s.id === activeStageId) : -1;

  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < sorted.length - 1;

  const buttonStyle = (enabled: boolean): React.CSSProperties => ({
    padding: '6px 10px',
    background: enabled ? 'var(--color-brand-blue)' : 'var(--color-surface-alt)',
    color: enabled ? 'var(--color-text-on-blue)' : 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    opacity: enabled ? 1 : 0.5,
    transition: 'background 0.15s',
  });

  return (
    <div style={{ display: 'flex', gap: '6px', padding: '8px 12px' }}>
      <button
        onClick={() => canPrev && onSelectStage(sorted[activeIndex - 1].id)}
        disabled={!canPrev}
        aria-label="Previous stage"
        style={buttonStyle(canPrev)}
      >
        ← Prev
      </button>
      <button
        onClick={() => canNext && onSelectStage(sorted[activeIndex + 1].id)}
        disabled={!canNext}
        aria-label="Next stage"
        style={buttonStyle(canNext)}
      >
        Next →
      </button>
    </div>
  );
}

export function JourneyNavigator({
  stages,
  activeStageId,
  onSelectStage,
  onNavigateSummary,
}: JourneyNavigatorProps) {
  const sorted = [...stages].sort((a, b) => a.order - b.order);

  const navStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    overflowY: 'auto',
  };

  // Responsive styles injected via a <style> tag
  return (
    <>
      <style>{`
        .journey-navigator {
          width: 100%;
          flex-direction: row !important;
          flex-wrap: wrap;
          border-right: none !important;
          border-bottom: 1px solid var(--color-border);
          overflow-x: auto;
          overflow-y: hidden !important;
        }
        .journey-navigator .nav-items {
          display: flex;
          flex-direction: row;
          flex: 1;
          overflow-x: auto;
        }
        .journey-navigator .nav-arrows {
          display: flex;
          flex-direction: row;
        }
        @media (min-width: 1280px) {
          .journey-navigator {
            width: 240px !important;
            min-width: 240px;
            flex-direction: column !important;
            border-right: 1px solid var(--color-border) !important;
            border-bottom: none !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
          }
          .journey-navigator .nav-items {
            flex-direction: column;
          }
          .journey-navigator .nav-arrows {
            flex-direction: row;
          }
        }
      `}</style>
      <nav
        aria-label="Journey stages"
        className="journey-navigator"
        style={navStyle}
      >
        <button
          onClick={onNavigateSummary}
          aria-current={activeStageId === null ? 'page' : undefined}
          style={{
            padding: '8px 12px',
            background: activeStageId === null ? 'var(--color-brand-blue)' : 'transparent',
            color: activeStageId === null ? 'var(--color-text-on-blue)' : 'var(--color-text-secondary)',
            border: 'none',
            borderBottom: '1px solid var(--color-border)',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            fontSize: '11px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
        >
          Overview
        </button>
        <div className="nav-items" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {sorted.map(stage => (
            <StageNavItem
              key={stage.id}
              stage={stage}
              isActive={stage.id === activeStageId}
              isLoop={stage.isLoop}
              onClick={() => onSelectStage(stage.id)}
            />
          ))}
        </div>
        <div className="nav-arrows">
          <NavArrows
            stages={stages}
            activeStageId={activeStageId}
            onSelectStage={onSelectStage}
          />
        </div>
      </nav>
    </>
  );
}
