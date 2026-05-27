import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ClipboardList, Plus, X, Trash2, ChevronDown, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const CARD = 'rounded-2xl overflow-hidden';
const CARD_STYLE = { background: '#131829', border: '1px solid #232843' };

const RESULT_OPTIONS = ['이상없음', '요주의', '점검중', '불량'];
const TYPE_OPTIONS = ['정기점검', '예방점검', '동작시험', '절연저항측정', '부분방전측정', '청소 및 점검', '기타'];

const resultStyle = {
  '이상없음': { background: 'rgba(0,211,167,0.12)', color: '#00d3a7', border: '1px solid rgba(0,211,167,0.25)' },
  '요주의':   { background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' },
  '점검중':   { background: 'rgba(124,92,255,0.12)', color: '#a78bfa', border: '1px solid rgba(124,92,255,0.25)' },
  '불량':     { background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' },
};

const EMPTY_FORM = { equipmentName: '', equipmentId: '', type: '정기점검', inspector: '', date: '', result: '이상없음', note: '' };

const inputStyle = {
  background: '#0d1120', border: '1px solid #232843', color: '#f4f5f9',
  borderRadius: '12px', padding: '10px 12px', fontSize: '14px', width: '100%', outline: 'none', transition: 'border-color 0.15s',
};

// DB row → React 객체
const toReport = (r) => ({
  id: r.id,
  equipmentId: r.equipment_id,
  equipmentName: r.equipment_name,
  type: r.type,
  inspector: r.inspector,
  date: r.date,
  result: r.result,
  note: r.note ?? '',
});

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // 데이터 로드
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inspection_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast('데이터를 불러오는 데 실패했습니다: ' + error.message);
    } else {
      setReports(data.map(toReport));
    }
    setLoading(false);
  };

  const validate = () => {
    const e = {};
    if (!form.equipmentName.trim()) e.equipmentName = '설비명을 입력하세요';
    if (!form.inspector.trim()) e.inspector = '담당자를 입력하세요';
    if (!form.date) e.date = '점검일을 선택하세요';
    return e;
  };

  // 등록
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);

    const { data, error } = await supabase
      .from('inspection_reports')
      .insert([{
        equipment_id: form.equipmentId || '-',
        equipment_name: form.equipmentName,
        type: form.type,
        inspector: form.inspector,
        date: form.date,
        result: form.result,
        note: form.note,
      }])
      .select()
      .single();

    if (error) {
      showToast('등록에 실패했습니다: ' + error.message);
    } else {
      setReports(prev => [toReport(data), ...prev]);
      setForm(EMPTY_FORM); setErrors({}); setShowModal(false);
      showToast('점검 이력이 등록되었습니다.', 'success');
    }
    setSubmitting(false);
  };

  // 삭제
  const handleDelete = async () => {
    const { error } = await supabase
      .from('inspection_reports')
      .delete()
      .eq('id', deleteId);

    if (error) {
      showToast('삭제에 실패했습니다: ' + error.message);
    } else {
      setReports(prev => prev.filter(r => r.id !== deleteId));
      showToast('삭제되었습니다.', 'success');
    }
    setDeleteId(null);
  };

  const handleChange = (f, v) => {
    setForm(prev => ({ ...prev, [f]: v }));
    if (errors[f]) setErrors(prev => ({ ...prev, [f]: undefined }));
  };

  const focusStyle = (hasError) => ({ ...inputStyle, borderColor: hasError ? '#ef4444' : '#232843' });

  return (
    <>
    {toast && (
      <div className="fixed top-5 right-5 z-[100] flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-semibold shadow-2xl transition-all"
           style={{
             background: toast.type === 'success' ? 'rgba(0,211,167,0.12)' : 'rgba(239,68,68,0.12)',
             border: `1px solid ${toast.type === 'success' ? 'rgba(0,211,167,0.3)' : 'rgba(239,68,68,0.3)'}`,
             color: toast.type === 'success' ? '#00d3a7' : '#f87171',
             backdropFilter: 'blur(8px)',
             maxWidth: '360px',
           }}>
        {toast.type === 'success'
          ? <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
          : <AlertCircle size={16} className="shrink-0 mt-0.5" />}
        <span>{toast.message}</span>
        <button onClick={() => setToast(null)} className="ml-auto shrink-0 opacity-60 hover:opacity-100">
          <X size={14} />
        </button>
      </div>
    )}
    <div className="p-6 space-y-5">

      <div className="pb-5 flex items-center justify-between" style={{ borderBottom: '1px solid #232843' }}>
        <h2 className="text-xl font-black tracking-tight flex items-center gap-2.5" style={{ color: '#f4f5f9' }}>
          <ClipboardList size={20} style={{ color: '#7c5cff' }} />점검 이력
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: '#969cb1', background: '#0d1120', border: '1px solid #232843' }}>
            총 {reports.length}건
          </span>
          <button onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setErrors({}); }}
            className="flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)', boxShadow: '0 4px 16px rgba(124,92,255,0.3)' }}>
            <Plus size={15} />점검 등록
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <div className={CARD} style={CARD_STYLE}>
        <div className="flex items-center gap-2.5 px-5 py-3.5" style={{ background: '#0d1120', borderBottom: '1px solid #232843' }}>
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#7c5cff' }} />
          <ClipboardList size={14} style={{ color: '#7c5cff' }} />
          <span className="text-sm font-bold text-[#f4f5f9]">점검 이력 목록</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2" style={{ color: '#4a5070' }}>
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">데이터 로드 중...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid #232843' }}>
                  {['No.', '설비명', '점검유형', '담당자', '점검일', '결과', '비고', ''].map((h, i) => (
                    <th key={i}
                        className={`text-left px-5 py-3 text-xs font-bold ${i === 2 ? 'hidden sm:table-cell' : i === 3 ? 'hidden md:table-cell' : i === 6 ? 'hidden lg:table-cell' : ''}`}
                        style={{ background: '#0d1120', color: '#4a5070' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={r.id} className="transition-colors group"
                      style={{ borderBottom: i === reports.length - 1 ? 'none' : '1px solid #1a1f35' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#1a1f35'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td className="px-5 py-3.5 text-xs font-mono tabular-nums" style={{ color: '#2e3450' }}>{String(reports.length - i).padStart(2, '0')}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold" style={{ color: '#f4f5f9' }}>{r.equipmentName}</div>
                      <div className="text-xs" style={{ color: '#4a5070' }}>{r.equipmentId}</div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell text-xs" style={{ color: '#969cb1' }}>{r.type}</td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-xs" style={{ color: '#969cb1' }}>{r.inspector}</td>
                    <td className="px-5 py-3.5 text-xs whitespace-nowrap" style={{ color: '#969cb1' }}>{r.date}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold"
                            style={resultStyle[r.result] || { color: '#969cb1' }}>{r.result}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-xs max-w-xs" style={{ color: '#4a5070' }}>
                      <p className="truncate">{r.note}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setDeleteId(r.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all"
                        style={{ color: '#4a5070' }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#4a5070'; e.currentTarget.style.background = ''; }}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reports.length === 0 && (
              <div className="text-center py-16 text-sm" style={{ color: '#4a5070' }}>
                <ClipboardList size={32} className="mx-auto mb-2" style={{ color: '#1a1f35' }} />
                등록된 점검 이력이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>

      {/* 등록 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
             onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
               style={{ background: '#131829', border: '1px solid #232843', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #232843', background: '#0d1120' }}>
              <h3 className="text-base font-bold flex items-center gap-2" style={{ color: '#f4f5f9' }}>
                <Plus size={16} style={{ color: '#7c5cff' }} />점검 이력 등록
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg transition-colors" style={{ color: '#4a5070' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}>
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>설비명 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" placeholder="예: 주변압기 1호" value={form.equipmentName}
                    onChange={e => handleChange('equipmentName', e.target.value)}
                    style={focusStyle(errors.equipmentName)}
                    onFocus={e => { if (!errors.equipmentName) e.target.style.borderColor = '#7c5cff'; }}
                    onBlur={e => { if (!errors.equipmentName) e.target.style.borderColor = '#232843'; }} />
                  {errors.equipmentName && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.equipmentName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>설비 ID</label>
                  <input type="text" placeholder="예: TR-001" value={form.equipmentId}
                    onChange={e => handleChange('equipmentId', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#7c5cff'}
                    onBlur={e => e.target.style.borderColor = '#232843'} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>점검 유형</label>
                  <div className="relative">
                    <select value={form.type} onChange={e => handleChange('type', e.target.value)}
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = '#7c5cff'}
                      onBlur={e => e.target.style.borderColor = '#232843'}>
                      {TYPE_OPTIONS.map(t => <option key={t} style={{ background: '#131829' }}>{t}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#4a5070' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>결과</label>
                  <div className="relative">
                    <select value={form.result} onChange={e => handleChange('result', e.target.value)}
                      style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = '#7c5cff'}
                      onBlur={e => e.target.style.borderColor = '#232843'}>
                      {RESULT_OPTIONS.map(r => <option key={r} style={{ background: '#131829' }}>{r}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#4a5070' }} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>담당자 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" placeholder="예: 홍길동" value={form.inspector}
                    onChange={e => handleChange('inspector', e.target.value)}
                    style={focusStyle(errors.inspector)}
                    onFocus={e => { if (!errors.inspector) e.target.style.borderColor = '#7c5cff'; }}
                    onBlur={e => { if (!errors.inspector) e.target.style.borderColor = errors.inspector ? '#ef4444' : '#232843'; }} />
                  {errors.inspector && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.inspector}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>점검일 <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)}
                    style={{ ...focusStyle(errors.date), colorScheme: 'dark' }}
                    onFocus={e => { if (!errors.date) e.target.style.borderColor = '#7c5cff'; }}
                    onBlur={e => { if (!errors.date) e.target.style.borderColor = errors.date ? '#ef4444' : '#232843'; }} />
                  {errors.date && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.date}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: '#969cb1' }}>비고</label>
                <textarea rows={3} placeholder="점검 내용, 특이사항 등을 입력하세요"
                  value={form.note} onChange={e => handleChange('note', e.target.value)}
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#7c5cff'}
                  onBlur={e => e.target.style.borderColor = '#232843'} />
              </div>
            </div>
            <div className="flex gap-2 px-6 py-4" style={{ borderTop: '1px solid #232843', background: '#0d1120' }}>
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all"
                style={{ background: '#1a1f35', color: '#969cb1', border: '1px solid #232843' }}
                onMouseEnter={e => e.currentTarget.style.background = '#222845'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1f35'}>
                취소
              </button>
              <button onClick={handleSubmit} disabled={submitting}
                className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)', boxShadow: '0 4px 16px rgba(124,92,255,0.3)' }}>
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? '저장 중...' : '등록'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-sm p-6 rounded-2xl"
               style={{ background: '#131829', border: '1px solid #232843', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}>
            <h3 className="text-base font-bold mb-2" style={{ color: '#f4f5f9' }}>점검 이력 삭제</h3>
            <p className="text-sm mb-5" style={{ color: '#969cb1' }}>이 항목을 삭제하시겠습니까?</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl"
                style={{ background: '#1a1f35', color: '#969cb1', border: '1px solid #232843' }}>취소</button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all"
                style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.35)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}>삭제</button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}
