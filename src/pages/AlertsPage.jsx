import { useState } from 'react';
import { alerts } from '../data/mockData';
import { SeverityBadge, AlertStatusBadge } from '../components/StatusBadge';
import { AlertTriangle, SlidersHorizontal } from 'lucide-react';

const CARD = 'rounded-2xl overflow-hidden';
const CARD_STYLE = { background: '#131829', border: '1px solid #232843' };

function CardHead({ icon: Icon, color, title, extra }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5" style={{ background: '#0d1120', borderBottom: '1px solid #232843' }}>
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: color }} />
        <Icon size={14} style={{ color }} />
        <span className="text-sm font-bold text-[#f4f5f9]">{title}</span>
      </div>
      {extra}
    </div>
  );
}

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = alerts.filter(a => {
    return (severityFilter === 'all' || a.severity === severityFilter) &&
           (statusFilter === 'all' || a.status === statusFilter);
  });

  const btn = (active) => active
    ? { background: 'rgba(124,92,255,0.2)', color: '#a78bfa', border: '1px solid rgba(124,92,255,0.4)' }
    : { background: '#0d1120', color: '#4a5070', border: '1px solid #232843' };

  return (
    <div className="p-6 space-y-5">

      <div className="pb-5 flex items-center justify-between" style={{ borderBottom: '1px solid #232843' }}>
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2.5" style={{ color: '#f4f5f9' }}>
          <AlertTriangle size={20} style={{ color: '#f59e0b' }} />알림 / 고장 현황
        </h2>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: '#969cb1', background: '#0d1120', border: '1px solid #232843' }}>
          {filtered.length}건
        </span>
      </div>

      {/* 필터 */}
      <div className={CARD} style={CARD_STYLE}>
        <CardHead icon={SlidersHorizontal} color="#7c5cff" title="필터" />
        <div className="px-5 py-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold" style={{ color: '#4a5070' }}>심각도</span>
            {['all', 'critical', 'warning', 'info'].map(v => (
              <button key={v} onClick={() => setSeverityFilter(v)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={btn(severityFilter === v)}>
                {v === 'all' ? '전체' : v === 'critical' ? '긴급' : v === 'warning' ? '경고' : '정보'}
              </button>
            ))}
          </div>
          <div className="w-px hidden sm:block" style={{ background: '#232843' }} />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold" style={{ color: '#4a5070' }}>상태</span>
            {['all', 'active', 'acknowledged', 'resolved'].map(v => (
              <button key={v} onClick={() => setStatusFilter(v)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={btn(statusFilter === v)}>
                {v === 'all' ? '전체' : v === 'active' ? '활성' : v === 'acknowledged' ? '확인됨' : '해제됨'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className={CARD} style={CARD_STYLE}>
        <CardHead icon={AlertTriangle} color="#f59e0b" title="알림 목록"
          extra={<span className="text-xs" style={{ color: '#4a5070' }}>총 {filtered.length}건</span>} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid #232843' }}>
                {['심각도', '설비명', '알림 유형', '메시지', '위치', '발생시각', '상태'].map((h, i) => (
                  <th key={h} className={`text-left px-5 py-3 text-xs font-bold ${i === 2 ? 'hidden md:table-cell' : i === 4 ? 'hidden lg:table-cell' : i === 5 ? 'hidden sm:table-cell' : ''}`}
                      style={{ background: '#0d1120', color: '#4a5070' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((alert, i) => (
                <tr key={alert.id}
                    className="transition-colors"
                    style={{ borderBottom: i === filtered.length - 1 ? 'none' : '1px solid #1a1f35' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a1f35'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td className="px-5 py-3.5"><SeverityBadge severity={alert.severity} /></td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-[#f4f5f9]">{alert.equipmentName}</div>
                    <div className="text-xs" style={{ color: '#4a5070' }}>{alert.equipmentId}</div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-xs" style={{ color: '#969cb1' }}>{alert.type}</td>
                  <td className="px-5 py-3.5 max-w-xs">
                    <p className="truncate text-xs" style={{ color: '#969cb1' }}>{alert.message}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-xs" style={{ color: '#4a5070' }}>{alert.location}</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell text-xs whitespace-nowrap" style={{ color: '#4a5070' }}>{alert.timestamp}</td>
                  <td className="px-5 py-3.5"><AlertStatusBadge status={alert.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-14 text-sm" style={{ color: '#4a5070' }}>해당 조건의 알림이 없습니다.</div>
          )}
        </div>
      </div>

    </div>
  );
}
