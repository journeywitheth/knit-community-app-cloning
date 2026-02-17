import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image as ImageIcon, X } from 'lucide-react-native';
import { Button, Input } from '../../src/components/ui';
import { COMMUNITY_CATEGORIES } from '../../src/config/constants';
import { colors, typography, spacing, borderRadius } from '../../src/config/theme';

const WRITABLE_CATEGORIES = COMMUNITY_CATEGORIES.filter(
  (c) => c.key !== 'all' && c.key !== 'doanity'
);

export default function CreatePostScreen() {
  const router = useRouter();
  const [category, setCategory] = useState(WRITABLE_CATEGORIES[0].key);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }
    // TODO: Supabase에 게시글 저장
    Alert.alert('알림', '게시글이 작성되었습니다.', [
      { text: '확인', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 카테고리 선택 */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>카테고리</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryRow}>
            {WRITABLE_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryChip,
                  category === cat.key && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat.key)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat.key && styles.categoryChipTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 제목 */}
      <View style={styles.section}>
        <Input
          label="제목"
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />
      </View>

      {/* 내용 */}
      <View style={styles.section}>
        <Input
          label="내용"
          placeholder="내용을 입력하세요..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          style={styles.contentInput}
          maxLength={5000}
        />
      </View>

      {/* 이미지 첨부 */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.imageButton}>
          <ImageIcon size={20} color={colors.gray[500]} />
          <Text style={styles.imageButtonText}>사진 첨부 (최대 10장)</Text>
        </TouchableOpacity>
      </View>

      {/* 안내 */}
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          ⚠️ 커뮤니티는 익명으로 운영됩니다.{'\n'}
          개인을 특정할 수 있는 정보를 남기지 마세요.
        </Text>
      </View>

      {/* 작성 버튼 */}
      <View style={styles.submitSection}>
        <Button title="작성하기" onPress={handleSubmit} fullWidth size="lg" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[100],
  },
  categoryChipActive: {
    backgroundColor: colors.primary[500],
  },
  categoryChipText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    fontWeight: typography.weights.medium,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    borderStyle: 'dashed',
  },
  imageButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.gray[500],
  },
  notice: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.primary[50],
    borderRadius: borderRadius.md,
  },
  noticeText: {
    fontSize: typography.sizes.xs,
    color: colors.primary[700],
    lineHeight: 18,
  },
  submitSection: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
});
