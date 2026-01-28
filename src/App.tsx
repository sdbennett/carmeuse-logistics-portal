import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Layout } from './components/Layout';
import { ScheduleByQuarry } from './components/ScheduleByQuarry';
import { CustomerDelayReport } from './components/CustomerDelayReport';
import { DailyVesselLineup } from './components/DailyVesselLineup';
import { ScheduleByCustomer } from './components/ScheduleByCustomer';
import { MetricsDashboard } from './components/MetricsDashboard';
import { Box, CircularProgress } from '@mui/material';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'schedule' | 'delay-report' | 'vessel-lineup' | 'schedule-customer' | 'metrics'>('metrics');

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: '#f5f7fa',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'metrics' ? (
        <MetricsDashboard />
      ) : currentView === 'schedule' ? (
        <ScheduleByQuarry />
      ) : currentView === 'delay-report' ? (
        <CustomerDelayReport />
      ) : currentView === 'vessel-lineup' ? (
        <DailyVesselLineup />
      ) : (
        <ScheduleByCustomer />
      )}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
