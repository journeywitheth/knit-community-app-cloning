import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../stores/authStore';
import type { Profile } from '../types/database';

/**
 * 인증 상태를 관리하는 훅
 * - Supabase Auth 세션 변화를 감지
 * - 로그인/로그아웃 함수 제공
 */
export function useAuth() {
  const { setAuth, clearAuth, setLoading, isAuthenticated, isLoading, profile } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // 세션 변화 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        clearAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setAuth(userId, data as Profile);
    } catch {
      // 프로필이 없으면 기본 프로필로 설정
      setAuth(userId, {
        id: userId,
        role: 'doaniter',
        display_name: null,
        avatar_url: null,
        is_restricted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }

  async function signInWithKakao() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) throw error;
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  }

  async function signInWithApple() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    clearAuth();
    router.replace('/(auth)/login');
  }

  return {
    isAuthenticated,
    isLoading,
    profile,
    signInWithKakao,
    signInWithGoogle,
    signInWithApple,
    signOut,
  };
}
