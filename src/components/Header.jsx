import { Bell, Zap, Menu, RefreshCw } from 'lucide-react';
import { alerts } from '../data/mockData';

export default function Header({ onMenuClick }) {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.severity === 'warning').length;

  return (
    <header className="bg-[#0F1B33] text-white px-4 py-3 flex items-center justify-between shadow-[0_4px_12px_rgba(15,27,51,0.25)] z-50">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-[#1B2A4A] transition-colors">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="bg-[#3D6FE0] p-1.5 rounded-lg">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-tight">전력설비 현황 대시보드</h1>
            <p className="text-xs text-[#7A89AB] font-medium">KDN 전력관리시스템</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-sm">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1.5 bg-red-600/90 px-2.5 py-1 rounded-full text-xs font-semibold animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              긴급 {criticalCount}건
            </span>
          )}
          {warningCount > 0 && (
            <span className="flex items-center gap-1.5 bg-amber-500/90 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              경고 {warningCount}건
            </span>
          )}
        </div>

        <button className="flex items-center gap-1.5 text-[#7A89AB] hover:text-white text-xs transition-colors px-2 py-1.5 rounded-lg hover:bg-[#1B2A4A]">
          <RefreshCw size={14} />
          <span className="hidden sm:inline">새로고침</span>
        </button>

        <button className="relative p-1.5 rounded-lg hover:bg-[#1B2A4A] transition-colors">
          <Bell size={18} className="text-[#B8C0D6]" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
              {activeAlerts.length}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-[#7A89AB] border-l border-[#2A3A5C] pl-3">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="hidden md:inline">실시간 연결중</span>
        </div>
      </div>
    </header>
  );
}
