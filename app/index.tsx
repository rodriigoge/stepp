import { useRouter } from 'expo-router';
import { useState } from 'react';
import { HabitFormSheet } from '../src/features/habits/components/HabitFormSheet';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from '../src/design-system/components/IconButton/IconButton';
import { colors } from '../src/design-system/tokens/colors';
import { controls } from '../src/design-system/tokens/controls';
import { radius } from '../src/design-system/tokens/radius';
import { spacing } from '../src/design-system/tokens/spacing';
import { typography } from '../src/design-system/tokens/typography';
import { HabitCard } from '../src/features/habits/components/HabitCard';
import { useHabits } from '../src/features/habits/hooks/useHabits';
import { Button } from '../src/design-system/components/Button/Button';
import { formatLocalDate } from '../src/shared/date/dateUtils';

export default function Home() {
  const router = useRouter();
  const {
    habits,
    loading,
    error,
    today,
    refresh,
    createHabit,
    toggleDay,
    completionError,
    recordFeedback,
  } = useHabits();
  const [creating, setCreating] = useState(false);
  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={styles.body}
        accessibilityElementsHidden={creating}
        importantForAccessibility={creating ? 'no-hide-descendants' : 'auto'}
      >
        <FlatList
          data={habits}
          keyExtractor={(habit) => habit.id}
          renderItem={({ item }) => (
            <HabitCard
              onPress={() =>
                router.push({
                  pathname: '/habit/[id]',
                  params: { id: item.id },
                })
              }
              habit={item}
              today={today}
              onToggleDay={(date) => toggleDay(item.id, date)}
              error={
                completionError?.habitId === item.id
                  ? completionError.message
                  : undefined
              }
              recordId={
                recordFeedback?.habitId === item.id
                  ? recordFeedback.id
                  : undefined
              }
            />
          )}
          ItemSeparatorComponent={HabitSpacing}
          contentContainerStyle={styles.content}
          ListEmptyComponent={
            !loading && !error ? (
              <View style={styles.empty}>
                <Text accessibilityRole="header" style={styles.title}>
                  Nenhum hábito ainda
                </Text>
                <Text style={styles.date}>
                  Crie um hábito e acompanhe sua evolução todos os dias.
                </Text>
                <Button
                  label="Criar primeiro hábito"
                  onPress={() => setCreating(true)}
                />
              </View>
            ) : null
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text accessibilityRole="header" style={styles.title}>
                Meus hábitos
              </Text>
              <Text style={styles.date}>
                {formatLocalDate(today, { day: 'numeric', month: 'long' })}
              </Text>
              {loading && (
                <Text style={styles.date} accessibilityLiveRegion="polite">
                  Carregando hábitos…
                </Text>
              )}
              {error && (
                <View>
                  <Text accessibilityRole="alert" style={styles.date}>
                    {error}
                  </Text>
                  <Button label="Tentar novamente" onPress={refresh} />
                </View>
              )}
            </View>
          }
        />
        <View style={styles.action}>
          <IconButton
            variant="floating"
            accessibilityLabel="Criar hábito"
            onPress={() => setCreating(true)}
            disabled={loading || Boolean(error)}
            renderIcon={({ color, size }) => (
              <View style={{ width: size, height: size }}>
                <View
                  style={[styles.plusHorizontal, { backgroundColor: color }]}
                />
                <View
                  style={[styles.plusVertical, { backgroundColor: color }]}
                />
              </View>
            )}
          />
        </View>
      </View>
      {creating && (
        <HabitFormSheet
          onSave={createHabit}
          onClose={() => setCreating(false)}
        />
      )}
    </SafeAreaView>
  );
}
function HabitSpacing() {
  return <View style={styles.habitSpacing} />;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1 },
  habitSpacing: { height: spacing.md },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl * 2 },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  empty: { paddingVertical: spacing.xxxl, gap: spacing.lg },
  title: { ...typography.title, color: colors.textPrimary },
  date: { ...typography.body, color: colors.textSecondary },
  action: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.round,
    backgroundColor: colors.floatingAction,
  },
  plusHorizontal: {
    position: 'absolute',
    top: (controls.floatingIconSize - controls.floatingIconStrokeWidth) / 2,
    width: controls.floatingIconSize,
    height: controls.floatingIconStrokeWidth,
    borderRadius: controls.floatingIconStrokeWidth / 2,
  },
  plusVertical: {
    position: 'absolute',
    left: (controls.floatingIconSize - controls.floatingIconStrokeWidth) / 2,
    width: controls.floatingIconStrokeWidth,
    height: controls.floatingIconSize,
    borderRadius: controls.floatingIconStrokeWidth / 2,
  },
});
