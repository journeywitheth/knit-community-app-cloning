import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send } from 'lucide-react-native';
import { Card, Badge } from '../../src/components/ui';
import { colors, typography, spacing, borderRadius } from '../../src/config/theme';

// 샘플 데이터
const SAMPLE_POST = {
  id: '1',
  category: '뜨개잡담',
  title: '코바늘 처음 시작하는데 뭐부터 해야 할까요?',
  content: '안녕하세요! 뜨개질 완전 초보입니다.\n코바늘을 시작하고 싶은데, 어디서부터 시작해야 할지 모르겠어요.\n추천 도구나 실, 그리고 초보용 도안이 있다면 알려주세요! 🧶',
  time: '10분 전',
  comments: [
    { id: 'c1', content: '코바늘은 사슬뜨기부터 시작하세요! 유튜브에 좋은 강의 많아요 ☺️', time: '8분 전', replies: [] },
    { id: 'c2', content: '처음엔 면 100% 실에 4mm 코바늘 추천합니다. 수세미부터 만들어보세요!', time: '5분 전', replies: [
      { id: 'c2r1', content: '수세미 동의! 작고 빨리 완성돼서 성취감 있어요', time: '3분 전' },
    ]},
    { id: 'c3', content: '도아니티에 무료 도안도 많으니 둘러보세요~ 초보용도 있어요', time: '2분 전', replies: [] },
  ],
};

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');

  const post = SAMPLE_POST;

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    // TODO: Supabase에 댓글 저장
    setCommentText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 게시글 */}
        <Card style={styles.postCard}>
          <Badge text={post.category} />
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </Card>

        {/* 댓글 섹션 */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            댓글 {post.comments.length}
          </Text>
          {post.comments.map((comment) => (
            <View key={comment.id}>
              <View style={styles.comment}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>🧶</Text>
                </View>
                <View style={styles.commentBody}>
                  <Text style={styles.commentAuthor}>익명</Text>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
              </View>
              {/* 대댓글 */}
              {comment.replies.map((reply) => (
                <View key={reply.id} style={styles.reply}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.replyAvatarText}>🧶</Text>
                  </View>
                  <View style={styles.commentBody}>
                    <Text style={styles.commentAuthor}>익명</Text>
                    <Text style={styles.commentContent}>{reply.content}</Text>
                    <Text style={styles.commentTime}>{reply.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 댓글 입력 */}
      <View style={styles.commentInput}>
        <TextInput
          style={styles.commentTextInput}
          placeholder="댓글을 입력하세요..."
          placeholderTextColor={colors.gray[400]}
          value={commentText}
          onChangeText={setCommentText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !commentText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSubmitComment}
          disabled={!commentText.trim()}
        >
          <Send size={20} color={commentText.trim() ? colors.white : colors.gray[300]} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    margin: spacing.lg,
  },
  postTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.gray[900],
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  postContent: {
    fontSize: typography.sizes.base,
    color: colors.gray[700],
    lineHeight: 24,
  },
  postTime: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
    marginTop: spacing.lg,
  },
  commentsSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  commentsTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  commentAvatarText: {
    fontSize: 18,
  },
  replyAvatarText: {
    fontSize: 14,
  },
  commentBody: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.gray[700],
    marginBottom: 2,
  },
  commentContent: {
    fontSize: typography.sizes.sm,
    color: colors.gray[700],
    lineHeight: 20,
  },
  commentTime: {
    fontSize: typography.sizes.xs,
    color: colors.gray[400],
    marginTop: spacing.xs,
  },
  reply: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    marginLeft: spacing['3xl'],
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    gap: spacing.sm,
  },
  commentTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    fontSize: typography.sizes.sm,
    maxHeight: 100,
    color: colors.gray[800],
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray[100],
  },
});
