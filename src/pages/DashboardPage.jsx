import { equipmentList, alerts, hourlyLoadData, alertTrendData } from '../data/mockData';
import { EquipmentStatusBadge, SeverityBadge } from '../components/StatusBadge';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { AlertTriangle, CheckCircle, Wrench, Activity, Zap, Thermometer } from 'lucide-react';

const GLASS = 'bg-white/75 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(15,27,51,0.12)]';
const DIVIDER = <div className="border-t border-black/5 my-4" />;
const tooltipStyle = { borderColor: 'rgba(255,255,255,0.6)', borderRadius: 10, fontSize: 12, background: 'rgba(255,255,255,0.95)' };

function SectionTitle({ icon: Icon, iconColor, children }) {
  return (
    <h3 className="text-sm font-bold text-[#0F1B33] flex items-center gap-2">
      <span className="inline-block w-1 h-4 rounded-full flex-shrink-0" style={{ background: iconColor }} />
      <Icon size={15} style={{ color: iconColor }} />
      {children}
    </h3>
  );
}

function StatCard({ title, value, sub, icon: Icon, gradient }) {
  return (
    <div className="rounded-xl p-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] overflow-hidden relative" style={{ background: gradient }}>
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 20%, white, transparent 60%)' }} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium opacity-80">{title}</p>
          <p className="text-3xl font-black mt-1 tracking-tight">{value}</p>
          {sub && <p className="text-xs opacity-60 mt-1">{sub}</p>}
        </div>
        <div className="p-2.5 rounded-lg bg-white/20">
          <Icon size={22} className="text-white" />
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
    <div className="p-5 space-y-6">
      {criticalAlerts.length > 0 && (
        <div className="rounded-xl p-4 border border-red-200/60 shadow-[0_4px_16px_rgba(239,68,68,0.15)]"
          style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-600" />
            <h2 className="text-sm font-bold text-red-700">긴급 알림 {criticalAlerts.length}건</h2>
          </div>
          {criticalAlerts.map(a => (
            <div key={a.id} className="flex items-start gap-2 text-sm text-red-700 mt-1.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span><strong>[{a.equipmentName}]</strong> {a.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="정상 설비" value={normalCount} sub={`전체 ${equipmentList.length}대 중`} icon={CheckCircle}
          gradient="linear-gradient(135deg, #059669 0%, #10b981 100%)" />
        <StatCard title="고장 설비" value={faultCount} sub="즉시 조치 필요" icon={AlertTriangle}
          gradient="linear-gradient(135deg, #dc2626 0%, #ef4444 100%)" />
        <StatCard title="경고 설비" value={warningCount} sub="점검 권고" icon={Activity}
          gradient="linear-gradient(135deg, #d97706 0%, #f59e0b 100%)" />
        <StatCard title="점검 중" value={maintenanceCount} sub="예방점검 진행" icon={Wrench}
          gradient="linear-gradient(135deg, #2A5CD0 0%, #3D6FE0 100%)" />
      </div>

      {/* 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={`${GLASS} p-5`}>
          <SectionTitle icon={Zap} iconColor="#3D6FE0">시간별 부하율 추이 (오늘)</SectionTitle>
          {DIVIDER}
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={hourlyLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,27,51,0.08)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 120]} unit="%" tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={tooltipStyle} />
              <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '경보 80%', fontSize: 10, fill: '#f59e0b', position: 'insideTopRight' }} />
              <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '긴급 100%', fontSize: 10, fill: '#ef4444', position: 'insideTopRight' }} />
              <Line type="monotone" dataKey="부하율" stroke="#3D6FE0" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${GLASS} p-5`}>
          <SectionTitle icon={AlertTriangle} iconColor="#f59e0b">최근 7일 알림 추이</SectionTitle>
          {DIVIDER}
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={alertTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,27,51,0.08)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="긴급" fill="#ef4444" stackId="a" />
              <Bar dataKey="경고" fill="#f59e0b" stackId="a" />
              <Bar dataKey="정보" fill="#3D6FE0" stackId="a" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 활성 알림 */}
      <div className={`${GLASS} p-5`}>
        <SectionTitle icon={AlertTriangle} iconColor="#ef4444">활성 알림</SectionTitle>
        {DIVIDER}
        <div className="space-y-2">
          {activeAlerts.map(alert => (
            <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
              alert.severity === 'critical' ? 'bg-red-50/80 border-red-200/60' :
              alert.severity === 'warning' ? 'bg-amber-50/80 border-amber-200/60' :
              'bg-blue-50/80 border-blue-200/60'
            }`}>
              <SeverityBadge severity={alert.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0F1B33]">{alert.equipmentName}</p>
                <p className="text-xs text-[#4A5A7C] mt-0.5">{alert.message}</p>
              </div>
              <span className="text-xs text-[#7A89AB] flex-shrink-0 pt-0.5">{alert.timestamp.split(' ')[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 온도 현황 */}
      <div className={`${GLASS} p-5`}>
        <SectionTitle icon={Thermometer} iconColor="#f97316">설비 온도 현황 (상위 6개)</SectionTitle>
        {DIVIDER}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {equipmentList
            .filter(e => e.status !== 'maintenance')
            .sort((a, b) => b.temp - a.temp)
            .slice(0, 6)
            .map(eq => (
              <div key={eq.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-white/70">
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-semibold text-[#0F1B33] truncate">{eq.name}</p>
                  <p className="text-xs text-[#7A89AB]">{eq.id}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${eq.temp >= 90 ? 'text-red-600' : eq.temp >= 70 ? 'text-amber-500' : 'text-emerald-600'}`}>
                    {eq.temp}°C
                  </p>
                  <div className="mt-0.5"><EquipmentStatusBadge status={eq.status} /></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
