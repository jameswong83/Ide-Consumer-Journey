import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { InsightLayerKey } from '../types/journey';
import { STAGE_MAP } from '../data/journeyStages';
import { StageHeader } from '../components/StageHeader';
import { InsightLayerControls } from '../components/InsightLayerControls';
import { InsightLayerPanel } from '../components/InsightLayerPanel';

const LAYER_KEYS: InsightLayerKey[] = [
  'painPoints',
  'motivations',
  'messagingOpportunities',
  'mediaTouchpoints',
];

const DEFAULT_VISIBLE_LAYERS: Record<InsightLayerKey, boolean> = {
  painPoints: true,
  motivations: true,
  messagingOpportunities: true,
  mediaTouchpoints: true,
};

function StageNotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-major)',
          textTransform: 'uppercase',
          color: 'var(--color-text-primary)',
        }}
      >
        Stage Not Found
      </h2>
      <p>The requested stage does not exist.</p>
      <Link
        to="/"
        style={{
          color: 'var(--color-brand-blue)',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        ← Back to Overview
      </Link>
    </div>
  );
}

export function StageDetailView() {
  const { stageId } = useParams<{ stageId: string }>();

  const [visibleLayers, setVisibleLayers] = useState<Record<InsightLayerKey, boolean>>(
    { ...DEFAULT_VISIBLE_LAYERS }
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Reset layer visibility and expanded items when stage changes
  useEffect(() => {
    setVisibleLayers({ ...DEFAULT_VISIBLE_LAYERS });
    setExpandedItems(new Set());
  }, [stageId]);

  const stage = stageId ? STAGE_MAP[stageId] : undefined;

  if (!stage) {
    return <StageNotFound />;
  }

  function handleToggleLayer(layer: InsightLayerKey) {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  }

  function handleToggleItem(id: string) {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const layerItems: Record<InsightLayerKey, typeof stage.insights.painPoints> = {
    painPoints: stage.insights.painPoints,
    motivations: stage.insights.motivations,
    messagingOpportunities: stage.insights.messagingOpportunities,
    mediaTouchpoints: stage.insights.mediaTouchpoints,
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
        background: 'var(--color-background)',
      }}
    >
      <StageHeader stage={stage} />
      <InsightLayerControls visibleLayers={visibleLayers} onToggle={handleToggleLayer} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
          gap: 'var(--space-md)',
          padding: 'var(--space-lg) var(--space-xl)',
        }}
      >
        {LAYER_KEYS.filter(layer => visibleLayers[layer]).map(layer => (
          <InsightLayerPanel
            key={layer}
            layer={layer}
            items={layerItems[layer]}
            expandedItems={expandedItems}
            onToggleItem={handleToggleItem}
          />
        ))}
      </div>
    </div>
  );
}
