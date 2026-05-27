import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import EquipmentPage from './pages/EquipmentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import { Settings } from 'lucide-react';

function SettingsPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-black tracking-tight mb-4 flex items-center gap-2" style={{ color: '#f4f5f9' }}>
        <Settings size={20} style={{ color: '#7c5cff' }} />설정
      </h2>
      <div className="rounded-2xl p-6 text-sm" style={{ background: '#131829', border: '1px solid #232843', color: '#4a5070' }}>
        설정 페이지 (준비 중)
      </div>
    </div>
  );
}

const pages = {
  dashboard: DashboardPage,
  alerts: AlertsPage,
  equipment: EquipmentPage,
  analytics: AnalyticsPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (authLoading) {
    return <div className="min-h-screen" style={{ background: '#0b0e17' }} />;
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  const PageComponent = pages[activeTab] || DashboardPage;

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
