/**
 * Progress Screen
 * Comprehensive analytics showing user's learning journey
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { CATEGORIES, getCategoryById } from '../constants/categories';
import {
  storageService,
  CategoryProgress,
  TestHistory,
  MissedQuestion,
} from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Progress'>;
};

interface Stats {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  accuracy: number;
  testsCompleted: number;
  testsPassed: number;
  studyStreak: number;
}

const ProgressScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [examReadiness, setExamReadiness] = useState(0);
  const [stats, setStats] = useState<Stats>({
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    accuracy: 0,
    testsCompleted: 0,
    testsPassed: 0,
    studyStreak: 0,
  });
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>([]);
  const [testHistory, setTestHistory] = useState<TestHistory[]>([]);
  const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const [readiness, overallStats, progress, history, missed] = await Promise.all([
      storageService.getExamReadiness(),
      storageService.getOverallStats(),
      storageService.getCategoryProgress(),
      storageService.getTestHistory(),
      storageService.getMissedQuestions(),
    ]);

    setExamReadiness(readiness);
    setStats(overallStats);
    setCategoryProgress(progress);
    setTestHistory(history.slice(-10).reverse());
    setMissedQuestions(missed);
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

  const getReadinessColor = () => {
    if (examReadiness < 60) return colors.error;
    if (examReadiness < 80) return colors.warning;
    return colors.success;
  };

  const getCategoryAccuracy = (categoryId: string) => {
    const progress = categoryProgress.find(p => p.categoryId === categoryId);
    if (!progress || progress.questionsAttempted === 0) return 0;
    return Math.round((progress.questionsCorrect / progress.questionsAttempted) * 100);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const hasData = stats.totalQuestionsAnswered > 0;

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('progress.title')}</Text>
      </View>

      {!hasData ? (
        // Empty State
        <View style={styles.emptyState}>
          <Icon name="chart-line" size={80} color={colors.borderGray} />
          <Text style={styles.emptyTitle}>{t('progress.noProgress')}</Text>
        </View>
      ) : (
        <>
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Icon name="help-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.statValue}>{stats.totalQuestionsAnswered}</Text>
              <Text style={styles.statLabel}>{t('progress.questionsAnswered')}</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="check-circle-outline" size={24} color={colors.success} />
              <Text style={styles.statValue}>{stats.accuracy}%</Text>
              <Text style={styles.statLabel}>{t('progress.accuracy')}</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="fire" size={24} color={colors.warning} />
              <Text style={styles.statValue}>{stats.studyStreak}</Text>
              <Text style={styles.statLabel}>{t('progress.studyStreak')}</Text>
            </View>
          </View>

          {/* Exam Readiness */}
          <View style={styles.readinessCard}>
            <Text style={styles.sectionTitle}>{t('progress.examReadiness')}</Text>
            <View style={styles.readinessContent}>
              <View style={styles.readinessGauge}>
                <View
                  style={[
                    styles.readinessCircle,
                    { borderColor: getReadinessColor() },
                  ]}
                >
                  <Text style={[styles.readinessPercent, { color: getReadinessColor() }]}>
                    {examReadiness}%
                  </Text>
                </View>
              </View>
              <View style={styles.readinessInfo}>
                <Text style={styles.readinessMessage}>
                  {examReadiness >= 80
                    ? "You're ready to take the test!"
                    : examReadiness >= 60
                    ? 'Almost there! Keep practicing.'
                    : 'Keep studying to improve your score.'}
                </Text>
              </View>
            </View>
          </View>

          {/* Category Performance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('progress.categoryPerformance')}</Text>
            <View style={styles.categoriesCard}>
              {CATEGORIES.map(category => {
                const accuracy = getCategoryAccuracy(category.id);
                const progress = categoryProgress.find(p => p.categoryId === category.id);

                return (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.categoryRow}
                    onPress={() =>
                      navigation.navigate('StudyMode', { categoryId: category.id })
                    }
                  >
                    <View style={styles.categoryInfo}>
                      <View
                        style={[
                          styles.categoryDot,
                          { backgroundColor: category.color },
                        ]}
                      />
                      <Text style={styles.categoryName}>
                        {t(`categories.${category.id}`)}
                      </Text>
                    </View>
                    <View style={styles.categoryProgress}>
                      <View style={styles.categoryBar}>
                        <View
                          style={[
                            styles.categoryBarFill,
                            {
                              width: `${accuracy}%`,
                              backgroundColor:
                                accuracy >= 80
                                  ? colors.success
                                  : accuracy >= 60
                                  ? colors.warning
                                  : accuracy > 0
                                  ? colors.error
                                  : colors.lightGray,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.categoryPercent}>
                        {progress ? `${accuracy}%` : '-'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Missed Questions */}
          {missedQuestions.length > 0 && (
            <TouchableOpacity
              style={styles.missedCard}
              onPress={() => navigation.navigate('MissedQuestions')}
            >
              <View style={styles.missedContent}>
                <Icon name="alert-circle" size={32} color={colors.warning} />
                <View style={styles.missedInfo}>
                  <Text style={styles.missedTitle}>{t('progress.weakAreas')}</Text>
                  <Text style={styles.missedCount}>
                    {missedQuestions.length} questions to review
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => navigation.navigate('MissedQuestions')}
              >
                <Text style={styles.reviewButtonText}>{t('progress.reviewMissed')}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}

          {/* Test History */}
          {testHistory.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('progress.testHistory')}</Text>
              <View style={styles.historyCard}>
                {testHistory.map((test, index) => (
                  <TouchableOpacity
                    key={test.id}
                    style={[
                      styles.historyRow,
                      index < testHistory.length - 1 && styles.historyRowBorder,
                    ]}
                    onPress={() =>
                      navigation.navigate('TestResults', { testId: test.id })
                    }
                  >
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyDate}>
                        {formatDate(test.completedAt)}
                      </Text>
                      <Text style={styles.historyScore}>
                        {test.score}/{test.totalQuestions}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.historyBadge,
                        test.passed ? styles.historyBadgePassed : styles.historyBadgeFailed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.historyBadgeText,
                          test.passed
                            ? styles.historyBadgeTextPassed
                            : styles.historyBadgeTextFailed,
                        ]}
                      >
                        {test.passed ? 'PASS' : 'FAIL'}
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={colors.grayText} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: spacing.xxl * 2,
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl * 3,
  },
  emptyTitle: {
    fontSize: 16,
    color: colors.grayText,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    ...shadow.light,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: 11,
    color: colors.grayText,
    textAlign: 'center',
    marginTop: 2,
  },
  readinessCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadow.medium,
  },
  readinessContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  readinessGauge: {
    marginRight: spacing.lg,
  },
  readinessCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readinessPercent: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  readinessInfo: {
    flex: 1,
  },
  readinessMessage: {
    fontSize: 14,
    color: colors.darkText,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkText,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  categoriesCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadow.light,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  categoryName: {
    fontSize: 14,
    color: colors.darkText,
  },
  categoryProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBar: {
    width: 80,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.grayText,
    minWidth: 35,
    textAlign: 'right',
  },
  missedCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  missedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  missedInfo: {
    marginLeft: spacing.md,
  },
  missedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
  },
  missedCount: {
    fontSize: 14,
    color: colors.grayText,
  },
  reviewButton: {
    backgroundColor: colors.warning,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  historyCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadow.light,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  historyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    color: colors.darkText,
    fontWeight: '500',
  },
  historyScore: {
    fontSize: 12,
    color: colors.grayText,
  },
  historyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  historyBadgePassed: {
    backgroundColor: colors.success + '20',
  },
  historyBadgeFailed: {
    backgroundColor: colors.error + '20',
  },
  historyBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  historyBadgeTextPassed: {
    color: colors.success,
  },
  historyBadgeTextFailed: {
    color: colors.error,
  },
});

export default ProgressScreen;
