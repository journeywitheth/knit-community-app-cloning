import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../config/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
}: ButtonProps) {
  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style as ViewStyle,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary[500]}
        />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // 변형
  variant_primary: {
    backgroundColor: colors.primary[500],
  },
  variant_secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  variant_danger: {
    backgroundColor: colors.status.error,
  },

  // 크기
  size_sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  size_md: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  size_lg: {
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
  },

  // 텍스트
  text: {
    fontWeight: typography.weights.semibold,
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.gray[700],
  },
  text_ghost: {
    color: colors.primary[500],
  },
  text_danger: {
    color: colors.white,
  },

  textSize_sm: {
    fontSize: typography.sizes.sm,
  },
  textSize_md: {
    fontSize: typography.sizes.base,
  },
  textSize_lg: {
    fontSize: typography.sizes.lg,
  },
});
