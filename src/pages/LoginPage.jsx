import { useState } from 'react';
import { Zap, User, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!id.trim() || !pw.trim()) { setError('아이디와 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    setTimeout(() => {
      if (id === 'admin' && pw === 'admin') {
        onLogin({ name: '관리자', role: 'admin' });
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#0b0e17' }}>

      {/* 상단 배너 로고 */}
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

      {/* 로그인 카드 */}
      <div className="w-full max-w-sm rounded-2xl overflow-hidden"
           style={{ background: '#131829', border: '1px solid #232843', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

        {/* 카드 헤더 */}
        <div className="px-6 py-4" style={{ background: '#0d1120', borderBottom: '1px solid #232843' }}>
          <p className="text-sm font-bold" style={{ color: '#f4f5f9' }}>로그인</p>
          <p className="text-xs mt-0.5" style={{ color: '#4a5070' }}>계정 정보를 입력하세요</p>
        </div>

        {/* 폼 */}
        <div className="px-6 py-6 space-y-3">
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4a5070' }} />
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={e => { setId(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl outline-none transition-all"
              style={{
                background: '#0d1120',
                border: '1px solid #232843',
                color: '#f4f5f9',
              }}
              onFocus={e => { e.target.style.borderColor = '#7c5cff'; e.target.style.boxShadow = '0 0 0 3px rgba(124,92,255,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = '#232843'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#4a5070' }} />
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl outline-none transition-all"
              style={{
                background: '#0d1120',
                border: '1px solid #232843',
                color: '#f4f5f9',
              }}
              onFocus={e => { e.target.style.borderColor = '#7c5cff'; e.target.style.boxShadow = '0 0 0 3px rgba(124,92,255,0.15)'; }}
              onBlur={e => { e.target.style.borderColor = '#232843'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl"
                 style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
              <AlertCircle size={13} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all mt-1 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c5cff 100%)', boxShadow: '0 4px 20px rgba(124,92,255,0.3)' }}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </div>

        <div className="px-6 pb-5 text-center">
          <p className="text-xs" style={{ color: '#4a5070' }}>
            테스트 계정: <span style={{ color: '#969cb1' }} className="font-medium">admin / admin</span>
          </p>
        </div>
      </div>

      <p className="text-xs mt-8" style={{ color: '#2e3450' }}>© 2026 KDN 전력관리시스템</p>
    </div>
  );
}
