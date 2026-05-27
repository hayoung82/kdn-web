import { ClipboardList } from 'lucide-react';

const CARD = 'bg-white rounded-xl border border-[#DDE2EE] shadow-[0_2px_8px_rgba(15,27,51,0.06)]';

const reports = [
  { id: 1, equipmentId: 'TR-001', equipmentName: '주변압기 1호', type: '정기점검', inspector: '김철수', date: '2026-05-20', result: '이상없음', note: '오일 샘플 채취, 권선저항 측정 완료' },
  { id: 2, equipmentId: 'GEN-002', equipmentName: '발전기 2호', type: '예방점검', inspector: '이영희', date: '2026-05-25', result: '점검중', note: '베어링 교체 작업 진행 중 (완료 예정: 05/28)' },
  { id: 3, equipmentId: 'CB-001', equipmentName: '차단기 1번', type: '동작시험', inspector: '박민준', date: '2026-05-21', result: '이상없음', note: '개폐 동작 확인, 접점 마모 미미' },
  { id: 4, equipmentId: 'MOT-001', equipmentName: '펌프 모터 1', type: '절연저항측정', inspector: '최수진', date: '2026-05-22', result: '이상없음', note: '절연저항 450MΩ 측정, 양호' },
  { id: 5, equipmentId: 'CAB-001', equipmentName: '154kV 케이블 1', type: '부분방전측정', inspector: '정대현', date: '2026-05-15', result: '요주의', note: '부분방전 2.5pC 감지, 정밀진단 예약 필요' },
  { id: 6, equipmentId: 'DP-001', equipmentName: '배전반 A-1', type: '청소 및 점검', inspector: '한지수', date: '2026-05-23', result: '이상없음', note: '내부 청소, 단자 체결 확인' },
];

const resultColor = {
  '이상없음': 'text-emerald-700 bg-emerald-50 border border-emerald-200',
  '요주의':   'text-amber-700 bg-amber-50 border border-amber-200',
  '점검중':   'text-[#3D6FE0] bg-[#EFF6FF] border border-[#BFDBFE]',
  '불량':     'text-red-700 bg-red-50 border border-red-200',
};

export default function ReportsPage() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
        <ClipboardList size={18} className="text-[#3D6FE0]" />
        점검 이력
      </h2>

      <div className={`${CARD} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F0F2F8] border-b border-[#DDE2EE]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">설비명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden sm:table-cell">점검유형</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden md:table-cell">담당자</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">점검일</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C]">결과</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A5A7C] hidden lg:table-cell">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F8]">
              {reports.map(r => (
                <tr key={r.id} className="hover:bg-[#F8F9FC] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0F1B33]">{r.equipmentName}</div>
                    <div className="text-xs text-[#7A89AB]">{r.equipmentId}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[#4A5A7C] text-xs">{r.type}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#4A5A7C] text-xs">{r.inspector}</td>
                  <td className="px-4 py-3 text-[#4A5A7C] text-xs whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${resultColor[r.result] || 'text-[#4A5A7C] bg-[#F0F2F8]'}`}>
                      {r.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#7A89AB] text-xs max-w-xs">
                    <p className="truncate">{r.note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
