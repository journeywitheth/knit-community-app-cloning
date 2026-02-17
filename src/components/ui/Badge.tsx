import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../config/theme';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: colors.primary[100], text: colors.primary[700] },
  secondary: { bg: colors.gray[100], text: colors.gray[700] },
  success: { bg: '#D1FAE5', text: '#065F46' },
  warning: { bg: '#FEF3C7', text: '#92400E' },
  error: { bg: '#FEE2E2', text: '#991B1B' },
};

export function Badge({ text, variant = 'secondary', style }: BadgeProps) {
  const colorSet = variantColors[variant];

  return (
    <View style={[styles.badge, { backgroundColor: colorSet.bg }, style]}>
      <Text style={[styles.text, { color: colorSet.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
});
