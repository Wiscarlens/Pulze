/**
 * Home Screen
 * Main dashboard and navigation hub
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { storageService, UserSettings, CategoryProgress } from '../services/storage';
import { getQuestionsByCategory } from '../data/questions';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [examReadiness, setExamReadiness] = useState(0);
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const [settings, readiness, progress] = await Promise.all([
      storageService.getUserSettings(),
      storageService.getExamReadiness(),
      storageService.getCategoryProgress(),
    ]);
    setUserSettings(settings);
    setExamReadiness(readiness);
    setCategoryProgress(progress);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getReadinessMessage = () => {
    if (examReadiness < 60) return t('home.keepPracticing');
    if (examReadiness < 80) return t('home.almostReady');
    return t('home.ready');
  };

  const getReadinessColor = () => {
    if (examReadiness < 60) return colors.error;
    if (examReadiness < 80) return colors.warning;
    return colors.success;
  };

  const getCategoryQuestionCount = (categoryId: string) => {
    return getQuestionsByCategory(categoryId).length;
  };

  const getCategoryProgressPercent = (categoryId: string) => {
    const progress = categoryProgress.find(p => p.categoryId === categoryId);
    if (!progress || progress.questionsAttempted === 0) return 0;
    return Math.round((progress.questionsCorrect / progress.questionsAttempted) * 100);
  };

  const greeting = userSettings?.displayName
    ? t('home.greeting', { name: userSettings.displayName })
    : t('home.greetingDefault');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="account-circle" size={50} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Exam Readiness Card */}
      <TouchableOpacity
        style={styles.readinessCard}
        onPress={() => navigation.navigate('Progress')}
      >
        <View style={styles.readinessContent}>
          <View style={styles.readinessCircle}>
            <Text style={[styles.readinessPercent, { color: getReadinessColor() }]}>
              {examReadiness}%
            </Text>
          </View>
          <View style={styles.readinessInfo}>
            <Text style={styles.readinessLabel}>{t('home.examReadiness')}</Text>
            <Text style={[styles.readinessMessage, { color: getReadinessColor() }]}>
              {getReadinessMessage()}
            </Text>
          </View>
        </View>
        <Icon name="chevron-right" size={24} color={colors.grayText} />
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('PracticeTestIntro')}
        >
          <Icon name="clipboard-text" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>{t('home.startPracticeTest')}</Text>
        </TouchableOpacity>
      </View>

      {/* Flash Card & Handbook Row */}
      <View style={styles.rowCards}>
        <TouchableOpacity
          style={styles.rowCard}
          onPress={() => navigation.navigate('FlashCards')}
        >
          <Icon name="cards" size={32} color={colors.primary} />
          <View style={styles.rowCardText}>
            <Text style={styles.rowCardTitle}>{t('home.flashCard')}</Text>
            <Text style={styles.rowCardSubtitle}>
              {t('home.questions', { count: 200 })}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rowCard}
          onPress={() => navigation.navigate('RoadSigns')}
        >
          <Icon name="book-open-variant" size={32} color={colors.primary} />
          <View style={styles.rowCardText}>
            <Text style={styles.rowCardTitle}>{t('home.handbook')}</Text>
            <Text style={styles.rowCardSubtitle}>DMV</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quiz Categories */}
      <Text style={styles.sectionTitle}>{t('home.quiz')}</Text>
      <View style={styles.categoriesGrid}>
        {CATEGORIES.map(category => {
          const questionCount = getCategoryQuestionCount(category.id);
          const progressPercent = getCategoryProgressPercent(category.id);

          return (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('StudyMode', { categoryId: category.id })}
            >
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                <Icon name={category.icon} size={32} color={category.color} />
              </View>
              <Text style={styles.categoryName} numberOfLines={2}>
                {t(`categories.${category.id}`)}
              </Text>
              <Text style={styles.categoryCount}>
                {t('home.questions', { count: questionCount })}
              </Text>
              {progressPercent > 0 && (
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progressPercent}%`, backgroundColor: category.color },
                    ]}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.grayText,
  },
  profileButton: {
    padding: spacing.xs,
  },
  readinessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadow.medium,
  },
  readinessContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  readinessCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  readinessPercent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  readinessInfo: {
    flex: 1,
  },
  readinessLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 4,
  },
  readinessMessage: {
    fontSize: 14,
  },
  quickActions: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  rowCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    ...shadow.light,
  },
  rowCardText: {
    marginLeft: spacing.sm,
  },
  rowCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkText,
  },
  rowCardSubtitle: {
    fontSize: 12,
    color: colors.grayText,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkText,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  categoryCard: {
    width: '47%',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    ...shadow.light,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.grayText,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default HomeScreen;
