import { equipmentList, alertTrendData, hourlyLoadData } from '../data/mockData';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const STATUS_COLORS = {
  정상: '#22c55e',
  경고: '#f59e0b',
  고장: '#ef4444',
  점검중: '#3b82f6',
};

const TYPE_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

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
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
        <BarChart3 size={18} className="text-blue-500" />
        통계 분석
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-xs text-slate-500">총 설비 수</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{equipmentList.length}<span className="text-sm font-normal text-slate-500 ml-1">대</span></p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-xs text-slate-500">오늘 평균 부하율</p>
          <p className={`text-3xl font-bold mt-1 ${avgLoad >= 80 ? 'text-amber-500' : 'text-blue-600'}`}>{avgLoad}<span className="text-sm font-normal text-slate-500 ml-1">%</span></p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center">
          <p className="text-xs text-slate-500">오늘 최대 부하율</p>
          <p className={`text-3xl font-bold mt-1 ${maxLoad >= 100 ? 'text-red-600' : maxLoad >= 80 ? 'text-amber-500' : 'text-green-600'}`}>{maxLoad}<span className="text-sm font-normal text-slate-500 ml-1">%</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">설비 상태 분포</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}대`, name]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">설비 유형별 현황</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={typeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={55} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {typeData.map((_, i) => <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">오늘 시간별 부하율</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 120]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => `${v}%`} />
              <Line type="monotone" dataKey="부하율" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">7일 알림 발생 추이</h3>
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
    </div>
  );
}
