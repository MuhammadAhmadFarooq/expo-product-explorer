import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  accent: string;
};

const products: Product[] = [
  { id: '1', name: 'Studio Headphones', category: 'Audio', price: 149, emoji: '🎧', accent: '#E0E7FF' },
  { id: '2', name: 'Pocket Speaker', category: 'Audio', price: 79, emoji: '🔊', accent: '#DBEAFE' },
  { id: '3', name: 'Trail Backpack', category: 'Travel', price: 96, emoji: '🎒', accent: '#DCFCE7' },
  { id: '4', name: 'Everyday Camera', category: 'Tech', price: 429, emoji: '📷', accent: '#FEF3C7' },
  { id: '5', name: 'Smart Watch', category: 'Tech', price: 189, emoji: '⌚', accent: '#FCE7F3' },
  { id: '6', name: 'Travel Bottle', category: 'Travel', price: 32, emoji: '🧴', accent: '#CCFBF1' },
];

const categories = ['All', 'Audio', 'Tech', 'Travel'];

export default function HomeScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 || product.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  function toggleFavorite(productId: string) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((favoriteId) => favoriteId !== productId)
        : [...current, productId],
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <FlatList
          data={visibleProducts}
          extraData={favorites}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.topLine}>
                <View style={styles.badge}>
                  <ThemedText style={styles.badgeText}>PRODUCT EXPLORER</ThemedText>
                </View>
                <ThemedText
                  accessibilityLiveRegion="polite"
                  type="small"
                  themeColor="textSecondary">
                  {favorites.length} saved
                </ThemedText>
              </View>

              <View style={styles.hero}>
                <ThemedText type="title" style={styles.title}>
                  Find your next favorite.
                </ThemedText>
                <ThemedText themeColor="textSecondary">
                  Search a small, curated collection made with Expo Router.
                </ThemedText>
              </View>

              <TextInput
                accessibilityLabel="Search products"
                accessibilityRole="search"
                placeholder="Search products"
                placeholderTextColor={theme.textSecondary}
                value={query}
                onChangeText={setQuery}
                style={[
                  styles.searchInput,
                  { color: theme.text, backgroundColor: theme.backgroundElement },
                ]}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categories}>
                {categories.map((item) => {
                  const isSelected = item === category;
                  return (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ selected: isSelected }}
                      key={item}
                      onPress={() => setCategory(item)}
                      style={({ pressed }) => [
                        styles.categoryButton,
                        {
                          backgroundColor: isSelected ? '#4F46E5' : theme.backgroundElement,
                          opacity: pressed ? 0.75 : 1,
                        },
                      ]}>
                      <ThemedText
                        type="smallBold"
                        style={isSelected ? styles.selectedCategoryText : undefined}>
                        {item}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View style={styles.sectionHeading}>
                <ThemedText accessibilityRole="header" type="subtitle" style={styles.sectionTitle}>
                  Featured products
                </ThemedText>
                <ThemedText
                  accessibilityLiveRegion="polite"
                  type="small"
                  themeColor="textSecondary">
                  {visibleProducts.length} results
                </ThemedText>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            const isFavorite = favorites.includes(item.id);
            return (
              <ThemedView type="backgroundElement" style={styles.productCard}>
                <View style={[styles.productVisual, { backgroundColor: item.accent }]}>
                  <ThemedText accessible={false} style={styles.productEmoji}>
                    {item.emoji}
                  </ThemedText>
                  <Pressable
                    accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${item.name} ${
                      isFavorite ? 'from' : 'to'
                    } favorites`}
                    accessibilityRole="button"
                    accessibilityState={{ checked: isFavorite }}
                    onPress={() => toggleFavorite(item.id)}
                    style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}>
                    <ThemedText style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</ThemedText>
                  </Pressable>
                </View>
                <View style={styles.productDetails}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.category.toUpperCase()}
                  </ThemedText>
                  <ThemedText type="smallBold" numberOfLines={2}>
                    {item.name}
                  </ThemedText>
                  <ThemedText>${item.price}</ThemedText>
                </View>
              </ThemedView>
            );
          }}
          ListEmptyComponent={
            <ThemedView type="backgroundElement" style={styles.emptyState}>
              <ThemedText type="subtitle" style={styles.emptyTitle}>
                No products found
              </ThemedText>
              <ThemedText themeColor="textSecondary">Try another search or category.</ThemedText>
            </ThemedView>
          }
          ListFooterComponent={
            <ThemedView type="backgroundElement" style={styles.studentCard}>
              <ThemedText type="small" style={styles.label}>
                CREATED BY
              </ThemedText>
              <ThemedText type="smallBold">Ahmad · Roll No. 22i-2711</ThemedText>
            </ThemedView>
          }
        />
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
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.six,
    gap: Spacing.three,
  },
  header: {
    gap: Spacing.four,
    marginBottom: Spacing.one,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
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
    gap: Spacing.two,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
  },
  searchInput: {
    minHeight: 52,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  categories: {
    gap: Spacing.two,
  },
  categoryButton: {
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 32,
  },
  productRow: {
    gap: Spacing.three,
  },
  productCard: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: Spacing.four,
  },
  productVisual: {
    minHeight: 132,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 48,
    lineHeight: 60,
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  favoriteIcon: {
    color: '#4F46E5',
    fontSize: 24,
    lineHeight: 28,
  },
  pressed: {
    opacity: 0.65,
  },
  productDetails: {
    minHeight: 112,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  emptyState: {
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: Spacing.four,
    padding: Spacing.five,
  },
  emptyTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  studentCard: {
    marginTop: Spacing.three,
    gap: Spacing.one,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  label: {
    color: '#4F46E5',
    fontWeight: '800',
    letterSpacing: 1.2,
  },
});
