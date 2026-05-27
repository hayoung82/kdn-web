import { LayoutDashboard, AlertTriangle, Cpu, BarChart3, ClipboardList, Settings, X } from 'lucide-react';

const navGroups = [
  {
    label: '메인',
    items: [
      { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    ],
  },
  {
    label: '운영 현황',
    items: [
      { id: 'alerts', label: '알림/고장 현황', icon: AlertTriangle },
      { id: 'equipment', label: '설비 목록', icon: Cpu },
      { id: 'reports', label: '점검 이력', icon: ClipboardList },
    ],
  },
  {
    label: '분석',
    items: [
      { id: 'analytics', label: '통계 분석', icon: BarChart3 },
    ],
  },
  {
    label: '시스템',
    items: [
      { id: 'settings', label: '설정', icon: Settings },
    ],
  },
];

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
      )}
      <aside
        className="fixed lg:static inset-y-0 left-0 z-50 w-56 flex flex-col transition-transform duration-300"
        style={{ background: '#0d1120', borderRight: '1px solid #232843' }}
      >
        <style>{`
          @media (max-width: 1023px) {
            aside { transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'}; }
          }
        `}</style>

        {/* 모바일 닫기 */}
        <div className="lg:hidden flex justify-end px-3 pt-3">
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors" style={{ color: '#4a5070' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = ''}>
            <X size={16} />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 px-2.5 py-4 space-y-1">
          {navGroups.map((group, gi) => (
            <div key={group.label}>
              {gi > 0 && <div className="my-3 mx-1" style={{ borderTop: '1px solid #1a1f35' }} />}
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#2e3450' }}>
                {group.label}
              </p>
              {group.items.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { onTabChange(id); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                  style={activeTab === id ? {
                    background: 'rgba(124,92,255,0.18)',
                    color: '#a78bfa',
                    borderLeft: '3px solid #7c5cff',
                    paddingLeft: '9px',
                  } : { color: '#4a5070' }}
                  onMouseEnter={e => { if (activeTab !== id) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#969cb1'; }}}
                  onMouseLeave={e => { if (activeTab !== id) { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#4a5070'; }}}
                >
                  <Icon size={16} style={{ color: activeTab === id ? '#7c5cff' : '#4a5070' }} />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* 하단 */}
        <div className="px-4 py-3.5" style={{ borderTop: '1px solid #232843' }}>
          <div className="text-[11px] font-medium" style={{ color: '#4a5070' }}>버전 1.0.0</div>
          <div className="text-[10px] mt-0.5" style={{ color: '#2e3450' }}>© 2026 KDN</div>
        </div>
      </aside>
    </>
  );
}
