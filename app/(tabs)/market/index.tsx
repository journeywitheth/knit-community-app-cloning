import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Input, Badge } from '../../../src/components/ui';
import { PATTERN_CATEGORIES } from '../../../src/config/constants';
import { colors, typography, spacing, borderRadius, shadows } from '../../../src/config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - spacing.lg * 3) / 2;

// 샘플 데이터
const SAMPLE_PATTERNS = [
  { id: '1', title: '럭키 코위찬', price: 9800, isFree: false, category: 'clothing', seller: '니트작가A', image: '🧶' },
  { id: '2', title: '갸우뚱 오리', price: 0, isFree: true, category: 'toys', seller: '도아너B', image: '🦆' },
  { id: '3', title: '밴쿠버 가디건', price: 11000, isFree: false, category: 'clothing', seller: '니트디자인C', image: '🧥' },
  { id: '4', title: '고양이 티코스터', price: 3500, isFree: false, category: 'accessories', seller: '크로셰D', image: '🐱' },
  { id: '5', title: '암스테르담 가디건', price: 10000, isFree: false, category: 'clothing', seller: '니트작가E', image: '👕' },
  { id: '6', title: '네잎클로버 장식', price: 0, isFree: true, category: 'accessories', seller: '도아너F', image: '🍀' },
  { id: '7', title: '듀오 뷔스티에', price: 8500, isFree: false, category: 'clothing', seller: '패턴G', image: '👗' },
  { id: '8', title: '에어팟 파우치', price: 4000, isFree: false, category: 'accessories', seller: '크로셰H', image: '🎧' },
];

export default function MarketScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatterns = SAMPLE_PATTERNS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.title.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  function formatPrice(price: number, isFree: boolean) {
    if (isFree) return '무료';
    return `₩${price.toLocaleString()}`;
  }

  return (
    <View style={styles.container}>
      {/* 검색바 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color={colors.gray[400]} />
          <Input
            placeholder="도안 검색..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.searchInput}
            style={styles.searchInputInner}
          />
        </View>
      </View>

      {/* 카테고리 탭 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      >
        {PATTERN_CATEGORIES.map((cat) => (
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

      {/* 도안 그리드 */}
      <FlatList
        data={filteredPatterns}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.patternCard, shadows.sm]}
            onPress={() => {
              // TODO: 도안 상세 페이지로 이동
            }}
            activeOpacity={0.7}
          >
            <View style={styles.patternImage}>
              <Text style={styles.patternImagePlaceholder}>{item.image}</Text>
            </View>
            <View style={styles.patternInfo}>
              <Text style={styles.patternTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.patternSeller}>{item.seller}</Text>
              <Badge
                text={formatPrice(item.price, item.isFree)}
                variant={item.isFree ? 'success' : 'primary'}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
    paddingLeft: spacing.md,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  searchInputInner: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
  },
  categoryTabs: {
    backgroundColor: colors.white,
    maxHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
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
  gridContent: {
    padding: spacing.lg,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  patternCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  patternImage: {
    height: CARD_WIDTH,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternImagePlaceholder: {
    fontSize: 48,
  },
  patternInfo: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  patternTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.gray[800],
  },
  patternSeller: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
  },
});
