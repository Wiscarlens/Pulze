/**
 * Road Signs Screen
 * Visual handbook of all road signs
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { signs, RoadSign, SignCategory, getSignCategories, searchSigns } from '../data/signs';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'RoadSigns'>;
};

const CATEGORY_TABS: { key: SignCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'regulatory', label: 'Regulatory' },
  { key: 'warning', label: 'Warning' },
  { key: 'guide', label: 'Guide' },
  { key: 'construction', label: 'Construction' },
];

const getSignIcon = (category: SignCategory): string => {
  switch (category) {
    case 'regulatory':
      return 'sign-caution';
    case 'warning':
      return 'alert';
    case 'guide':
      return 'directions';
    case 'construction':
      return 'hard-hat';
    default:
      return 'sign-direction';
  }
};

const getCategoryColor = (category: SignCategory): string => {
  switch (category) {
    case 'regulatory':
      return colors.error;
    case 'warning':
      return colors.warning;
    case 'guide':
      return colors.success;
    case 'construction':
      return '#FF6600';
    default:
      return colors.primary;
  }
};

const RoadSignsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SignCategory | 'all'>('all');
  const [selectedSign, setSelectedSign] = useState<RoadSign | null>(null);

  const filteredSigns = useMemo(() => {
    let result = signs;

    // Filter by search
    if (searchQuery.trim()) {
      result = searchSigns(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(s => s.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const renderSignItem = ({ item }: { item: RoadSign }) => (
    <TouchableOpacity
      style={styles.signCard}
      onPress={() => setSelectedSign(item)}
    >
      <View
        style={[
          styles.signIconContainer,
          { backgroundColor: getCategoryColor(item.category) + '20' },
        ]}
      >
        <Icon
          name={getSignIcon(item.category)}
          size={40}
          color={getCategoryColor(item.category)}
        />
      </View>
      <Text style={styles.signName} numberOfLines={2}>
        {item.name}
      </Text>
      <View
        style={[
          styles.categoryBadge,
          { backgroundColor: getCategoryColor(item.category) + '20' },
        ]}
      >
        <Text
          style={[
            styles.categoryBadgeText,
            { color: getCategoryColor(item.category) },
          ]}
        >
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('signs.title')}</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.grayText} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('signs.searchPlaceholder')}
          placeholderTextColor={colors.grayText}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={colors.grayText} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORY_TABS.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedCategory === tab.key && styles.tabActive,
              ]}
              onPress={() => setSelectedCategory(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === tab.key && styles.tabTextActive,
                ]}
              >
                {t(`signs.${tab.key}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Signs Grid */}
      <FlatList
        data={filteredSigns}
        renderItem={renderSignItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="sign-direction" size={60} color={colors.borderGray} />
            <Text style={styles.emptyText}>{t('empty.noResults')}</Text>
            <Text style={styles.emptySubtext}>{t('empty.tryDifferent')}</Text>
          </View>
        }
      />

      {/* Sign Detail Modal */}
      <Modal
        visible={selectedSign !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedSign(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedSign && (
              <>
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.modalIconContainer,
                      { backgroundColor: getCategoryColor(selectedSign.category) + '20' },
                    ]}
                  >
                    <Icon
                      name={getSignIcon(selectedSign.category)}
                      size={60}
                      color={getCategoryColor(selectedSign.category)}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.modalClose}
                    onPress={() => setSelectedSign(null)}
                  >
                    <Icon name="close" size={24} color={colors.darkText} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{selectedSign.name}</Text>

                <View
                  style={[
                    styles.modalCategoryBadge,
                    { backgroundColor: getCategoryColor(selectedSign.category) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalCategoryText,
                      { color: getCategoryColor(selectedSign.category) },
                    ]}
                  >
                    {selectedSign.category.charAt(0).toUpperCase() +
                      selectedSign.category.slice(1)}{' '}
                    Sign
                  </Text>
                </View>

                <Text style={styles.modalDescription}>
                  {selectedSign.description}
                </Text>

                {selectedSign.relatedQuestionIds.length > 0 && (
                  <TouchableOpacity
                    style={styles.practiceButton}
                    onPress={() => {
                      setSelectedSign(null);
                      // Navigate to study mode with related questions
                      navigation.navigate('StudyMode', {
                        categoryId: 'road_signs',
                      });
                    }}
                  >
                    <Icon name="book-open-variant" size={20} color={colors.white} />
                    <Text style={styles.practiceButtonText}>
                      {t('signs.practiceQuestions')}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.darkText,
    padding: 0,
  },
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.lightGray,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.grayText,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.white,
  },
  gridContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  signCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadow.light,
  },
  signIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  signName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl * 2,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkText,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.grayText,
    marginTop: spacing.xs,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.xs,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  modalCategoryBadge: {
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  modalCategoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalDescription: {
    fontSize: 16,
    color: colors.darkText,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  practiceButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoadSignsScreen;
