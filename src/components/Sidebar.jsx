import { LayoutDashboard, AlertTriangle, Cpu, BarChart3, ClipboardList, Settings, X } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'alerts', label: '알림/고장 현황', icon: AlertTriangle },
  { id: 'equipment', label: '설비 목록', icon: Cpu },
  { id: 'analytics', label: '통계 분석', icon: BarChart3 },
  { id: 'reports', label: '점검 이력', icon: ClipboardList },
  { id: 'settings', label: '설정', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-56
          flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ background: 'linear-gradient(180deg, #1e2535 0%, #0d1220 100%)' }}
      >
        <div className="lg:hidden flex justify-end p-3 border-b border-white/10">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-2.5 py-4 space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { onTabChange(id); onClose(); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${activeTab === id
                  ? 'bg-[#3D6FE0] text-white shadow-[0_2px_8px_rgba(61,111,224,0.4)]'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <Icon size={17} className={activeTab === id ? 'text-white' : 'text-white/40'} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="text-xs text-white/40 font-medium">버전 1.0.0</div>
          <div className="text-xs text-white/25">2026-05-26 갱신</div>
        </div>
      </aside>
    </>
  );
}
