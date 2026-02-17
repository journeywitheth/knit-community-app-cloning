import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../config/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export function Card({ children, style, elevated = false }: CardProps) {
  return (
    <View style={[styles.card, elevated && shadows.md, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
    padding: spacing.lg,
  },
});
