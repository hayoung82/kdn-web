import { useState } from 'react';
import { alerts } from '../data/mockData';
import { SeverityBadge, AlertStatusBadge } from '../components/StatusBadge';
import { AlertTriangle, Filter } from 'lucide-react';

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = alerts.filter(a => {
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSeverity && matchStatus;
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          알림 / 고장 현황
        </h2>
        <span className="text-xs text-slate-500">총 {filtered.length}건</span>
      </div>

      <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">심각도:</span>
          {['all', 'critical', 'warning', 'info'].map(v => (
            <button
              key={v}
              onClick={() => setSeverityFilter(v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                severityFilter === v
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {v === 'all' ? '전체' : v === 'critical' ? '긴급' : v === 'warning' ? '경고' : '정보'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">상태:</span>
          {['all', 'active', 'acknowledged', 'resolved'].map(v => (
            <button
              key={v}
              onClick={() => setStatusFilter(v)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                statusFilter === v
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {v === 'all' ? '전체' : v === 'active' ? '활성' : v === 'acknowledged' ? '확인됨' : '해제됨'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">심각도</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">설비명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden md:table-cell">알림 유형</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">메시지</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden lg:table-cell">위치</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 hidden sm:table-cell">발생시각</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(alert => (
                <tr key={alert.id} className={`hover:bg-slate-50 transition-colors ${
                  alert.severity === 'critical' && alert.status === 'active' ? 'bg-red-50/30' : ''
                }`}>
                  <td className="px-4 py-3">
                    <SeverityBadge severity={alert.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{alert.equipmentName}</div>
                    <div className="text-xs text-slate-400">{alert.equipmentId}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-600">{alert.type}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs">
                    <p className="truncate">{alert.message}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-500 text-xs">{alert.location}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-500 text-xs whitespace-nowrap">{alert.timestamp}</td>
                  <td className="px-4 py-3">
                    <AlertStatusBadge status={alert.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">해당 조건의 알림이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
