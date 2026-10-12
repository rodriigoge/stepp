import { useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
} from 'react-native';
import { colors } from '../../../design-system/tokens/colors';
import {
  fontFamilies,
  typography,
} from '../../../design-system/tokens/typography';

export function StreakIndicator({
  value,
  recordId,
  inline = false,
}: {
  value: number;
  recordId?: number;
  inline?: boolean;
}) {
  const label = value === 1 ? 'dia seguido' : 'dias seguidos';
  const opacity = useAnimatedValue(1);
  const showRecord = recordId !== undefined;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.65,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, value]);

  return (
    <View style={styles.container}>
      <View
        accessible
        accessibilityLabel={value + ' ' + label}
        style={styles.metric}
      >
        {inline ? (
          <Animated.Text style={[styles.inline, { opacity }]}>
            {value} {label}
          </Animated.Text>
        ) : (
          <>
            <Animated.Text style={[styles.value, { opacity }]}>
              {value}
            </Animated.Text>
            <Text style={styles.label}>{label}</Text>
          </>
        )}
      </View>
      {showRecord && (
        <Text accessibilityLiveRegion="polite" style={styles.record}>
          NOVO RECORDE
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'flex-end' },
  metric: { alignItems: 'flex-end' },
  inline: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  value: {
    ...typography.metric,
    lineHeight: typography.metric.fontSize,
    includeFontPadding: false,
    color: colors.textPrimary,
  },
  label: {
    ...typography.caption,
    includeFontPadding: false,
    color: colors.textSecondary,
  },
  record: {
    ...typography.caption,
    fontFamily: fontFamilies.bold,
    color: colors.accent,
  },
});
