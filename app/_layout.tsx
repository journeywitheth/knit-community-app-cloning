import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '../src/hooks/useAuth';
import { colors } from '../src/config/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 2,
    },
  },
});

/**
 * 인증 상태에 따라 자동으로 라우팅을 보호합니다.
 * - 인증된 사용자가 로그인 화면에 있으면 → (tabs) 로 이동
 * - 비회원 둘러보기는 인증 없이도 (tabs) 접근 가능
 */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
}

/**
 * 루트 레이아웃
 * - 전역 프로바이더 설정 (QueryClient, GestureHandler, SafeArea)
 * - AuthGuard를 통한 인증 기반 라우팅 보호
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthGuard>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: colors.white,
                },
                headerTintColor: colors.gray[900],
                headerTitleStyle: {
                  fontWeight: '600',
                },
                headerShadowVisible: false,
                contentStyle: {
                  backgroundColor: colors.gray[50],
                },
              }}
            >
              <Stack.Screen
                name="(auth)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="post/[id]"
                options={{ title: '게시글' }}
              />
              <Stack.Screen
                name="post/create"
                options={{ title: '글쓰기', presentation: 'modal' }}
              />
            </Stack>
          </AuthGuard>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
