import { useState } from 'react';
import { equipmentList } from '../data/mockData';
import { EquipmentStatusBadge } from '../components/StatusBadge';
import { Cpu, Search, Thermometer, Activity } from 'lucide-react';

const CARD = 'bg-white rounded-xl border border-[#DDE2EE] shadow-[0_2px_8px_rgba(15,27,51,0.06)]';

function TempBar({ value, max = 100 }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = value >= 90 ? 'bg-red-500' : value >= 70 ? 'bg-amber-400' : 'bg-emerald-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#F0F2F8] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-semibold w-10 text-right ${value >= 90 ? 'text-red-600' : value >= 70 ? 'text-amber-500' : 'text-emerald-600'}`}>
        {value}°C
      </span>
    </div>
  );
}

function LoadBar({ value }) {
  const color = value >= 100 ? 'bg-red-500' : value >= 80 ? 'bg-amber-400' : 'bg-[#3D6FE0]';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#F0F2F8] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className={`text-xs font-semibold w-10 text-right ${value >= 100 ? 'text-red-600' : value >= 80 ? 'text-amber-500' : 'text-[#3D6FE0]'}`}>
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
    const matchType = typeFilter === 'all' || e.type === typeFilter;
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const filterBtn = (active) =>
    active
      ? 'bg-[#3D6FE0] text-white'
      : 'bg-[#F0F2F8] text-[#4A5A7C] hover:bg-[#DDE2EE]';

  const statusFilterBtn = (active) =>
    active
      ? 'bg-[#1B2A4A] text-white'
      : 'bg-[#F0F2F8] text-[#4A5A7C] hover:bg-[#DDE2EE]';

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
          <Cpu size={18} className="text-[#3D6FE0]" />
          설비 목록
        </h2>
        <span className="text-xs text-[#7A89AB] font-medium">{filtered.length} / {equipmentList.length}대</span>
      </div>

      <div className={`${CARD} p-3 space-y-2.5`}>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A89AB]" />
          <input
            type="text"
            placeholder="설비명, ID, 위치 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-[#DDE2EE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D6FE0]/30 focus:border-[#3D6FE0] bg-[#F8F9FC] text-[#0F1B33] placeholder-[#B8C0D6] transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterBtn(typeFilter === t)}`}>
                {t === 'all' ? '전체 유형' : t}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${statusFilterBtn(statusFilter === s)}`}>
                {s === 'all' ? '전체 상태' : s === 'normal' ? '정상' : s === 'warning' ? '경고' : s === 'fault' ? '고장' : '점검중'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F0F2F8] border-b border-[#DDE2EE]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">설비 ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">설비명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden sm:table-cell">유형</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden md:table-cell">위치</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden md:table-cell">전압/용량</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">
                  <span className="flex items-center gap-1"><Thermometer size={12} />온도</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden lg:table-cell">
                  <span className="flex items-center gap-1"><Activity size={12} />부하율</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F8]">
              {filtered.map(eq => (
                <tr key={eq.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[#7A89AB]">{eq.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0F1B33]">{eq.name}</div>
                    <div className="text-xs text-[#7A89AB]">최근점검: {eq.lastCheck}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[#4A5A7C] text-xs">{eq.type}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#4A5A7C] text-xs">{eq.location}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#7A89AB] text-xs">
                    <div>{eq.voltage}</div>
                    <div>{eq.capacity}</div>
                  </td>
                  <td className="px-4 py-3 w-32">
                    {eq.status !== 'maintenance' ? <TempBar value={eq.temp} /> : <span className="text-xs text-[#7A89AB]">-</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell w-32">
                    {eq.status !== 'maintenance' ? <LoadBar value={eq.load} /> : <span className="text-xs text-[#7A89AB]">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <EquipmentStatusBadge status={eq.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-[#7A89AB] text-sm">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
