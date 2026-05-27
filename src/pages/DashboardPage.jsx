import { equipmentList, alerts, hourlyLoadData, alertTrendData } from '../data/mockData';
import { EquipmentStatusBadge, SeverityBadge } from '../components/StatusBadge';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { AlertTriangle, CheckCircle, Wrench, Activity, Zap, Thermometer } from 'lucide-react';

function StatCard({ title, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium">{title}</p>
          <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100').replace('-500', '-100')}`}>
          <Icon size={20} className={color} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const normalCount = equipmentList.filter(e => e.status === 'normal').length;
  const faultCount = equipmentList.filter(e => e.status === 'fault').length;
  const warningCount = equipmentList.filter(e => e.status === 'warning').length;
  const maintenanceCount = equipmentList.filter(e => e.status === 'maintenance').length;

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');

  return (
    <div className="p-4 space-y-5">
      {criticalAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-600" />
            <h2 className="text-sm font-bold text-red-700">긴급 알림 {criticalAlerts.length}건</h2>
          </div>
          <div className="space-y-1.5">
            {criticalAlerts.map(a => (
              <div key={a.id} className="flex items-start gap-2 text-sm text-red-700">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                <span><strong>[{a.equipmentName}]</strong> {a.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="정상 설비" value={normalCount} sub={`전체 ${equipmentList.length}대 중`} icon={CheckCircle} color="text-green-600" />
        <StatCard title="고장 설비" value={faultCount} sub="즉시 조치 필요" icon={AlertTriangle} color="text-red-600" />
        <StatCard title="경고 설비" value={warningCount} sub="점검 권고" icon={Activity} color="text-amber-500" />
        <StatCard title="점검 중" value={maintenanceCount} sub="예방점검 진행" icon={Wrench} color="text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            <Zap size={15} className="text-blue-500" />
            시간별 부하율 추이 (오늘)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 120]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '경보 80%', fontSize: 11, fill: '#f59e0b' }} />
              <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '긴급 100%', fontSize: 11, fill: '#ef4444' }} />
              <Line type="monotone" dataKey="부하율" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            <AlertTriangle size={15} className="text-amber-500" />
            최근 7일 알림 추이
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alertTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="긴급" fill="#ef4444" stackId="a" />
              <Bar dataKey="경고" fill="#f59e0b" stackId="a" />
              <Bar dataKey="정보" fill="#3b82f6" stackId="a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">활성 알림</h3>
        <div className="space-y-2">
          {activeAlerts.map(alert => (
            <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
              alert.severity === 'critical' ? 'bg-red-50 border-red-100' :
              alert.severity === 'warning' ? 'bg-amber-50 border-amber-100' :
              'bg-blue-50 border-blue-100'
            }`}>
              <SeverityBadge severity={alert.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800">{alert.equipmentName}</p>
                <p className="text-xs text-slate-600 mt-0.5">{alert.message}</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">{alert.timestamp.split(' ')[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
          <Thermometer size={15} className="text-orange-500" />
          설비 온도 현황 (상위 6개)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {equipmentList
            .filter(e => e.status !== 'maintenance')
            .sort((a, b) => b.temp - a.temp)
            .slice(0, 6)
            .map(eq => (
              <div key={eq.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-slate-700">{eq.name}</p>
                  <p className="text-xs text-slate-400">{eq.id}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${eq.temp >= 90 ? 'text-red-600' : eq.temp >= 70 ? 'text-amber-500' : 'text-green-600'}`}>
                    {eq.temp}°C
                  </span>
                  <EquipmentStatusBadge status={eq.status} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
