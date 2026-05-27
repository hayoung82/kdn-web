import { useState } from 'react';
import { alerts } from '../data/mockData';
import { SeverityBadge, AlertStatusBadge } from '../components/StatusBadge';
import { AlertTriangle, Filter } from 'lucide-react';

const GLASS = 'bg-white/75 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(15,27,51,0.12)]';

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = alerts.filter(a => {
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSeverity && matchStatus;
  });

  const filterBtn = (active) =>
    active ? 'bg-[#1B2A4A] text-white shadow-sm'
           : 'bg-white/60 text-[#4A5A7C] hover:bg-white/90 border border-white/60';

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          알림 / 고장 현황
        </h2>
        <span className="text-xs text-[#4A5A7C] font-medium bg-white/60 px-2.5 py-1 rounded-full border border-white/60">
          총 {filtered.length}건
        </span>
      </div>

      {/* 필터 */}
      <div className={`${GLASS} p-4 flex flex-wrap gap-3`}>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-[#7A89AB]" />
          <span className="text-xs text-[#7A89AB] font-semibold">심각도</span>
          {['all', 'critical', 'warning', 'info'].map(v => (
            <button key={v} onClick={() => setSeverityFilter(v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${filterBtn(severityFilter === v)}`}>
              {v === 'all' ? '전체' : v === 'critical' ? '긴급' : v === 'warning' ? '경고' : '정보'}
            </button>
          ))}
        </div>
        <div className="w-px bg-black/10 hidden sm:block" />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#7A89AB] font-semibold">상태</span>
          {['all', 'active', 'acknowledged', 'resolved'].map(v => (
            <button key={v} onClick={() => setStatusFilter(v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${filterBtn(statusFilter === v)}`}>
              {v === 'all' ? '전체' : v === 'active' ? '활성' : v === 'acknowledged' ? '확인됨' : '해제됨'}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 — overflow-hidden 없이, 테이블 자체에 여백 확보 */}
      <div className={GLASS}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black/5">
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 first:rounded-tl-xl">심각도</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">설비명</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden md:table-cell">알림 유형</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">메시지</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden lg:table-cell">위치</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden sm:table-cell">발생시각</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 last:rounded-tr-xl">상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((alert, i) => (
                <tr key={alert.id}
                  className={`border-b border-black/[0.04] hover:bg-white/40 transition-colors ${
                    alert.severity === 'critical' && alert.status === 'active' ? 'bg-red-50/30' : ''
                  } ${i === filtered.length - 1 ? 'last:border-b-0' : ''}`}>
                  <td className="px-4 py-3"><SeverityBadge severity={alert.severity} /></td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0F1B33]">{alert.equipmentName}</div>
                    <div className="text-xs text-[#7A89AB]">{alert.equipmentId}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#4A5A7C] text-xs">{alert.type}</td>
                  <td className="px-4 py-3 text-[#4A5A7C] max-w-xs">
                    <p className="truncate text-xs">{alert.message}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#7A89AB] text-xs">{alert.location}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[#7A89AB] text-xs whitespace-nowrap">{alert.timestamp}</td>
                  <td className="px-4 py-3"><AlertStatusBadge status={alert.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#7A89AB] text-sm">해당 조건의 알림이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
