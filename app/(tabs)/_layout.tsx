import React from 'react';
import { Tabs } from 'expo-router';
import { Home, MessageSquare, ShoppingBag, User } from 'lucide-react-native';
import { colors, typography } from '../../src/config/theme';

/**
 * 메인 탭 네비게이션
 * 4개 탭: 홈, 커뮤니티, 도안마켓, 마이페이지
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarLabelStyle: {
          fontSize: typography.sizes.xs,
          fontWeight: typography.weights.medium,
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray[200],
          paddingTop: 4,
        },
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: colors.gray[900],
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
          headerTitle: '뜨개마켓',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: '도안마켓',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
