-- ================================================================
-- 사용자 프로필 테이블
-- Supabase Auth (auth.users) 와 연동되는 추가 정보 테이블
-- 회원가입 시 auth.users 에 자동으로 연결됨
-- ================================================================

create table user_profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text not null default '',
  department  text not null default '',
  role        text not null default 'viewer',  -- 'admin' | 'manager' | 'viewer'
  created_at  timestamp with time zone default now()
);

-- RLS 활성화
alter table user_profiles enable row level security;

-- 인증된 사용자는 모든 프로필 조회 가능
create policy "authenticated_read_profiles" on user_profiles
  for select to authenticated using (true);

-- 본인 프로필만 수정 가능
create policy "users_update_own" on user_profiles
  for update using (auth.uid() = id);

-- 회원가입 시 본인 행만 삽입 가능
create policy "users_insert_own" on user_profiles
  for insert with check (auth.uid() = id);

-- ================================================================
-- 트리거: 회원가입(auth.users 삽입) 시 user_profiles 자동 생성
-- ================================================================
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, full_name, department)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'department', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ================================================================
-- 참고: Supabase 대시보드 → Authentication → Settings 에서
-- "Enable email confirmations" 를 OFF 로 설정하면
-- 이메일 인증 없이 바로 로그인 가능합니다 (테스트 환경 권장)
-- ================================================================
