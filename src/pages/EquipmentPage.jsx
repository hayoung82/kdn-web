import { useState } from 'react';
import { equipmentList } from '../data/mockData';
import { EquipmentStatusBadge } from '../components/StatusBadge';
import { Cpu, Search, Thermometer, Activity } from 'lucide-react';

const GLASS = 'bg-white/75 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(15,27,51,0.12)]';
const inputCls = 'w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-white/50 bg-white/50 text-[#0F1B33] placeholder-[#B8C0D6] focus:outline-none focus:ring-2 focus:ring-[#3D6FE0]/30 focus:border-[#3D6FE0] transition-all';

function TempBar({ value }) {
  const pct = Math.min((value / 100) * 100, 100);
  const color = value >= 90 ? 'bg-red-500' : value >= 70 ? 'bg-amber-400' : 'bg-emerald-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-semibold w-10 text-right tabular-nums ${value >= 90 ? 'text-red-600' : value >= 70 ? 'text-amber-500' : 'text-emerald-600'}`}>
        {value}°C
      </span>
    </div>
  );
}

function LoadBar({ value }) {
  const color = value >= 100 ? 'bg-red-500' : value >= 80 ? 'bg-amber-400' : 'bg-[#3D6FE0]';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className={`text-xs font-semibold w-10 text-right tabular-nums ${value >= 100 ? 'text-red-600' : value >= 80 ? 'text-amber-500' : 'text-[#3D6FE0]'}`}>
        {value}%
      </span>
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

  const typeBtn  = (a) => a ? 'bg-[#3D6FE0] text-white shadow-sm' : 'bg-white/60 text-[#4A5A7C] hover:bg-white/90 border border-white/60';
  const statBtn  = (a) => a ? 'bg-[#1B2A4A] text-white shadow-sm' : 'bg-white/60 text-[#4A5A7C] hover:bg-white/90 border border-white/60';

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
          <Cpu size={18} className="text-[#3D6FE0]" />
          설비 목록
        </h2>
        <span className="text-xs text-[#4A5A7C] font-medium bg-white/60 px-2.5 py-1 rounded-full border border-white/60">
          {filtered.length} / {equipmentList.length}대
        </span>
      </div>

      {/* 필터 */}
      <div className={`${GLASS} p-4 space-y-3`}>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A89AB]" />
          <input type="text" placeholder="설비명, ID, 위치 검색..." value={search}
            onChange={e => setSearch(e.target.value)} className={inputCls} />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-black/5">
          <span className="text-xs text-[#7A89AB] font-semibold self-center mr-1">유형</span>
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${typeBtn(typeFilter === t)}`}>
              {t === 'all' ? '전체' : t}
            </button>
          ))}
          <div className="w-px bg-black/10 mx-1 self-stretch" />
          <span className="text-xs text-[#7A89AB] font-semibold self-center mr-1">상태</span>
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${statBtn(statusFilter === s)}`}>
              {s === 'all' ? '전체' : s === 'normal' ? '정상' : s === 'warning' ? '경고' : s === 'fault' ? '고장' : '점검중'}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 */}
      <div className={GLASS}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black/5">
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 first:rounded-tl-xl">ID</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">설비명</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden sm:table-cell">유형</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden md:table-cell">위치</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden md:table-cell">전압/용량</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">
                  <span className="flex items-center gap-1"><Thermometer size={12} />온도</span>
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden lg:table-cell">
                  <span className="flex items-center gap-1"><Activity size={12} />부하율</span>
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 last:rounded-tr-xl">상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((eq, i) => (
                <tr key={eq.id}
                  className={`border-b border-black/[0.04] hover:bg-white/40 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3 font-mono text-xs text-[#7A89AB]">{eq.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0F1B33]">{eq.name}</div>
                    <div className="text-xs text-[#7A89AB]">최근점검: {eq.lastCheck}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[#4A5A7C] text-xs">{eq.type}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#4A5A7C] text-xs">{eq.location}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#7A89AB] text-xs">
                    <div>{eq.voltage}</div><div>{eq.capacity}</div>
                  </td>
                  <td className="px-4 py-3 w-36">
                    {eq.status !== 'maintenance' ? <TempBar value={eq.temp} /> : <span className="text-xs text-[#B8C0D6]">-</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell w-36">
                    {eq.status !== 'maintenance' ? <LoadBar value={eq.load} /> : <span className="text-xs text-[#B8C0D6]">-</span>}
                  </td>
                  <td className="px-4 py-3"><EquipmentStatusBadge status={eq.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#7A89AB] text-sm">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
