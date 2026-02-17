import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Card, Badge } from '../../src/components/ui';
import { colors, typography, spacing, borderRadius } from '../../src/config/theme';

/**
 * 홈 화면
 * - 인기 도안
 * - 최신 커뮤니티 글
 * - 카테고리 바로가기
 */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 배너 */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>도안을 사고 파는{'\n'}가장 쉬운 방법 🧶</Text>
        <Text style={styles.bannerSubtitle}>
          뜨개 도안을 판매하고, 원하는 도안을 찾아보세요
        </Text>
      </View>

      {/* 카테고리 바로가기 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>카테고리</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {[
            { label: '의류', icon: '👕' },
            { label: '소품', icon: '🧣' },
            { label: '홈데코', icon: '🏠' },
            { label: '인형', icon: '🧸' },
            { label: '무료도안', icon: '🎁' },
          ].map((cat) => (
            <TouchableOpacity
              key={cat.label}
              style={styles.categoryItem}
              onPress={() => router.push('/market')}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 인기 도안 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>인기 도안</Text>
          <TouchableOpacity onPress={() => router.push('/market')}>
            <Text style={styles.seeAll}>전체보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.patternRow}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} style={styles.patternCard} elevated>
              <View style={styles.patternImage}>
                <Text style={styles.patternPlaceholder}>🧶</Text>
              </View>
              <Text style={styles.patternTitle} numberOfLines={1}>
                샘플 도안 {i}
              </Text>
              <View style={styles.patternMeta}>
                <Badge text={i % 2 === 0 ? '무료' : '₩5,000'} variant={i % 2 === 0 ? 'success' : 'primary'} />
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* 최신 커뮤니티 글 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>커뮤니티</Text>
          <TouchableOpacity onPress={() => router.push('/community')}>
            <Text style={styles.seeAll}>전체보기</Text>
          </TouchableOpacity>
        </View>
        {[
          { title: '초보 질문이요! 코바늘 처음 시작하는데...', category: '뜨개잡담', comments: 12 },
          { title: '첫 코위찬 완성했어요!', category: '완성작품', comments: 24 },
          { title: '자투리 실 나눔합니다 (서울)', category: '자투리마켓', comments: 5 },
        ].map((post, i) => (
          <Card key={i} style={styles.postCard}>
            <Badge text={post.category} />
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postMeta}>댓글 {post.comments}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  banner: {
    backgroundColor: colors.primary[500],
    padding: spacing['2xl'],
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['3xl'],
  },
  bannerTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.primary[100],
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  seeAll: {
    fontSize: typography.sizes.sm,
    color: colors.primary[500],
    marginBottom: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: spacing.xl,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  categoryLabel: {
    fontSize: typography.sizes.sm,
    color: colors.gray[700],
  },
  patternRow: {
    flexDirection: 'row',
  },
  patternCard: {
    width: 150,
    marginRight: spacing.md,
    padding: spacing.md,
  },
  patternImage: {
    height: 120,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  patternPlaceholder: {
    fontSize: 40,
  },
  patternTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  patternMeta: {
    flexDirection: 'row',
  },
  postCard: {
    marginBottom: spacing.sm,
  },
  postTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.gray[800],
    marginTop: spacing.sm,
  },
  postMeta: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
    marginTop: spacing.xs,
  },
  bottomSpacer: {
    height: spacing['3xl'],
  },
});
