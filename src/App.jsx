import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import EquipmentPage from './pages/EquipmentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import { Settings } from 'lucide-react';

function SettingsPage() {
  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
        <Settings size={18} className="text-slate-500" />
        설정
      </h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-sm text-slate-500">
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PageComponent = pages[activeTab] || DashboardPage;

  return (
    <div className="flex flex-col h-screen bg-[#F0F2F8]">
      <Header onMenuClick={() => setSidebarOpen(true)} />
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
