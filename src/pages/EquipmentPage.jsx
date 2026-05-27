import { useState } from 'react';
import { equipmentList } from '../data/mockData';
import { EquipmentStatusBadge } from '../components/StatusBadge';
import { Cpu, Search, Thermometer, Activity } from 'lucide-react';

function TempBar({ value, max = 100 }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = value >= 90 ? 'bg-red-500' : value >= 70 ? 'bg-amber-400' : 'bg-green-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-medium w-10 text-right ${value >= 90 ? 'text-red-600' : value >= 70 ? 'text-amber-500' : 'text-green-600'}`}>
        {value}°C
      </span>
    </div>
  );
}

function LoadBar({ value }) {
  const color = value >= 100 ? 'bg-red-500' : value >= 80 ? 'bg-amber-400' : 'bg-blue-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className={`text-xs font-medium w-10 text-right ${value >= 100 ? 'text-red-600' : value >= 80 ? 'text-amber-500' : 'text-blue-600'}`}>
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

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Cpu size={18} className="text-blue-500" />
          설비 목록
        </h2>
        <span className="text-xs text-slate-500">{filtered.length} / {equipmentList.length}대</span>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="설비명, ID, 위치 검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${typeFilter === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {t === 'all' ? '전체 유형' : t}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${statusFilter === s ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {s === 'all' ? '전체 상태' : s === 'normal' ? '정상' : s === 'warning' ? '경고' : s === 'fault' ? '고장' : '점검중'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">설비 ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">설비명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden sm:table-cell">유형</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden md:table-cell">위치</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden md:table-cell">전압/용량</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><Thermometer size={12} />온도</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden lg:table-cell">
                  <span className="flex items-center gap-1"><Activity size={12} />부하율</span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(eq => (
                <tr key={eq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{eq.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{eq.name}</div>
                    <div className="text-xs text-slate-400">최근점검: {eq.lastCheck}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-600 text-xs">{eq.type}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-xs">{eq.location}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-xs">
                    <div>{eq.voltage}</div>
                    <div>{eq.capacity}</div>
                  </td>
                  <td className="px-4 py-3 w-32">
                    {eq.status !== 'maintenance' ? <TempBar value={eq.temp} /> : <span className="text-xs text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell w-32">
                    {eq.status !== 'maintenance' ? <LoadBar value={eq.load} /> : <span className="text-xs text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <EquipmentStatusBadge status={eq.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
