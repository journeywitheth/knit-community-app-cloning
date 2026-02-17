/**
 * Supabase 데이터베이스 타입 정의
 * 실제 Supabase 프로젝트 연동 후 `npx supabase gen types`로 자동 생성 가능
 */

export type UserRole = 'doaniter' | 'doaner';

export type CommunityCategory =
  | 'knitting_chat'
  | 'doanity'
  | 'finished_works'
  | 'scrap_market'
  | 'studios_shops';

export type PatternCategory =
  | 'clothing'
  | 'accessories'
  | 'home'
  | 'toys'
  | 'other';

export type PurchaseStatus = 'pending' | 'completed' | 'refunded';
export type SettlementStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type NotificationType = 'comment' | 'purchase' | 'pattern_update' | 'settlement' | 'system';

// --- 테이블 타입 ---

export interface Profile {
  id: string;
  role: UserRole;
  display_name: string | null;
  avatar_url: string | null;
  is_restricted: boolean;
  created_at: string;
  updated_at: string;
}

export interface SellerProfile {
  id: string;
  shop_name: string;
  bio: string | null;
  bank_name: string | null;
  bank_account: string | null;
  commission_rate: number;
  total_sales: number;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  category: CommunityCategory;
  title: string;
  content: string;
  images: string[];
  is_pinned: boolean;
  comment_count: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
}

export interface Pattern {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  category: PatternCategory;
  price: number;
  is_free: boolean;
  images: string[];
  pdf_url: string;
  pdf_version: number;
  tags: string[];
  is_published: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
  // 조인 데이터 (선택적)
  seller?: SellerProfile;
}

export interface Purchase {
  id: string;
  buyer_id: string;
  pattern_id: string;
  amount: number;
  payment_key: string | null;
  order_id: string | null;
  status: PurchaseStatus;
  expires_at: string;
  created_at: string;
  // 조인 데이터 (선택적)
  pattern?: Pattern;
}

export interface Settlement {
  id: string;
  seller_id: string;
  period_start: string;
  period_end: string;
  gross_amount: number;
  commission: number;
  net_amount: number;
  status: SettlementStatus;
  paid_at: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  created_at: string;
}

// --- Insert 타입 (생성 시 사용) ---

export type PostInsert = Omit<Post, 'id' | 'comment_count' | 'created_at' | 'updated_at'> & {
  is_pinned?: boolean;
};

export type CommentInsert = Omit<Comment, 'id' | 'created_at'>;

export type PatternInsert = Omit<Pattern, 'id' | 'download_count' | 'created_at' | 'updated_at' | 'seller'> & {
  is_published?: boolean;
  pdf_version?: number;
};

export type PurchaseInsert = Omit<Purchase, 'id' | 'created_at' | 'pattern'>;
