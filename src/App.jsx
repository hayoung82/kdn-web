import { useState } from 'react';
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
    <div className="p-4">
      <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2 mb-4">
        <Settings size={18} className="text-[#7A89AB]" />
        설정
      </h2>
      <div className="bg-white/75 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(15,27,51,0.12)] p-6 text-sm text-[#7A89AB]">
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  const PageComponent = pages[activeTab] || DashboardPage;

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <Header onMenuClick={() => setSidebarOpen(true)} user={user} onLogout={() => setUser(null)} />
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
