import { useState } from 'react';
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

  const btnStyle = (enabled: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '10px',
    minHeight: '44px',
    background: enabled ? 'var(--color-brand-blue)' : 'var(--color-surface-alt)',
    color: enabled ? 'var(--color-text-on-blue)' : 'var(--color-text-secondary)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    opacity: enabled ? 1 : 0.5,
  });

  return (
    <div style={{ display: 'flex', gap: '6px', padding: '8px 12px' }}>
      <button onClick={() => canPrev && onSelectStage(sorted[activeIndex - 1].id)} disabled={!canPrev} aria-label="Previous stage" style={btnStyle(canPrev)}>← Prev</button>
      <button onClick={() => canNext && onSelectStage(sorted[activeIndex + 1].id)} disabled={!canNext} aria-label="Next stage" style={btnStyle(canNext)}>Next →</button>
    </div>
  );
}

export function JourneyNavigator({ stages, activeStageId, onSelectStage, onNavigateSummary }: JourneyNavigatorProps) {
  const sorted = [...stages].sort((a, b) => a.order - b.order);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeStage = activeStageId ? sorted.find(s => s.id === activeStageId) : null;
  const menuLabel = activeStage ? activeStage.label : 'Overview';

  return (
    <>
      <style>{`
        .journey-navigator {
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: relative;
          z-index: 100;
        }
        .nav-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          min-height: 48px;
        }
        .nav-mobile-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-primary);
          padding: 8px 0;
          min-height: 44px;
        }
        .nav-hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 20px;
        }
        .nav-hamburger span {
          display: block;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
        }
        .nav-mobile-items {
          display: none;
          flex-direction: column;
          border-top: 1px solid var(--color-border);
          max-height: 60vh;
          overflow-y: auto;
        }
        .nav-mobile-items.open {
          display: flex;
        }
        @media (min-width: 1024px) {
          .journey-navigator {
            width: 240px;
            min-width: 240px;
            border-bottom: none;
            border-right: 1px solid var(--color-border);
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow-y: auto;
          }
          .nav-mobile-header {
            display: none;
          }
          .nav-mobile-items {
            display: flex !important;
            flex-direction: column;
            flex: 1;
            max-height: none;
            border-top: none;
          }
          .nav-desktop-overview {
            display: block !important;
          }
          .nav-arrows-wrap {
            margin-top: auto;
          }
        }
        .nav-desktop-overview {
          display: none;
        }
      `}</style>
      <nav aria-label="Journey stages" className="journey-navigator">
        {/* Mobile header with hamburger */}
        <div className="nav-mobile-header">
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(o => !o)} aria-expanded={mobileOpen}>
            <div className="nav-hamburger"><span /><span /><span /></div>
            {menuLabel}
          </button>
          <NavArrows stages={stages} activeStageId={activeStageId} onSelectStage={(id) => { onSelectStage(id); setMobileOpen(false); }} />
        </div>

        {/* Desktop overview button */}
        <button
          className="nav-desktop-overview"
          onClick={onNavigateSummary}
          aria-current={activeStageId === null ? 'page' : undefined}
          style={{
            padding: '10px 12px',
            minHeight: '44px',
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
            width: '100%',
          }}
        >
          Overview
        </button>

        {/* Nav items — hidden on mobile unless open */}
        <div className={`nav-mobile-items${mobileOpen ? ' open' : ''}`}>
          {/* Mobile overview */}
          <button
            onClick={() => { onNavigateSummary(); setMobileOpen(false); }}
            aria-current={activeStageId === null ? 'page' : undefined}
            style={{
              padding: '12px 16px',
              minHeight: '44px',
              background: activeStageId === null ? 'var(--color-brand-blue)' : 'transparent',
              color: activeStageId === null ? 'var(--color-text-on-blue)' : 'var(--color-text-secondary)',
              border: 'none',
              borderBottom: '1px solid var(--color-border)',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              textTransform: 'uppercase',
              textAlign: 'left',
              width: '100%',
            }}
          >
            Overview
          </button>
          {sorted.map(stage => (
            <StageNavItem
              key={stage.id}
              stage={stage}
              isActive={stage.id === activeStageId}
              isLoop={stage.isLoop}
              onClick={() => { onSelectStage(stage.id); setMobileOpen(false); }}
            />
          ))}
        </div>

        {/* Desktop nav arrows */}
        <div className="nav-arrows-wrap" style={{ display: 'none' }}>
          <NavArrows stages={stages} activeStageId={activeStageId} onSelectStage={onSelectStage} />
        </div>
      </nav>
    </>
  );
}
