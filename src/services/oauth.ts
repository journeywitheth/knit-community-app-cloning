import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';
import { Platform } from 'react-native';

// 앱 스킴 기반 리다이렉트 URI
const redirectUri = makeRedirectUri({
  scheme: 'knit-community',
  path: 'auth/callback',
});

type OAuthProvider = 'kakao' | 'google' | 'apple';

/**
 * React Native에서 Supabase OAuth 인증을 수행합니다.
 *
 * 흐름:
 * 1. Supabase에서 OAuth URL을 받아옴 (PKCE 방식)
 * 2. expo-web-browser로 인앱 브라우저를 열어 인증 수행
 * 3. 콜백 URL에서 인증 코드를 추출
 * 4. Supabase에 코드를 교환하여 세션 생성
 */
export async function signInWithOAuth(provider: OAuthProvider) {
  // 1) Supabase에서 OAuth URL 생성 (브라우저 리다이렉트 건너뜀)
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUri,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;
  if (!data.url) throw new Error('OAuth URL을 받지 못했습니다.');

  // 2) 인앱 브라우저로 OAuth 페이지 열기
  const result = await WebBrowser.openAuthSessionAsync(
    data.url,
    redirectUri,
    {
      showInRecents: true,
      preferEphemeralSession: false,
    },
  );

  // 3) 사용자가 인증을 완료했는지 확인
  if (result.type !== 'success' || !result.url) {
    if (result.type === 'cancel' || result.type === 'dismiss') {
      throw new OAuthCancelledError();
    }
    throw new Error('OAuth 인증에 실패했습니다.');
  }

  // 4) 콜백 URL에서 토큰/코드 추출 및 세션 설정
  const url = new URL(result.url);

  // fragment (#) 기반 토큰 (implicit flow)
  const fragmentParams = new URLSearchParams(url.hash.substring(1));
  const accessToken = fragmentParams.get('access_token');
  const refreshToken = fragmentParams.get('refresh_token');

  if (accessToken) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || '',
    });
    if (sessionError) throw sessionError;
    return;
  }

  // query parameter 기반 코드 (PKCE flow)
  const code = url.searchParams.get('code');
  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) throw exchangeError;
    return;
  }

  // 에러 파라미터 확인
  const errorParam = url.searchParams.get('error_description')
    || fragmentParams.get('error_description');
  if (errorParam) {
    throw new Error(errorParam);
  }

  throw new Error('인증 응답에서 유효한 토큰을 찾을 수 없습니다.');
}

/**
 * 사용자가 OAuth 인증을 취소한 경우의 에러
 */
export class OAuthCancelledError extends Error {
  constructor() {
    super('사용자가 로그인을 취소했습니다.');
    this.name = 'OAuthCancelledError';
  }
}

export { redirectUri };
