import { Bell, Zap, Menu, RefreshCw, LogOut, UserCircle } from 'lucide-react';
import { alerts } from '../data/mockData';

export default function Header({ onMenuClick, user, onLogout }) {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const warningCount = activeAlerts.filter(a => a.severity === 'warning').length;

  return (
    <header
      className="text-white px-4 py-3 flex items-center justify-between z-50"
      style={{ background: '#0d1120', borderBottom: '1px solid #232843' }}
    >
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 transition-colors">
          <Menu size={20} className="text-[#969cb1]" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg shadow-md flex-shrink-0" style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-tight text-[#f4f5f9]">
              KDN <span style={{ color: '#7c5cff' }}>전력설비</span>
              <span className="text-[#969cb1] font-normal"> 현황 대시보드</span>
            </h1>
            <p className="text-[10px] text-[#4a5070]">전력관리시스템</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold animate-pulse"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
              긴급 {criticalCount}건
            </span>
          )}
          {warningCount > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              경고 {warningCount}건
            </span>
          )}
        </div>

        <button className="flex items-center gap-1.5 text-[#4a5070] hover:text-[#969cb1] text-xs transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5">
          <RefreshCw size={13} />
          <span className="hidden sm:inline">새로고침</span>
        </button>

        <button className="relative p-1.5 rounded-lg hover:bg-white/5 transition-colors">
          <Bell size={17} className="text-[#969cb1]" />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
              {activeAlerts.length}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 text-xs border-l pl-3" style={{ borderColor: '#232843' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00d3a7' }} />
          <span className="hidden md:inline text-[#4a5070]">실시간 연결중</span>
        </div>

        {user && (
          <div className="flex items-center gap-2 border-l pl-3" style={{ borderColor: '#232843' }}>
            <div className="flex items-center gap-1.5 text-xs text-[#969cb1]">
              <UserCircle size={15} className="text-[#4a5070]" />
              <span className="hidden sm:inline">{user.name}</span>
            </div>
            <button onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-[#4a5070] hover:text-[#969cb1]"
              title="로그아웃">
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
