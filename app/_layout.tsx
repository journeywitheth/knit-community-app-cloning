import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
 * 루트 레이아웃
 * - 전역 프로바이더 설정 (QueryClient, GestureHandler, SafeArea)
 * - 인증 상태에 따른 라우팅
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
