import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import { colors } from '../../tokens/colors';
import { controls } from '../../tokens/controls';
import { radius } from '../../tokens/radius';

export type IconButtonProps = Pick<
  PressableProps,
  'onPress' | 'accessibilityHint' | 'testID'
> & {
  disabled?: boolean;
  variant?: 'default' | 'floating';
  accessibilityLabel: string;
  renderIcon: (props: { color: string; size: number }) => ReactNode;
};

export function IconButton({
  renderIcon,
  accessibilityLabel,
  disabled = false,
  variant = 'default',
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'floating' && styles.floating,
        pressed && !disabled && styles.pressed,
        pressed && !disabled && variant === 'floating' && styles.floating,
        disabled && styles.disabled,
      ]}
    >
      <View
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
      >
        {renderIcon({
          color: variant === 'floating' ? colors.onAction : colors.textPrimary,
          size:
            variant === 'floating'
              ? controls.floatingIconSize
              : controls.iconSize,
        })}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: controls.minTouchTarget,
    minWidth: controls.minTouchTarget,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.surface,
    opacity: controls.pressedOpacity,
  },
  floating: { backgroundColor: colors.floatingAction },
  disabled: { opacity: controls.disabledOpacity },
});
