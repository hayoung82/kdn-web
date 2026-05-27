import { equipmentList, alertTrendData, hourlyLoadData } from '../data/mockData';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import { BarChart3, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

const GLASS = 'bg-white/75 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(15,27,51,0.12)]';
const DIVIDER = <div className="border-t border-black/5 my-4" />;
const tooltipStyle = { borderColor: 'rgba(255,255,255,0.6)', borderRadius: 10, fontSize: 12, background: 'rgba(255,255,255,0.95)' };
const STATUS_COLORS = { 정상: '#10b981', 경고: '#f59e0b', 고장: '#ef4444', 점검중: '#3D6FE0' };
const TYPE_COLORS = ['#3D6FE0', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

function SectionTitle({ icon: Icon, iconColor, children }) {
  return (
    <h3 className="text-sm font-bold text-[#0F1B33] flex items-center gap-2">
      <span className="inline-block w-1 h-4 rounded-full flex-shrink-0" style={{ background: iconColor }} />
      <Icon size={15} style={{ color: iconColor }} />
      {children}
    </h3>
  );
}

function MetricCard({ label, value, unit, gradient }) {
  return (
    <div className="rounded-xl p-4 text-white relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)]" style={{ background: gradient }}>
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 80% 20%, white, transparent 60%)' }} />
      <p className="text-xs font-medium opacity-75 relative">{label}</p>
      <p className="text-3xl font-black mt-1 tracking-tight relative">
        {value}<span className="text-base font-normal opacity-70 ml-1">{unit}</span>
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
    <div className="p-5 space-y-6">
      <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
        <BarChart3 size={18} className="text-[#3D6FE0]" />통계 분석
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard label="총 설비 수" value={equipmentList.length} unit="대"
          gradient="linear-gradient(135deg, #2A5CD0 0%, #3D6FE0 100%)" />
        <MetricCard label="오늘 평균 부하율" value={avgLoad} unit="%"
          gradient={avgLoad >= 80 ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #059669 0%, #10b981 100%)'} />
        <MetricCard label="오늘 최대 부하율" value={maxLoad} unit="%"
          gradient={maxLoad >= 100 ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' : maxLoad >= 80 ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #059669 0%, #10b981 100%)'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={`${GLASS} p-5`}>
          <SectionTitle icon={Activity} iconColor="#3D6FE0">설비 상태 분포</SectionTitle>
          {DIVIDER}
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={3}>
                {statusData.map((entry) => <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}대`, n]} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={`${GLASS} p-5`}>
          <SectionTitle icon={BarChart3} iconColor="#8b5cf6">설비 유형별 현황</SectionTitle>
          {DIVIDER}
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={typeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,27,51,0.08)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#7A89AB' }} width={55} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {typeData.map((_, i) => <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className={`${GLASS} p-5`}>
          <SectionTitle icon={TrendingUp} iconColor="#3D6FE0">오늘 시간별 부하율</SectionTitle>
          {DIVIDER}
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={hourlyLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15,27,51,0.08)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 120]} unit="%" tick={{ fontSize: 11, fill: '#7A89AB' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => `${v}%`} contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="부하율" stroke="#3D6FE0" strokeWidth={2.5} dot={{ r: 3, fill: '#3D6FE0' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${GLASS} p-5`}>
          <SectionTitle icon={AlertTriangle} iconColor="#f59e0b">7일 알림 발생 추이</SectionTitle>
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
    </div>
  );
}
