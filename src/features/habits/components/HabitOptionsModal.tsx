import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../design-system/components/Button/Button';
import { colors } from '../../../design-system/tokens/colors';
import { radius } from '../../../design-system/tokens/radius';
import { spacing } from '../../../design-system/tokens/spacing';
import { typography } from '../../../design-system/tokens/typography';

export function HabitOptionsModal({
  onEdit,
  onDelete,
  onClose,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop} />
      <SafeAreaView
        style={styles.container}
        accessibilityViewIsModal
        onAccessibilityEscape={onClose}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.dialog}>
            <Text accessibilityRole="header" style={styles.title}>
              Opções do hábito
            </Text>
            <Button
              label="Editar hábito"
              variant="secondary"
              onPress={onEdit}
            />
            <Button
              label="Excluir hábito"
              variant="danger"
              onPress={onDelete}
            />
            <Button label="Cancelar" variant="secondary" onPress={onClose} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.textPrimary,
    opacity: 0.25,
  },
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: spacing.xl },
  dialog: {
    backgroundColor: colors.habitCard,
    borderRadius: radius.control,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: { ...typography.habitName, color: colors.textPrimary },
});
