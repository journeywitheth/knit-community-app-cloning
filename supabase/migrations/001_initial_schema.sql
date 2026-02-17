-- 도아니티 클론 앱 - 초기 데이터베이스 스키마
-- Supabase PostgreSQL

-- ===========================================
-- ENUM 타입
-- ===========================================

CREATE TYPE user_role AS ENUM ('doaniter', 'doaner');

CREATE TYPE community_category AS ENUM (
  'knitting_chat',
  'doanity',
  'finished_works',
  'scrap_market',
  'studios_shops'
);

CREATE TYPE pattern_category AS ENUM (
  'clothing',
  'accessories',
  'home',
  'toys',
  'other'
);

CREATE TYPE purchase_status AS ENUM ('pending', 'completed', 'refunded');

CREATE TYPE settlement_status AS ENUM ('pending', 'processing', 'completed', 'failed');

CREATE TYPE notification_type AS ENUM (
  'comment',
  'purchase',
  'pattern_update',
  'settlement',
  'system'
);

-- ===========================================
-- 사용자 프로필
-- ===========================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'doaniter',
  display_name TEXT,
  avatar_url TEXT,
  is_restricted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 새 사용자 가입 시 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, '익명의 도아니터');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ===========================================
-- 판매자 프로필
-- ===========================================

CREATE TABLE seller_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  shop_name TEXT NOT NULL,
  bio TEXT,
  bank_name TEXT,  -- 암호화 필요
  bank_account TEXT,  -- 암호화 필요
  commission_rate DECIMAL(4,2) NOT NULL DEFAULT 10.00,
  total_sales INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ===========================================
-- 커뮤니티 게시글
-- ===========================================

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category community_category NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  comment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- ===========================================
-- 댓글
-- ===========================================

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

-- 댓글 수 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_comment_change
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comment_count();

-- ===========================================
-- 도안 상품
-- ===========================================

CREATE TABLE patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category pattern_category NOT NULL DEFAULT 'other',
  price INTEGER NOT NULL DEFAULT 0,  -- KRW (0 = 무료)
  is_free BOOLEAN NOT NULL DEFAULT false,
  images TEXT[] DEFAULT '{}',
  pdf_url TEXT NOT NULL,
  pdf_version INTEGER NOT NULL DEFAULT 1,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT true,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_patterns_seller_id ON patterns(seller_id);
CREATE INDEX idx_patterns_category ON patterns(category);
CREATE INDEX idx_patterns_is_published ON patterns(is_published);
CREATE INDEX idx_patterns_created_at ON patterns(created_at DESC);

-- ===========================================
-- 구매 내역
-- ===========================================

CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pattern_id UUID NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 0,  -- KRW
  payment_key TEXT,
  order_id TEXT,
  status purchase_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '1 year'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(buyer_id, pattern_id)  -- 중복 구매 방지
);

CREATE INDEX idx_purchases_buyer_id ON purchases(buyer_id);
CREATE INDEX idx_purchases_pattern_id ON purchases(pattern_id);

-- ===========================================
-- 정산
-- ===========================================

CREATE TABLE settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  gross_amount INTEGER NOT NULL DEFAULT 0,
  commission INTEGER NOT NULL DEFAULT 0,
  net_amount INTEGER NOT NULL DEFAULT 0,
  status settlement_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_settlements_seller_id ON settlements(seller_id);

-- ===========================================
-- 알림
-- ===========================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- ===========================================
-- Row Level Security (RLS) 정책
-- ===========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 프로필: 누구나 읽기 가능, 본인만 수정 가능
CREATE POLICY "profiles_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 게시글: 누구나 읽기 가능, 인증된 사용자만 작성, 작성자만 수정/삭제
CREATE POLICY "posts_read" ON posts FOR SELECT USING (true);
CREATE POLICY "posts_insert" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_update" ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_delete" ON posts FOR DELETE USING (auth.uid() = author_id);

-- 댓글: 누구나 읽기 가능, 인증된 사용자만 작성, 작성자만 삭제
CREATE POLICY "comments_read" ON comments FOR SELECT USING (true);
CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_delete" ON comments FOR DELETE USING (auth.uid() = author_id);

-- 도안: 공개된 도안만 읽기 가능, 판매자만 작성/수정
CREATE POLICY "patterns_read" ON patterns FOR SELECT USING (is_published = true);
CREATE POLICY "patterns_insert" ON patterns FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "patterns_update" ON patterns FOR UPDATE USING (auth.uid() = seller_id);

-- 구매: 구매자 본인만 자기 구매 내역 읽기, 인증된 사용자만 구매 생성
CREATE POLICY "purchases_read" ON purchases FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "purchases_insert" ON purchases FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- 정산: 판매자 본인만 자기 정산 내역 읽기
CREATE POLICY "settlements_read" ON settlements FOR SELECT USING (auth.uid() = seller_id);

-- 알림: 본인의 알림만 읽기/수정
CREATE POLICY "notifications_read" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "notifications_update" ON notifications FOR UPDATE USING (auth.uid() = user_id);
