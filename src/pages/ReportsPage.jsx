import { useState } from 'react';
import { ClipboardList, Plus, X, Trash2, ChevronDown } from 'lucide-react';

const GLASS = 'bg-white/75 backdrop-blur-md rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(15,27,51,0.12)]';

const INITIAL_REPORTS = [
  { id: 1, equipmentId: 'TR-001', equipmentName: '주변압기 1호', type: '정기점검', inspector: '김철수', date: '2026-05-20', result: '이상없음', note: '오일 샘플 채취, 권선저항 측정 완료' },
  { id: 2, equipmentId: 'GEN-002', equipmentName: '발전기 2호', type: '예방점검', inspector: '이영희', date: '2026-05-25', result: '점검중', note: '베어링 교체 작업 진행 중 (완료 예정: 05/28)' },
  { id: 3, equipmentId: 'CB-001', equipmentName: '차단기 1번', type: '동작시험', inspector: '박민준', date: '2026-05-21', result: '이상없음', note: '개폐 동작 확인, 접점 마모 미미' },
  { id: 4, equipmentId: 'MOT-001', equipmentName: '펌프 모터 1', type: '절연저항측정', inspector: '최수진', date: '2026-05-22', result: '이상없음', note: '절연저항 450MΩ 측정, 양호' },
  { id: 5, equipmentId: 'CAB-001', equipmentName: '154kV 케이블 1', type: '부분방전측정', inspector: '정대현', date: '2026-05-15', result: '요주의', note: '부분방전 2.5pC 감지, 정밀진단 예약 필요' },
  { id: 6, equipmentId: 'DP-001', equipmentName: '배전반 A-1', type: '청소 및 점검', inspector: '한지수', date: '2026-05-23', result: '이상없음', note: '내부 청소, 단자 체결 확인' },
];

const RESULT_OPTIONS = ['이상없음', '요주의', '점검중', '불량'];
const TYPE_OPTIONS = ['정기점검', '예방점검', '동작시험', '절연저항측정', '부분방전측정', '청소 및 점검', '기타'];

const resultStyle = {
  '이상없음': 'text-emerald-700 bg-emerald-50 border border-emerald-200',
  '요주의':   'text-amber-700 bg-amber-50 border border-amber-200',
  '점검중':   'text-[#3D6FE0] bg-[#EFF6FF] border border-[#BFDBFE]',
  '불량':     'text-red-700 bg-red-50 border border-red-200',
};

const EMPTY_FORM = { equipmentName: '', equipmentId: '', type: '정기점검', inspector: '', date: '', result: '이상없음', note: '' };

const inputCls = 'w-full px-3 py-2.5 text-sm border border-white/50 rounded-lg bg-white/50 text-[#0F1B33] placeholder-[#B8C0D6] focus:outline-none focus:ring-2 focus:ring-[#3D6FE0]/30 focus:border-[#3D6FE0] transition-all';

