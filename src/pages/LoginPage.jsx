import { useState } from 'react';
import { Zap, User, Lock, UserCheck, AlertCircle } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!id.trim() || !pw.trim()) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
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

  const handleGuest = () => {
    setLoading(true);
    setTimeout(() => onLogin({ name: '게스트', role: 'guest' }), 400);
  };

  const inputCls = 'w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-white/40 bg-white/30 text-[#0F1B33] placeholder-[#7A89AB] focus:outline-none focus:ring-2 focus:ring-[#3D6FE0]/40 focus:border-[#3D6FE0] transition-all backdrop-blur-sm';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(160deg, #c8d6e8 0%, #b8c8dc 50%, #a8bcd4 100%)' }}
    >
      {/* 로고 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#3D6FE0] p-2.5 rounded-xl shadow-lg">
          <Zap size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-[#0F1B33] tracking-tight">
            <span className="text-[#3D6FE0]">KDN</span> 전력설비 현황
          </h1>
          <p className="text-xs text-[#4A5A7C]">Power Equipment Dashboard</p>
        </div>
      </div>

      {/* 카드 영역 */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4">

        {/* 로그인 폼 */}
        <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_16px_48px_rgba(15,27,51,0.15)] p-6">
          <h2 className="text-base font-bold text-[#0F1B33] mb-1">로그인</h2>
          <p className="text-xs text-[#7A89AB] mb-5">계정 정보를 입력하세요</p>

          <div className="space-y-3">
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A89AB]" />
              <input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={e => { setId(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className={inputCls}
              />
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A89AB]" />
              <input
                type="password"
                placeholder="비밀번호"
                value={pw}
                onChange={e => { setPw(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className={inputCls}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50/80 border border-red-100 rounded-lg px-3 py-2">
                <AlertCircle size={13} />
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-2.5 text-sm font-bold text-white rounded-xl transition-all shadow-md disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #2A5CD0 0%, #3D6FE0 100%)' }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>

          <p className="text-xs text-[#B8C0D6] text-center mt-4">
            테스트 계정: <span className="text-[#7A89AB] font-medium">admin / admin</span>
          </p>
        </div>

        {/* 구분선 */}
        <div className="hidden sm:flex flex-col items-center justify-center gap-2">
          <div className="w-px flex-1 bg-white/40" />
          <span className="text-xs text-[#7A89AB] font-medium bg-white/40 px-2 py-1 rounded-full border border-white/40">또는</span>
          <div className="w-px flex-1 bg-white/40" />
        </div>
        <div className="flex sm:hidden items-center gap-3">
          <div className="flex-1 h-px bg-white/40" />
          <span className="text-xs text-[#7A89AB] font-medium">또는</span>
          <div className="flex-1 h-px bg-white/40" />
        </div>

        {/* 게스트 로그인 */}
        <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_16px_48px_rgba(15,27,51,0.15)] p-6 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md"
            style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1B33 100%)' }}>
            <UserCheck size={26} className="text-white" />
          </div>
          <h2 className="text-base font-bold text-[#0F1B33] mb-1">게스트 입장</h2>
          <p className="text-xs text-[#7A89AB] mb-5 leading-relaxed">
            로그인 없이 대시보드를<br />둘러볼 수 있습니다
          </p>
          <button
            onClick={handleGuest}
            disabled={loading}
            className="w-full py-2.5 text-sm font-bold text-white rounded-xl transition-all shadow-md disabled:opacity-60 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2A3A5C 100%)' }}
          >
            {loading ? '접속 중...' : '게스트로 입장'}
          </button>
          <p className="text-xs text-[#B8C0D6] mt-3">일부 기능이 제한될 수 있습니다</p>
        </div>
      </div>

      <p className="text-xs text-[#7A89AB] mt-8">© 2026 KDN 전력관리시스템</p>
    </div>
  );
}
