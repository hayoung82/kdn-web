import { useState } from 'react';
import { Zap, User, Lock, AlertCircle, Mail, Building2, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

const INPUT_BASE = {
  background: '#0d1120', border: '1px solid #232843', color: '#f4f5f9',
  borderRadius: '12px', padding: '12px 16px', fontSize: '14px', width: '100%', outline: 'none',
};
const onFocus = e => { e.target.style.borderColor = '#7c5cff'; e.target.style.boxShadow = '0 0 0 3px rgba(124,92,255,0.15)'; };
const onBlur = e => { e.target.style.borderColor = '#232843'; e.target.style.boxShadow = 'none'; };

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={13} style={{ color: '#4a5070' }} />
        <span className="text-xs font-semibold" style={{ color: '#4a5070' }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function LoginPage({ onLogin }) {
  const [tab, setTab] = useState('login');

  // 로그인 폼
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  // 회원가입 폼
  const [rName, setRName] = useState('');
  const [rEmail, setREmail] = useState('');
  const [rPw, setRPw] = useState('');
  const [rPwc, setRPwc] = useState('');
  const [rDept, setRDept] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [regDone, setRegDone] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !pw.trim()) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    setLoading(true); setError('');
    const { data, error: e } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (e) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setLoading(false);
    } else {
      onLogin(data.user);
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!rName.trim()) { setError('이름을 입력해주세요.'); return; }
    if (!rEmail.trim()) { setError('이메일을 입력해주세요.'); return; }
    if (rPw.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return; }
    if (rPw !== rPwc) { setError('비밀번호가 일치하지 않습니다.'); return; }
    setLoading(true);
    const { error: e } = await supabase.auth.signUp({
      email: rEmail, password: rPw,
      options: { data: { full_name: rName, department: rDept } },
    });
    if (e) {
      setError(e.message.includes('already') ? '이미 등록된 이메일입니다.' : e.message);
      setLoading(false);
    } else {
      setRegDone(true); setLoading(false);
    }
  };

  const switchTab = (t) => { setTab(t); setError(''); setRegDone(false); };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#0b0e17' }}>

      {/* 로고 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)' }}>
          <Zap size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight" style={{ color: '#f4f5f9' }}>
            KDN <span style={{ color: '#7c5cff' }}>전력설비</span> 현황
          </h1>
          <p className="text-xs mt-0.5" style={{ color: '#4a5070' }}>Power Equipment Dashboard</p>
        </div>
      </div>

      {/* 카드 */}
      <div className="w-full max-w-sm rounded-2xl overflow-hidden"
           style={{ background: '#131829', border: '1px solid #232843', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

        {/* 탭 */}
        <div className="flex" style={{ background: '#0d1120', borderBottom: '1px solid #232843' }}>
          {[['login', '로그인'], ['register', '회원가입']].map(([t, label]) => (
            <button key={t} onClick={() => switchTab(t)}
              className="flex-1 py-3.5 text-sm font-bold transition-all"
              style={{
                color: tab === t ? '#f4f5f9' : '#4a5070',
                borderBottom: tab === t ? '2px solid #7c5cff' : '2px solid transparent',
                background: 'transparent',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* 로그인 폼 */}
        {tab === 'login' && (
          <div className="px-6 py-6 space-y-3">
            <Field label="이메일" icon={Mail}>
              <input type="email" placeholder="이메일을 입력하세요" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="비밀번호" icon={Lock}>
              <input type="password" placeholder="비밀번호를 입력하세요" value={pw}
                onChange={e => { setPw(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>

            {error && (
              <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl"
                   style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                <AlertCircle size={13} className="flex-shrink-0" />{error}
              </div>
            )}

            <button onClick={handleLogin} disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-xl mt-1 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)', boxShadow: '0 4px 20px rgba(124,92,255,0.3)' }}>
              <LogIn size={15} />
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        )}

        {/* 회원가입 폼 */}
        {tab === 'register' && !regDone && (
          <div className="px-6 py-6 space-y-3">
            <Field label="이름" icon={User}>
              <input type="text" placeholder="이름을 입력하세요" value={rName}
                onChange={e => { setRName(e.target.value); setError(''); }}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="이메일" icon={Mail}>
              <input type="email" placeholder="이메일을 입력하세요" value={rEmail}
                onChange={e => { setREmail(e.target.value); setError(''); }}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="비밀번호 (6자 이상)" icon={Lock}>
              <input type="password" placeholder="비밀번호를 입력하세요" value={rPw}
                onChange={e => { setRPw(e.target.value); setError(''); }}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="비밀번호 확인" icon={Lock}>
              <input type="password" placeholder="비밀번호를 다시 입력하세요" value={rPwc}
                onChange={e => { setRPwc(e.target.value); setError(''); }}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>
            <Field label="부서 (선택)" icon={Building2}>
              <input type="text" placeholder="예: 전력관리팀" value={rDept}
                onChange={e => setRDept(e.target.value)}
                style={INPUT_BASE} onFocus={onFocus} onBlur={onBlur} />
            </Field>

            {error && (
              <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl"
                   style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                <AlertCircle size={13} className="flex-shrink-0" />{error}
              </div>
            )}

            <button onClick={handleRegister} disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-xl mt-1 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)', boxShadow: '0 4px 20px rgba(124,92,255,0.3)' }}>
              <UserPlus size={15} />
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </div>
        )}

        {/* 회원가입 완료 */}
        {tab === 'register' && regDone && (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                 style={{ background: 'rgba(0,211,167,0.15)', border: '1px solid rgba(0,211,167,0.3)' }}>
              <UserPlus size={22} style={{ color: '#00d3a7' }} />
            </div>
            <p className="font-bold mb-2" style={{ color: '#f4f5f9' }}>가입 신청 완료</p>
            <p className="text-sm leading-relaxed" style={{ color: '#969cb1' }}>
              이메일 인증 후 로그인이 가능합니다.<br />
              메일함을 확인해 주세요.
            </p>
            <button onClick={() => switchTab('login')}
              className="mt-6 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              style={{ background: '#1a1f35', color: '#a78bfa', border: '1px solid #232843' }}
              onMouseEnter={e => e.currentTarget.style.background = '#222845'}
              onMouseLeave={e => e.currentTarget.style.background = '#1a1f35'}>
              로그인으로 돌아가기
            </button>
          </div>
        )}

        <div className="px-6 pb-4 pt-3 text-center" style={{ borderTop: '1px solid #1a1f35' }}>
          <p className="text-xs" style={{ color: '#2e3450' }}>© 2026 KDN 전력관리시스템</p>
        </div>
      </div>
    </div>
  );
}
