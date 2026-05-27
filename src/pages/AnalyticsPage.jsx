import { equipmentList, alertTrendData, hourlyLoadData } from '../data/mockData';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

const CARD = 'rounded-2xl overflow-hidden';
const CARD_STYLE = { background: '#131829', border: '1px solid #232843' };
const TIP = { borderColor: '#232843', borderRadius: 10, fontSize: 12, background: '#1a1f35', color: '#f4f5f9' };
const GRID = 'rgba(255,255,255,0.04)';
const TICK = { fontSize: 11, fill: '#4a5070' };

const STATUS_COLORS = { 정상: '#00d3a7', 경고: '#f59e0b', 고장: '#ef4444', 점검중: '#7c5cff' };
const TYPE_COLORS = ['#7c5cff', '#00d3a7', '#06b6d4', '#f59e0b', '#f97316', '#ef4444'];

function CardHead({ icon: Icon, color, title }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3.5" style={{ background: '#0d1120', borderBottom: '1px solid #232843' }}>
      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: color }} />
      <Icon size={14} style={{ color }} />
      <span className="text-sm font-bold text-[#f4f5f9]">{title}</span>
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

function MetricCard({ label, value, unit, gradient, glow }) {
  return (
    <div className="rounded-2xl p-5 text-white relative overflow-hidden"
         style={{ background: gradient, boxShadow: `0 4px 24px ${glow}` }}>
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 20%, white, transparent 60%)' }} />
      <p className="text-xs font-semibold relative" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</p>
      <p className="text-4xl font-black mt-2 tracking-tight relative">
        {value}<span className="text-base font-normal ml-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{unit}</span>
      </p>
    </div>
  );
}

export default function AnalyticsPage() {
  const statusData = [
    { name: '정상', value: equipmentList.filter(e => e.status === 'normal').length },
    { name: '경고', value: equipmentList.filter(e => e.status === 'warning').length },
    { name: '고장', value: equipmentList.filter(e => e.status === 'fault').length },
    { name: '점검중', value: equipmentList.filter(e => e.status === 'maintenance').length },
  ].filter(d => d.value > 0);

  const typeData = Object.entries(
    equipmentList.reduce((acc, e) => { acc[e.type] = (acc[e.type] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const avgLoad = Math.round(hourlyLoadData.reduce((s, d) => s + d['부하율'], 0) / hourlyLoadData.length);
  const maxLoad = Math.max(...hourlyLoadData.map(d => d['부하율']));

  return (
    <div className="p-6 space-y-7">

      <div className="pb-5" style={{ borderBottom: '1px solid #232843' }}>
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2.5" style={{ color: '#f4f5f9' }}>
          <BarChart3 size={20} style={{ color: '#7c5cff' }} />통계 분석
        </h2>
      </div>

      {/* 요약 지표 */}
      <div className="space-y-3">
        <GroupLabel>요약 지표</GroupLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard label="총 설비 수" value={equipmentList.length} unit="대"
            gradient="linear-gradient(135deg, #3b0764 0%, #7c5cff 100%)" glow="rgba(124,92,255,0.2)" />
          <MetricCard label="오늘 평균 부하율" value={avgLoad} unit="%"
            gradient={avgLoad >= 80 ? 'linear-gradient(135deg, #78350f 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #065f46 0%, #00d3a7 100%)'}
            glow={avgLoad >= 80 ? 'rgba(245,158,11,0.2)' : 'rgba(0,211,167,0.2)'} />
          <MetricCard label="오늘 최대 부하율" value={maxLoad} unit="%"
            gradient={maxLoad >= 100 ? 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)' : maxLoad >= 80 ? 'linear-gradient(135deg, #78350f 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #065f46 0%, #00d3a7 100%)'}
            glow={maxLoad >= 100 ? 'rgba(239,68,68,0.2)' : maxLoad >= 80 ? 'rgba(245,158,11,0.2)' : 'rgba(0,211,167,0.2)'} />
        </div>
      </div>

      {/* 설비 현황 */}
      <div className="space-y-3">
        <GroupLabel>설비 현황</GroupLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={Activity} color="#7c5cff" title="설비 상태 분포" />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={3}>
                    {statusData.map((entry) => <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}대`, n]} contentStyle={TIP} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#969cb1' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={BarChart3} color="#00d3a7" title="설비 유형별 현황" />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={215}>
                <BarChart data={typeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
                  <XAxis type="number" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={TICK} width={55} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TIP} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {typeData.map((_, i) => <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 추이 분석 */}
      <div className="space-y-3">
        <GroupLabel>추이 분석</GroupLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={TrendingUp} color="#7c5cff" title="오늘 시간별 부하율" />
            <div className="p-5">
              <ResponsiveContainer width="100%" height={190}>
                <LineChart data={hourlyLoadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                  <XAxis dataKey="time" tick={TICK} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 120]} unit="%" tick={TICK} axisLine={false} tickLine={false} />
                  <Tooltip formatter={v => `${v}%`} contentStyle={TIP} />
                  <Line type="monotone" dataKey="부하율" stroke="#7c5cff" strokeWidth={2.5} dot={{ r: 3, fill: '#7c5cff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={CARD} style={CARD_STYLE}>
            <CardHead icon={AlertTriangle} color="#f59e0b" title="7일 알림 발생 추이" />
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

    </div>
  );
}
