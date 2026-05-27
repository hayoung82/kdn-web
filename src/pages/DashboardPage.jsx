import { equipmentList, alerts, hourlyLoadData, alertTrendData } from '../data/mockData';
import { EquipmentStatusBadge, SeverityBadge } from '../components/StatusBadge';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { AlertTriangle, CheckCircle, Wrench, Activity, Zap, Thermometer, Wifi, Calendar } from 'lucide-react';

const CARD = 'rounded-2xl overflow-hidden';
const CARD_STYLE = { background: '#131829', border: '1px solid #232843' };
const TIP = { borderColor: '#232843', borderRadius: 10, fontSize: 12, background: '#1a1f35', color: '#f4f5f9' };
const GRID = 'rgba(255,255,255,0.04)';
const TICK = { fontSize: 11, fill: '#4a5070' };

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

function GroupLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: '#2e3450' }}>{children}</span>
      <div className="flex-1 h-px" style={{ background: '#1a1f35' }} />
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, gradient, glowColor }) {
  return (
    <div className="rounded-2xl text-white relative overflow-hidden"
         style={{ background: gradient, boxShadow: `0 4px 24px ${glowColor}`, padding: '20px 24px' }}>
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 20%, white, transparent 60%)' }} />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg bg-white/15 flex-shrink-0">
            <Icon size={16} className="text-white" />
          </div>
          <p className="text-sm font-bold text-white leading-tight">{title}</p>
        </div>
        <p className="text-5xl font-black tracking-tight tabular-nums leading-none mb-2">{value}</p>
        {sub && <p className="text-xs text-white/60 mt-1">{sub}</p>}
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

  const now = new Date();
  const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;

  return (
    <div className="p-6 space-y-7">

      {/* 페이지 헤더 */}
      <div className="pb-5" style={{ borderBottom: '1px solid #232843' }}>
        <h2 className="text-xl font-black tracking-tight" style={{ color: '#f4f5f9' }}>대시보드</h2>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: '#4a5070' }}>
            <Calendar size={11} />{dateStr}
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: '#232843' }} />
          <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#00d3a7' }}>
            <Wifi size={11} />실시간 연결중
          </span>
        </div>
      </div>

      {/* 긴급 알림 */}
      {criticalAlerts.length > 0 && (
        <div className="rounded-2xl p-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={15} className="text-red-400" />
            <span className="text-sm font-bold text-red-400">긴급 알림 {criticalAlerts.length}건</span>
          </div>
          {criticalAlerts.map(a => (
            <div key={a.id} className="flex items-start gap-2 text-sm text-red-300 mt-1.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <span><strong>[{a.equipmentName}]</strong> {a.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* 시스템 현황 */}
      <div className="space-y-3">
        <GroupLabel>시스템 현황</GroupLabel>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="정상 설비" value={normalCount} sub={`전체 ${equipmentList.length}대 중`} icon={CheckCircle}
            gradient="linear-gradient(135deg, #065f46 0%, #00d3a7 100%)" glowColor="rgba(0,211,167,0.2)" />
          <StatCard title="고장 설비" value={faultCount} sub="즉시 조치 필요" icon={AlertTriangle}
            gradient="linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)" glowColor="rgba(239,68,68,0.2)" />
          <StatCard title="경고 설비" value={warningCount} sub="점검 권고" icon={Activity}
            gradient="linear-gradient(135deg, #78350f 0%, #f59e0b 100%)" glowColor="rgba(245,158,11,0.2)" />
          <StatCard title="점검 중" value={maintenanceCount} sub="예방점검 진행" icon={Wrench}
            gradient="linear-gradient(135deg, #3b0764 0%, #7c5cff 100%)" glowColor="rgba(124,92,255,0.2)" />
        </div>
      </div>

      {/* 모니터링 */}
      <div className="space-y-3">
        <GroupLabel>모니터링</GroupLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={Zap} color="#7c5cff" title="시간별 부하율 추이 (오늘)" />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={190}>
                <LineChart data={hourlyLoadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                  <XAxis dataKey="time" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 120]} unit="%" tick={TICK} axisLine={false} tickLine={false} />
                  <Tooltip formatter={v => `${v}%`} contentStyle={TIP} />
                  <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: '경보 80%', fontSize: 10, fill: '#f59e0b', position: 'insideTopRight' }} />
                  <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '긴급 100%', fontSize: 10, fill: '#ef4444', position: 'insideTopRight' }} />
                  <Line type="monotone" dataKey="부하율" stroke="#7c5cff" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={AlertTriangle} color="#f59e0b" title="최근 7일 알림 추이" />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={alertTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                  <XAxis dataKey="date" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TIP} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#969cb1' }} />
                  <Bar dataKey="긴급" fill="#ef4444" stackId="a" />
                  <Bar dataKey="경고" fill="#f59e0b" stackId="a" />
                  <Bar dataKey="정보" fill="#7c5cff" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* 알림 및 온도 */}
      <div className="space-y-3">
        <GroupLabel>알림 및 설비 현황</GroupLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={AlertTriangle} color="#ef4444" title="활성 알림" />
            <div className="p-4 space-y-2">
              {activeAlerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl"
                     style={{
                       background: alert.severity === 'critical' ? 'rgba(239,68,68,0.08)' : alert.severity === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(124,92,255,0.08)',
                       border: `1px solid ${alert.severity === 'critical' ? 'rgba(239,68,68,0.2)' : alert.severity === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(124,92,255,0.2)'}`,
                     }}>
                  <SeverityBadge severity={alert.severity} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: '#f4f5f9' }}>{alert.equipmentName}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#969cb1' }}>{alert.message}</p>
                  </div>
                  <span className="text-xs flex-shrink-0 pt-0.5" style={{ color: '#4a5070' }}>{alert.timestamp.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={Thermometer} color="#00d3a7" title="설비 온도 현황 (상위 6개)" />
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2.5">
                {equipmentList
                  .filter(e => e.status !== 'maintenance')
                  .sort((a, b) => b.temp - a.temp)
                  .slice(0, 6)
                  .map(eq => (
                    <div key={eq.id} className="flex items-center justify-between p-3 rounded-xl"
                         style={{ background: '#0d1120', border: '1px solid #232843' }}>
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-semibold truncate" style={{ color: '#f4f5f9' }}>{eq.name}</p>
                        <p className="text-xs" style={{ color: '#4a5070' }}>{eq.id}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm font-bold ${eq.temp >= 90 ? 'text-red-400' : eq.temp >= 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {eq.temp}°C
                        </p>
                        <div className="mt-0.5"><EquipmentStatusBadge status={eq.status} /></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
