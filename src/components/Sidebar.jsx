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
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-56 bg-[#1B2A4A] text-white
        flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="lg:hidden flex justify-end p-3">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#2A3A5C] transition-colors">
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
                  ? 'bg-[#3D6FE0] text-white shadow-[0_2px_8px_rgba(61,111,224,0.35)]'
                  : 'text-[#B8C0D6] hover:bg-[#2A3A5C] hover:text-white'
                }
              `}
            >
              <Icon size={17} className={activeTab === id ? 'text-white' : 'text-[#7A89AB]'} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#2A3A5C]">
          <div className="text-xs text-[#4A5A7C] font-medium">버전 1.0.0</div>
          <div className="text-xs text-[#4A5A7C]">2026-05-26 갱신</div>
        </div>
      </aside>
    </>
  );
}
