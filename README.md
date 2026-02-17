# 뜨개마켓 - 뜨개 도안 커뮤니티 앱

뜨개(니팅/크로셰) 도안을 사고팔고, 뜨개인들이 소통하는 커뮤니티 앱입니다.

## 기술 스택

- **프론트엔드**: React Native + Expo SDK 52+ (TypeScript)
- **라우팅**: Expo Router v4 (파일 기반)
- **스타일링**: NativeWind (Tailwind CSS for React Native)
- **상태관리**: Zustand + TanStack Query v5
- **백엔드**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **결제**: PortOne (Iamport) - 한국 PG 연동

## 주요 기능

### 커뮤니티
- 5개 게시판: 뜨개잡담, 공지, 완성작품, 자투리마켓, 공방/뜨개샵
- 익명 게시글/댓글(대댓글), 이미지 첨부

### 도안 마켓플레이스
- 도안(PDF) 구매/판매
- 카테고리별 검색 (의류, 소품, 홈데코, 인형 등)
- 무료/유료 도안

### 사용자
- 소셜 로그인 (카카오, 구글, 애플)
- 마이페이지, 구매 내역, 다운로드 관리

## 시작하기

```bash
npm install
npx expo start
```

## 환경변수

`.env` 파일에 다음 값을 설정하세요:

```
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 프로젝트 구조

```
app/              # Expo Router 파일 기반 라우트
  (auth)/         # 인증 화면
  (tabs)/         # 메인 탭 (홈/커뮤니티/마켓/마이페이지)
  post/           # 게시글 상세/작성
src/
  components/     # UI 컴포넌트
  config/         # 테마, 상수
  hooks/          # 커스텀 훅
  services/       # Supabase 클라이언트
  stores/         # Zustand 상태 저장소
  types/          # TypeScript 타입
supabase/
  migrations/     # DB 스키마
```