export default function ReportsPage() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.equipmentName.trim()) e.equipmentName = '설비명을 입력하세요';
    if (!form.inspector.trim()) e.inspector = '담당자를 입력하세요';
    if (!form.date) e.date = '점검일을 선택하세요';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setReports(prev => [{ ...form, id: Date.now(), equipmentId: form.equipmentId || '-' }, ...prev]);
    setForm(EMPTY_FORM); setErrors({}); setShowModal(false);
  };

  const handleChange = (f, v) => {
    setForm(prev => ({ ...prev, [f]: v }));
    if (errors[f]) setErrors(prev => ({ ...prev, [f]: undefined }));
  };

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
          <ClipboardList size={18} className="text-[#3D6FE0]" />
          점검 이력
          <span className="text-xs font-normal text-[#7A89AB]">총 {reports.length}건</span>
        </h2>
        <button onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setErrors({}); }}
          className="flex items-center gap-1.5 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition-all shadow-md hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #2A5CD0 0%, #3D6FE0 100%)' }}>
          <Plus size={16} />점검 등록
        </button>
      </div>

      <div className={GLASS}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-black/5">
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 first:rounded-tl-xl">No.</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">설비명</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden sm:table-cell">점검유형</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden md:table-cell">담당자</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">점검일</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50">결과</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#4A5A7C] bg-white/50 hidden lg:table-cell">비고</th>
                <th className="px-4 py-3.5 bg-white/50 last:rounded-tr-xl" />
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={r.id}
                  className={`border-b border-black/[0.04] hover:bg-white/40 transition-colors group ${i === reports.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3 text-xs text-[#B8C0D6] font-mono tabular-nums">{String(reports.length - i).padStart(2, '0')}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0F1B33]">{r.equipmentName}</div>
                    <div className="text-xs text-[#7A89AB]">{r.equipmentId}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[#4A5A7C] text-xs">{r.type}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[#4A5A7C] text-xs">{r.inspector}</td>
                  <td className="px-4 py-3 text-[#4A5A7C] text-xs whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold ${resultStyle[r.result] || 'text-[#4A5A7C] bg-white/60'}`}>
                      {r.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#7A89AB] text-xs max-w-xs">
                    <p className="truncate">{r.note}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setDeleteId(r.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[#B8C0D6] hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.length === 0 && (
            <div className="text-center py-16 text-[#7A89AB] text-sm">
              <ClipboardList size={32} className="mx-auto mb-2 text-[#DDE2EE]" />
              등록된 점검 이력이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 등록 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_24px_64px_rgba(15,27,51,0.2)] w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/60">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
              <h3 className="text-base font-bold text-[#0F1B33] flex items-center gap-2">
                <Plus size={18} className="text-[#3D6FE0]" />점검 이력 등록
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-black/5 text-[#7A89AB]"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">설비명 <span className="text-red-500">*</span></label>
                  <input type="text" className={`${inputCls} ${errors.equipmentName ? 'border-red-400' : ''}`}
                    placeholder="예: 주변압기 1호" value={form.equipmentName}
                    onChange={e => handleChange('equipmentName', e.target.value)} />
                  {errors.equipmentName && <p className="text-xs text-red-500 mt-1">{errors.equipmentName}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">설비 ID</label>
                  <input type="text" className={inputCls} placeholder="예: TR-001" value={form.equipmentId}
                    onChange={e => handleChange('equipmentId', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">점검 유형</label>
                  <div className="relative">
                    <select className={`${inputCls} appearance-none cursor-pointer`} value={form.type}
                      onChange={e => handleChange('type', e.target.value)}>
                      {TYPE_OPTIONS.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A89AB] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">결과</label>
                  <div className="relative">
                    <select className={`${inputCls} appearance-none cursor-pointer`} value={form.result}
                      onChange={e => handleChange('result', e.target.value)}>
                      {RESULT_OPTIONS.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A89AB] pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">담당자 <span className="text-red-500">*</span></label>
                  <input type="text" className={`${inputCls} ${errors.inspector ? 'border-red-400' : ''}`}
                    placeholder="예: 홍길동" value={form.inspector}
                    onChange={e => handleChange('inspector', e.target.value)} />
                  {errors.inspector && <p className="text-xs text-red-500 mt-1">{errors.inspector}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">점검일 <span className="text-red-500">*</span></label>
                  <input type="date" className={`${inputCls} ${errors.date ? 'border-red-400' : ''}`}
                    value={form.date} onChange={e => handleChange('date', e.target.value)} />
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#4A5A7C] mb-1 block">비고</label>
                <textarea className={`${inputCls} resize-none`} rows={3}
                  placeholder="점검 내용, 특이사항 등을 입력하세요"
                  value={form.note} onChange={e => handleChange('note', e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2 px-6 py-4 border-t border-black/5 bg-black/[0.02] rounded-b-2xl">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 text-sm font-semibold text-[#4A5A7C] bg-white border border-black/10 rounded-lg hover:bg-black/5 transition-colors">
                취소
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-2.5 text-sm font-semibold text-white rounded-lg transition-all shadow-sm hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2A5CD0 0%, #3D6FE0 100%)' }}>
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_24px_64px_rgba(15,27,51,0.2)] w-full max-w-sm p-6 border border-white/60">
            <h3 className="text-base font-bold text-[#0F1B33] mb-2">점검 이력 삭제</h3>
            <p className="text-sm text-[#4A5A7C] mb-5">이 항목을 삭제하시겠습니까?</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-semibold text-[#4A5A7C] bg-black/5 rounded-lg hover:bg-black/10 transition-colors">취소</button>
              <button onClick={() => { setReports(p => p.filter(r => r.id !== deleteId)); setDeleteId(null); }}
                className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
