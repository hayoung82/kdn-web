import { useState } from 'react';
import { alerts } from '../data/mockData';
import { SeverityBadge, AlertStatusBadge } from '../components/StatusBadge';
import { AlertTriangle, Filter } from 'lucide-react';

const CARD = 'bg-white rounded-xl border border-[#DDE2EE] shadow-[0_2px_8px_rgba(15,27,51,0.06)]';

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = alerts.filter(a => {
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSeverity && matchStatus;
  });

  const filterBtn = (active) =>
    active
      ? 'bg-[#1B2A4A] text-white'
      : 'bg-[#F0F2F8] text-[#4A5A7C] hover:bg-[#DDE2EE]';

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          알림 / 고장 현황
        </h2>
        <span className="text-xs text-[#7A89AB] font-medium">총 {filtered.length}건</span>
      </div>

      <div className={`${CARD} p-3 flex flex-wrap gap-3`}>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#7A89AB]" />
          <span className="text-xs text-[#7A89AB] font-medium">심각도:</span>
          {['all', 'critical', 'warning', 'info'].map(v => (
            <button
              key={v}
              onClick={() => setSeverityFilter(v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterBtn(severityFilter === v)}`}
            >
              {v === 'all' ? '전체' : v === 'critical' ? '긴급' : v === 'warning' ? '경고' : '정보'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7A89AB] font-medium">상태:</span>
          {['all', 'active', 'acknowledged', 'resolved'].map(v => (
            <button
              key={v}
              onClick={() => setStatusFilter(v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${filterBtn(statusFilter === v)}`}
            >
              {v === 'all' ? '전체' : v === 'active' ? '활성' : v === 'acknowledged' ? '확인됨' : '해제됨'}
            </button>
          ))}
        </div>
      </div>

      <div className={`${CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F0F2F8] border-b border-[#DDE2EE]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">심각도</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">설비명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden md:table-cell">알림 유형</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">메시지</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden lg:table-cell">위치</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden sm:table-cell">발생시각</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F8]">
              {filtered.map(alert => (
                <tr key={alert.id} className={`hover:bg-[#F8F9FC] transition-colors ${
                  alert.severity === 'critical' && alert.status === 'active' ? 'bg-red-50/40' : ''
                }`}>
                  <td className="px-4 py-3">
                    <SeverityBadge severity={alert.severity} />
                  </td>
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
                  <td className="px-4 py-3">
                    <AlertStatusBadge status={alert.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-[#7A89AB] text-sm">해당 조건의 알림이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
