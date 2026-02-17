/**
 * 앱 전역 상수
 */

// 커뮤니티 카테고리
export const COMMUNITY_CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'knitting_chat', label: '뜨개잡담' },
  { key: 'doanity', label: '도아니티' },
  { key: 'finished_works', label: '완성작품' },
  { key: 'scrap_market', label: '자투리마켓' },
  { key: 'studios_shops', label: '공방/뜨개샵' },
] as const;

// 도안 카테고리
export const PATTERN_CATEGORIES = [
  { key: 'all', label: '전체' },
  { key: 'clothing', label: '의류' },
  { key: 'accessories', label: '소품' },
  { key: 'home', label: '홈데코' },
  { key: 'toys', label: '인형/장난감' },
  { key: 'other', label: '기타' },
] as const;

// 사용자 역할
export const USER_ROLES = {
  DOANITER: 'doaniter', // 일반 사용자/구매자
  DOANER: 'doaner',     // 도안 판매 작가
} as const;

// 게시글 카테고리 타입
export type CommunityCategory = typeof COMMUNITY_CATEGORIES[number]['key'];
export type PatternCategory = typeof PATTERN_CATEGORIES[number]['key'];
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// 페이지네이션
export const PAGE_SIZE = 20;

// 이미지 설정
export const IMAGE_CONFIG = {
  maxWidth: 1200,
  quality: 0.7,
  maxImagesPerPost: 10,
} as const;

// 도안 가격 범위 (KRW)
export const PRICE_RANGE = {
  accessories: { min: 3000, max: 6000 },
  clothing: { min: 7000, max: 12000 },
} as const;
