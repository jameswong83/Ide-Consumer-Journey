import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { JOURNEY_STAGES } from '../data/journeyStages';
import { StageSummaryCard } from '../components/StageSummaryCard';

/**
 * Curved SVG connector arrow between Experimentation_Loop (order 4)
 * and Knowledge_Loop (order 7), rendered as an overlay.
 */
function LoopConnectorArrow() {
  return (
    <svg
      aria-label="Cyclical connection between Experimentation Loop and Knowledge Loop"
      data-testid="loop-connector-arrow"
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: '-32px',
        left: '0',
        right: '0',
        width: '100%',
        height: '60px',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {/* Curved path from right side back to left — represents the loop */}
      <path
        d="M 380 10 C 380 50, 20 50, 20 10"
        fill="none"
        stroke="var(--color-brand-blue)"
        strokeWidth="2"
        strokeDasharray="6 3"
      />
      {/* Arrowhead pointing left at the start (Experimentation Loop end) */}
      <polygon
        points="20,10 28,5 28,15"
        fill="var(--color-brand-blue)"
      />
    </svg>
  );
}

export function SummaryView() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        background: 'var(--color-background)',
        padding: 'var(--space-xl)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-major)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-lg)',
        }}
      >
        Developer IDE Consumer Journey
      </h1>

      {/* Responsive grid with loop connector overlay */}
      <div style={{ position: 'relative' }}>
        <div
          data-testid="summary-grid"
          style={{
            display: 'grid',
            gap: 'var(--space-md)',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
          className="summary-grid"
        >
          {JOURNEY_STAGES.map((stage) => (
            <StageSummaryCard
              key={stage.id}
              stage={stage}
              onClick={() => navigate(`/stage/${stage.id}`)}
            />
          ))}
        </div>

        {/* SVG connector between the two loop stages */}
        <LoopConnectorArrow />
      </div>

      <style>{`
        @media (max-width: 767px) {
          .summary-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .summary-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          .summary-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1280px) and (max-width: 1919px) {
          .summary-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1920px) {
          .summary-grid {
            grid-template-columns: repeat(7, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
