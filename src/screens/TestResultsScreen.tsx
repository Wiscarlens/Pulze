/**
 * Test Results Screen
 * Displays test outcome and performance breakdown
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { storageService, TestHistory } from '../services/storage';
import { getQuestionById } from '../data/questions';
import { CATEGORIES, getCategoryById } from '../constants/categories';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'TestResults'>;
  route: RouteProp<RootStackParamList, 'TestResults'>;
};

interface CategoryScore {
  categoryId: string;
  name: string;
  correct: number;
  total: number;
  percent: number;
}

const TestResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { testId } = route.params;
  const [test, setTest] = useState<TestHistory | null>(null);
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    loadTestResults();
  }, [testId]);

  const loadTestResults = async () => {
    const testResult = await storageService.getTestById(testId);
    if (testResult) {
      setTest(testResult);
      calculateCategoryScores(testResult);
    }
  };

  const calculateCategoryScores = (testResult: TestHistory) => {
    const categoryMap = new Map<string, { correct: number; total: number }>();

    testResult.answers.forEach(answer => {
      const question = getQuestionById(answer.questionId);
      if (question) {
        const existing = categoryMap.get(question.categoryId) || { correct: 0, total: 0 };
        categoryMap.set(question.categoryId, {
          correct: existing.correct + (answer.isCorrect ? 1 : 0),
          total: existing.total + 1,
        });
      }
    });

    const scores: CategoryScore[] = [];
    categoryMap.forEach((value, categoryId) => {
      const category = getCategoryById(categoryId);
      if (category) {
        scores.push({
          categoryId,
          name: category.name,
          correct: value.correct,
          total: value.total,
          percent: Math.round((value.correct / value.total) * 100),
        });
      }
    });

    // Sort by percentage (lowest first to highlight weak areas)
    scores.sort((a, b) => a.percent - b.percent);
    setCategoryScores(scores);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = async () => {
    if (!test) return;

    const percent = Math.round((test.score / test.totalQuestions) * 100);
    const message = test.passed
      ? `I passed my DMV practice test with ${percent}%! 🎉 #Pulze #DrivingTest`
      : `I scored ${percent}% on my DMV practice test. Keep practicing! #Pulze`;

    try {
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRetake = () => {
    navigation.replace('PracticeTestIntro');
  };

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  if (!test) {
    return (
      <View style={styles.container}>
        <Text>Loading results...</Text>
      </View>
    );
  }

  const scorePercent = Math.round((test.score / test.totalQuestions) * 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Result Badge */}
      <View
        style={[
          styles.resultBadge,
          test.passed ? styles.resultPassed : styles.resultFailed,
        ]}
      >
        <Icon
          name={test.passed ? 'check-circle' : 'alert-circle'}
          size={48}
          color={colors.white}
        />
        <Text style={styles.resultText}>
          {test.passed ? t('results.passed') : t('results.needsPractice')}
        </Text>
      </View>

      {/* Score Display */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreMain}>
          {test.score}/{test.totalQuestions}
        </Text>
        <Text
          style={[
            styles.scorePercent,
            { color: test.passed ? colors.success : colors.error },
          ]}
        >
          {scorePercent}%
        </Text>
        <Text style={styles.passingInfo}>
          {t('results.passingThreshold', { score: 80 })}
        </Text>
        <Text style={styles.timeInfo}>
          {t('results.timeTaken', { time: formatTime(test.timeTakenSeconds) })}
        </Text>
      </View>

      {/* Category Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('results.categoryBreakdown')}</Text>
        <View style={styles.categoriesContainer}>
          {categoryScores.map(category => (
            <View key={category.categoryId} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>
                  {t(`categories.${category.categoryId}`)}
                </Text>
                <Text style={styles.categoryScore}>
                  {category.correct}/{category.total}
                </Text>
              </View>
              <View style={styles.categoryBarContainer}>
                <View style={styles.categoryBar}>
                  <View
                    style={[
                      styles.categoryBarFill,
                      {
                        width: `${category.percent}%`,
                        backgroundColor:
                          category.percent >= 80
                            ? colors.success
                            : category.percent >= 60
                            ? colors.warning
                            : colors.error,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryPercent,
                    {
                      color:
                        category.percent >= 80
                          ? colors.success
                          : category.percent >= 60
                          ? colors.warning
                          : colors.error,
                    },
                  ]}
                >
                  {category.percent}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Weak Areas */}
      {categoryScores.filter(c => c.percent < 80).length > 0 && (
        <View style={styles.weakAreasCard}>
          <Text style={styles.weakAreasTitle}>Areas to Improve</Text>
          {categoryScores
            .filter(c => c.percent < 80)
            .slice(0, 3)
            .map(category => (
              <TouchableOpacity
                key={category.categoryId}
                style={styles.weakAreaItem}
                onPress={() =>
                  navigation.navigate('StudyMode', { categoryId: category.categoryId })
                }
              >
                <Icon name="alert-circle" size={20} color={colors.warning} />
                <Text style={styles.weakAreaName}>
                  {t(`categories.${category.categoryId}`)}
                </Text>
                <Icon name="chevron-right" size={20} color={colors.grayText} />
              </TouchableOpacity>
            ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
          <Icon name="refresh" size={20} color={colors.white} />
          <Text style={styles.retakeButtonText}>{t('results.retakeTest')}</Text>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
            <Icon name="share-variant" size={20} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>
              {t('results.shareResults')}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.homeLink} onPress={handleBackToHome}>
          <Text style={styles.homeLinkText}>{t('results.backToHome')}</Text>
        </TouchableOpacity>
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
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl * 2,
  },
  resultBadge: {
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  resultPassed: {
    backgroundColor: colors.success,
  },
  resultFailed: {
    backgroundColor: colors.error,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: spacing.sm,
  },
  scoreCard: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadow.medium,
  },
  scoreMain: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  scorePercent: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  passingInfo: {
    fontSize: 14,
    color: colors.grayText,
    marginTop: spacing.md,
  },
  timeInfo: {
    fontSize: 14,
    color: colors.grayText,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkText,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadow.light,
  },
  categoryRow: {
    paddingVertical: spacing.sm,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  categoryName: {
    fontSize: 14,
    color: colors.darkText,
  },
  categoryScore: {
    fontSize: 14,
    color: colors.grayText,
  },
  categoryBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryPercent: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  weakAreasCard: {
    backgroundColor: colors.warning + '15',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  weakAreasTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: spacing.md,
  },
  weakAreaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  weakAreaName: {
    flex: 1,
    fontSize: 14,
    color: colors.darkText,
  },
  actionsContainer: {
    marginTop: spacing.md,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  retakeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  homeLink: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  homeLinkText: {
    fontSize: 16,
    color: colors.grayText,
  },
});

export default TestResultsScreen;
