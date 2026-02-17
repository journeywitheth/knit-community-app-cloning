import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../config/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.gray[400]}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.base,
    color: colors.gray[900],
    backgroundColor: colors.white,
  },
  inputFocused: {
    borderColor: colors.primary[500],
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.status.error,
    marginTop: spacing.xs,
  },
});
