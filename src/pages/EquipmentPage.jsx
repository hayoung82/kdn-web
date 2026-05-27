import { useState } from 'react';
import { equipmentList } from '../data/mockData';
import { EquipmentStatusBadge } from '../components/StatusBadge';
import { Cpu, Search, Thermometer, Activity, SlidersHorizontal } from 'lucide-react';

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

function TempBar({ value }) {
  const pct = Math.min((value / 100) * 100, 100);
  const color = value >= 90 ? '#ef4444' : value >= 70 ? '#f59e0b' : '#00d3a7';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#1a1f35' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold w-10 text-right tabular-nums" style={{ color }}>{value}°C</span>
    </div>
  );
}

function LoadBar({ value }) {
  const color = value >= 100 ? '#ef4444' : value >= 80 ? '#f59e0b' : '#7c5cff';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#1a1f35' }}>
        <div className="h-full rounded-full" style={{ width: `${Math.min(value, 100)}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold w-10 text-right tabular-nums" style={{ color }}>{value}%</span>
    </div>
  );
}

export default function EquipmentPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const types = ['all', ...new Set(equipmentList.map(e => e.type))];
  const statuses = ['all', 'normal', 'warning', 'fault', 'maintenance'];

  const filtered = equipmentList.filter(e => {
    const matchSearch = e.name.includes(search) || e.id.includes(search) || e.location.includes(search);
    return matchSearch && (typeFilter === 'all' || e.type === typeFilter) && (statusFilter === 'all' || e.status === statusFilter);
  });

  const btn = (active) => active
    ? { background: 'rgba(124,92,255,0.2)', color: '#a78bfa', border: '1px solid rgba(124,92,255,0.4)' }
    : { background: '#0d1120', color: '#4a5070', border: '1px solid #232843' };

  return (
    <div className="p-6 space-y-5">

      <div className="pb-5 flex items-center justify-between" style={{ borderBottom: '1px solid #232843' }}>
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2.5" style={{ color: '#f4f5f9' }}>
          <Cpu size={20} style={{ color: '#7c5cff' }} />설비 목록
        </h2>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: '#969cb1', background: '#0d1120', border: '1px solid #232843' }}>
          {filtered.length} / {equipmentList.length}대
        </span>
      </div>

      {/* 필터 */}
      <div className={CARD} style={CARD_STYLE}>
        <CardHead icon={SlidersHorizontal} color="#7c5cff" title="검색 및 필터" />
        <div className="px-5 py-4 space-y-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4a5070' }} />
            <input type="text" placeholder="설비명, ID, 위치 검색..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
              style={{ background: '#0d1120', border: '1px solid #232843', color: '#f4f5f9' }}
              onFocus={e => { e.target.style.borderColor = '#7c5cff'; e.target.style.boxShadow = '0 0 0 3px rgba(124,92,255,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#232843'; e.target.style.boxShadow = 'none'; }} />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid #1a1f35' }}>
            <span className="text-xs font-bold self-center mr-1" style={{ color: '#4a5070' }}>유형</span>
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                style={btn(typeFilter === t)}>
                {t === 'all' ? '전체' : t}
              </button>
            ))}
            <div className="w-px mx-1 self-stretch" style={{ background: '#232843' }} />
            <span className="text-xs font-bold self-center mr-1" style={{ color: '#4a5070' }}>상태</span>
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                style={btn(statusFilter === s)}>
                {s === 'all' ? '전체' : s === 'normal' ? '정상' : s === 'warning' ? '경고' : s === 'fault' ? '고장' : '점검중'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className={CARD} style={CARD_STYLE}>
        <CardHead icon={Cpu} color="#7c5cff" title="설비 현황"
          extra={<span className="text-xs" style={{ color: '#4a5070' }}>{filtered.length}대</span>} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '1px solid #232843' }}>
                <th className="text-left px-5 py-3 text-xs font-bold" style={{ background: '#0d1120', color: '#4a5070' }}>ID</th>
                <th className="text-left px-5 py-3 text-xs font-bold" style={{ background: '#0d1120', color: '#4a5070' }}>설비명</th>
                <th className="text-left px-5 py-3 text-xs font-bold hidden sm:table-cell" style={{ background: '#0d1120', color: '#4a5070' }}>유형</th>
                <th className="text-left px-5 py-3 text-xs font-bold hidden md:table-cell" style={{ background: '#0d1120', color: '#4a5070' }}>위치</th>
                <th className="text-left px-5 py-3 text-xs font-bold hidden md:table-cell" style={{ background: '#0d1120', color: '#4a5070' }}>전압/용량</th>
                <th className="text-left px-5 py-3 text-xs font-bold" style={{ background: '#0d1120', color: '#4a5070' }}>
                  <span className="flex items-center gap-1"><Thermometer size={12} />온도</span>
                </th>
                <th className="text-left px-5 py-3 text-xs font-bold hidden lg:table-cell" style={{ background: '#0d1120', color: '#4a5070' }}>
                  <span className="flex items-center gap-1"><Activity size={12} />부하율</span>
                </th>
                <th className="text-left px-5 py-3 text-xs font-bold" style={{ background: '#0d1120', color: '#4a5070' }}>상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((eq, i) => (
                <tr key={eq.id}
                    className="transition-colors"
                    style={{ borderBottom: i === filtered.length - 1 ? 'none' : '1px solid #1a1f35' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a1f35'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td className="px-5 py-3.5 font-mono text-xs" style={{ color: '#4a5070' }}>{eq.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold" style={{ color: '#f4f5f9' }}>{eq.name}</div>
                    <div className="text-xs" style={{ color: '#4a5070' }}>최근점검: {eq.lastCheck}</div>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell text-xs" style={{ color: '#969cb1' }}>{eq.type}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-xs" style={{ color: '#969cb1' }}>{eq.location}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell text-xs" style={{ color: '#4a5070' }}>
                    <div>{eq.voltage}</div><div>{eq.capacity}</div>
                  </td>
                  <td className="px-5 py-3.5 w-36">
                    {eq.status !== 'maintenance' ? <TempBar value={eq.temp} /> : <span className="text-xs" style={{ color: '#2e3450' }}>-</span>}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell w-36">
                    {eq.status !== 'maintenance' ? <LoadBar value={eq.load} /> : <span className="text-xs" style={{ color: '#2e3450' }}>-</span>}
                  </td>
                  <td className="px-5 py-3.5"><EquipmentStatusBadge status={eq.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-14 text-sm" style={{ color: '#4a5070' }}>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>

    </div>
  );
}
