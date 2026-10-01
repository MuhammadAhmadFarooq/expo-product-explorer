import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>PRODUCT EXPLORER</ThemedText>
        </View>

        <View style={styles.hero}>
          <ThemedText type="title" style={styles.title}>
            Find something worth discovering.
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            A focused Expo experience for browsing everyday products.
          </ThemedText>
        </View>

        <ThemedView type="backgroundElement" style={styles.studentCard}>
          <ThemedText type="small" style={styles.label}>
            CREATED BY
          </ThemedText>
          <ThemedText type="subtitle">Ahmad</ThemedText>
          <ThemedText type="code">Roll No. 22i-2711</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.five,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#4F46E5',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.three,
  },
  title: {
    fontSize: 44,
    lineHeight: 50,
  },
  subtitle: {
    color: '#6B7280',
    lineHeight: 28,
  },
  studentCard: {
    gap: Spacing.two,
    borderRadius: Spacing.four,
    padding: Spacing.four,
  },
  label: {
    color: '#4F46E5',
    fontWeight: '800',
    letterSpacing: 1.2,
  },
});
