import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui';
import { useAuth } from '../../src/hooks/useAuth';
import { colors, typography, spacing } from '../../src/config/theme';

/**
 * 로그인 화면
 * - 카카오, 구글, 애플 소셜 로그인 (Supabase OAuth)
 * - 비회원 둘러보기
 */
export default function LoginScreen() {
  const router = useRouter();
  const { signInWithKakao, signInWithGoogle, signInWithApple } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleOAuthLogin = async (
    provider: 'kakao' | 'google' | 'apple',
    signInFn: () => Promise<void>,
  ) => {
    if (loadingProvider) return; // 이미 로그인 진행 중이면 무시
    setLoadingProvider(provider);
    try {
      await signInFn();
      // 인증 성공 시 onAuthStateChange가 자동으로 세션을 감지
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.';
      Alert.alert('로그인 실패', message);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const isLoading = loadingProvider !== null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 로고 & 슬로건 */}
        <View style={styles.header}>
          <Text style={styles.logo}>🧶</Text>
          <Text style={styles.appName}>뜨개마켓</Text>
          <Text style={styles.slogan}>도안으로 하나되는 뜨개인 커뮤니티</Text>
        </View>

        {/* 소셜 로그인 버튼 */}
        <View style={styles.loginButtons}>
          <Button
            title="카카오로 시작하기"
            onPress={() => handleOAuthLogin('kakao', signInWithKakao)}
            fullWidth
            style={styles.kakaoButton}
            loading={loadingProvider === 'kakao'}
            disabled={isLoading}
          />
          <Button
            title="Google로 시작하기"
            onPress={() => handleOAuthLogin('google', signInWithGoogle)}
            variant="secondary"
            fullWidth
            loading={loadingProvider === 'google'}
            disabled={isLoading}
          />
          {Platform.OS === 'ios' && (
            <Button
              title="Apple로 시작하기"
              onPress={() => handleOAuthLogin('apple', signInWithApple)}
              variant="secondary"
              fullWidth
              style={styles.appleButton}
              loading={loadingProvider === 'apple'}
              disabled={isLoading}
            />
          )}
        </View>

        {/* 비회원 둘러보기 */}
        <Button
          title="비회원으로 둘러보기"
          onPress={handleSkip}
          variant="ghost"
          style={styles.skipButton}
          disabled={isLoading}
        />
      </View>

      {/* 하단 약관 안내 */}
      <Text style={styles.terms}>
        시작하기를 누르면 서비스 이용약관 및{'\n'}개인정보 처리방침에 동의하는
        것으로 간주합니다.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  appName: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary[500],
    marginBottom: spacing.sm,
  },
  slogan: {
    fontSize: typography.sizes.base,
    color: colors.gray[500],
    textAlign: 'center',
  },
  loginButtons: {
    gap: spacing.md,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  skipButton: {
    marginTop: spacing.lg,
    alignSelf: 'center',
  },
  terms: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
    textAlign: 'center',
    lineHeight: 18,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing['3xl'],
  },
});
