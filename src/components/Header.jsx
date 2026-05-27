import { Bell, Zap, Menu, RefreshCw, LogOut, UserCircle } from 'lucide-react';
import { alerts } from '../data/mockData';

export default function Header({ onMenuClick, user, onLogout }) {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.severity === 'warning').length;

  return (
    <header
      className="text-white px-4 py-3 flex items-center justify-between z-50 shadow-lg"
      style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1B33 50%, #0A1428 100%)' }}
    >
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="bg-[#3D6FE0] p-1.5 rounded-lg shadow-md">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-tight">
              <span className="text-white">KDN</span>
              <span className="text-[#93C5FD]"> 전력설비</span>
              <span className="text-white/70 font-normal"> 현황 대시보드</span>
            </h1>
            <p className="text-xs text-white/50 font-medium">전력관리시스템</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1.5 bg-red-500 px-2.5 py-1 rounded-full text-xs font-semibold animate-pulse shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              긴급 {criticalCount}건
            </span>
          )}
          {warningCount > 0 && (
            <span className="flex items-center gap-1.5 bg-amber-500 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              경고 {warningCount}건
            </span>
          )}
        </div>

        <button className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs transition-colors px-2 py-1.5 rounded-lg hover:bg-white/10">
          <RefreshCw size={14} />
          <span className="hidden sm:inline">새로고침</span>
        </button>

        <button className="relative p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <Bell size={18} className="text-white/70" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold shadow">
              {activeAlerts.length}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs text-white/50 border-l border-white/10 pl-3">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="hidden md:inline">실시간 연결중</span>
        </div>

        {user && (
          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <UserCircle size={16} className="text-white/50" />
              <span className="hidden sm:inline">{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              title="로그아웃"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
