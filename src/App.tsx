import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import BrandThemeProvider from './components/BrandThemeProvider';
import { JourneyNavigator } from './components/JourneyNavigator';
import { SummaryView } from './views/SummaryView';
import { StageDetailView } from './views/StageDetailView';
import { JOURNEY_STAGES } from './data/journeyStages';

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active stage from the current URL path
  const match = location.pathname.match(/^\/stage\/(.+)$/);
  const activeStageId = match ? match[1] : null;

  function handleSelectStage(id: string) {
    navigate(`/stage/${id}`);
  }

  function handleNavigateSummary() {
    navigate('/');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
      <JourneyNavigator
        stages={JOURNEY_STAGES}
        activeStageId={activeStageId}
        onSelectStage={handleSelectStage}
        onNavigateSummary={handleNavigateSummary}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<SummaryView />} />
          <Route path="/stage/:stageId" element={<StageDetailView />} />
          <Route path="/stage/" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrandThemeProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </BrandThemeProvider>
  );
}
