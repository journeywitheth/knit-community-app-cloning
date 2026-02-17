import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Card, Badge } from '../../../src/components/ui';
import { COMMUNITY_CATEGORIES } from '../../../src/config/constants';
import { colors, typography, spacing, borderRadius } from '../../../src/config/theme';

// 샘플 데이터 (실제로는 Supabase에서 가져옴)
const SAMPLE_POSTS = [
  { id: '1', category: 'knitting_chat', categoryLabel: '뜨개잡담', title: '코바늘 처음 시작하는데 뭐부터 해야 할까요?', comments: 15, time: '10분 전' },
  { id: '2', category: 'finished_works', categoryLabel: '완성작품', title: '첫 코위찬 완성! 3개월 걸렸어요 ㅎㅎ', comments: 32, time: '1시간 전' },
  { id: '3', category: 'scrap_market', categoryLabel: '자투리마켓', title: '자투리 실 나눔 (서울 강남)', comments: 8, time: '2시간 전' },
  { id: '4', category: 'knitting_chat', categoryLabel: '뜨개잡담', title: '겨울 가디건 추천해주세요!', comments: 21, time: '3시간 전' },
  { id: '5', category: 'studios_shops', categoryLabel: '공방/뜨개샵', title: '홍대 근처 뜨개 공방 추천', comments: 6, time: '5시간 전' },
  { id: '6', category: 'doanity', categoryLabel: '도아니티', title: '[공지] 커뮤니티 이용 규칙 업데이트', comments: 3, time: '1일 전', pinned: true },
];

export default function CommunityScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* 카테고리 탭 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      >
        {COMMUNITY_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryTab,
              selectedCategory === cat.key && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === cat.key && styles.categoryTabTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 게시글 목록 */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/post/${item.id}`)}
            activeOpacity={0.7}
          >
            <Card style={styles.postCard}>
              <View style={styles.postHeader}>
                <Badge text={item.categoryLabel} />
                {('pinned' in item && item.pinned) && (
                  <Badge text="고정" variant="primary" />
                )}
              </View>
              <Text style={styles.postTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.postFooter}>
                <Text style={styles.postMeta}>댓글 {item.comments}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* 글쓰기 FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/post/create')}
        activeOpacity={0.8}
      >
        <Plus size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  categoryTabs: {
    backgroundColor: colors.white,
    maxHeight: 48,
  },
  categoryTabsContent: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryTab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[100],
  },
  categoryTabActive: {
    backgroundColor: colors.primary[500],
  },
  categoryTabText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.gray[600],
  },
  categoryTabTextActive: {
    color: colors.white,
  },
  listContent: {
    padding: spacing.lg,
  },
  postCard: {
    padding: spacing.lg,
  },
  postHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  postTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
    color: colors.gray[800],
    lineHeight: 22,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  postMeta: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
  },
  postTime: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
  },
  separator: {
    height: spacing.sm,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
