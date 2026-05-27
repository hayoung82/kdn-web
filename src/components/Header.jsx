import { Bell, Zap, Menu, RefreshCw } from 'lucide-react';
import { alerts } from '../data/mockData';

export default function Header({ onMenuClick }) {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.severity === 'warning').length;

  return (
    <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-lg z-50">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1 rounded hover:bg-slate-700">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-1.5 rounded">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">전력설비 현황 대시보드</h1>
            <p className="text-xs text-slate-400">KDN 전력관리시스템</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 text-sm">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1 bg-red-600 px-2.5 py-1 rounded-full text-xs font-semibold animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              긴급 {criticalCount}건
            </span>
          )}
          {warningCount > 0 && (
            <span className="flex items-center gap-1 bg-amber-500 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              경고 {warningCount}건
            </span>
          )}
        </div>

        <button className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors">
          <RefreshCw size={14} />
          <span className="hidden sm:inline">새로고침</span>
        </button>

        <button className="relative p-1.5 rounded hover:bg-slate-700 transition-colors">
          <Bell size={18} />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
              {activeAlerts.length}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="hidden md:inline">실시간 연결중</span>
        </div>
      </div>
    </header>
  );
}
