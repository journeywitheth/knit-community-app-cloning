import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShoppingBag,
  Download,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  HelpCircle,
} from 'lucide-react-native';
import { Card } from '../../../src/components/ui';
import { colors, typography, spacing, borderRadius } from '../../../src/config/theme';

/**
 * 마이페이지
 * - 프로필 정보
 * - 구매 내역
 * - 다운로드 내역
 * - 설정
 */
export default function MyPageScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: ShoppingBag, label: '구매 내역', description: '구매한 도안 목록', onPress: () => {} },
    { icon: Download, label: '다운로드', description: '다운로드한 도안', onPress: () => {} },
    { icon: Bell, label: '알림 설정', description: '푸시 알림 관리', onPress: () => {} },
    { icon: HelpCircle, label: '도움말', description: '자주 묻는 질문', onPress: () => {} },
    { icon: Settings, label: '설정', description: '앱 설정', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 프로필 카드 */}
      <Card style={styles.profileCard} elevated>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🧶</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.displayName}>익명의 도아니터</Text>
            <Text style={styles.role}>일반 회원</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.loginPrompt}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginPromptText}>로그인하여 더 많은 기능을 이용하세요</Text>
          <ChevronRight size={16} color={colors.primary[500]} />
        </TouchableOpacity>
      </Card>

      {/* 활동 요약 */}
      <View style={styles.statsRow}>
        {[
          { label: '구매 도안', value: '0' },
          { label: '작성 글', value: '0' },
          { label: '댓글', value: '0' },
        ].map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* 메뉴 목록 */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <item.icon size={20} color={colors.gray[600]} />
              <View style={styles.menuItemText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.gray[300]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* 로그아웃 */}
      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={18} color={colors.status.error} />
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>

      {/* 앱 버전 */}
      <Text style={styles.version}>뜨개마켓 v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  profileCard: {
    margin: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.gray[900],
  },
  role: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
    marginTop: 2,
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  loginPromptText: {
    fontSize: typography.sizes.sm,
    color: colors.primary[500],
    fontWeight: typography.weights.medium,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.gray[900],
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.gray[500],
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuItemText: {
    gap: 2,
  },
  menuLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.gray[800],
  },
  menuDescription: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing['2xl'],
    paddingVertical: spacing.lg,
  },
  logoutText: {
    fontSize: typography.sizes.base,
    color: colors.status.error,
    fontWeight: typography.weights.medium,
  },
  version: {
    fontSize: typography.sizes.xs,
    color: colors.gray[300],
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing['4xl'],
  },
});
