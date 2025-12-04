/**
 * Missed Questions Screen
 * Review questions that were answered incorrectly
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { storageService, MissedQuestion } from '../services/storage';
import { getQuestionById, Question } from '../data/questions';
import { getCategoryById } from '../constants/categories';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'MissedQuestions'>;
};

interface MissedQuestionWithDetails extends MissedQuestion {
  question: Question;
  categoryName: string;
}

const MissedQuestionsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [missedQuestions, setMissedQuestions] = useState<MissedQuestionWithDetails[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadMissedQuestions();
    }, [])
  );

  const loadMissedQuestions = async () => {
    const missed = await storageService.getMissedQuestions();
    const missedWithDetails: MissedQuestionWithDetails[] = [];

    for (const m of missed) {
      const question = getQuestionById(m.questionId);
      const category = getCategoryById(m.categoryId);
      if (question) {
        missedWithDetails.push({
          ...m,
          question,
          categoryName: category?.name || 'Unknown',
        });
      }
    }

    setMissedQuestions(missedWithDetails);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleSelectAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const currentQuestion = missedQuestions[currentIndex];
    const isCorrect = index === currentQuestion.question.correctIndex;

    // Update progress
    await storageService.saveQuestionAttempt({
      questionId: currentQuestion.questionId,
      selectedAnswer: index,
      isCorrect,
    });

    await storageService.updateCategoryProgress(
      currentQuestion.categoryId,
      isCorrect
    );

    if (isCorrect) {
      await storageService.markMissedQuestionCorrect(currentQuestion.questionId);
    }
  };

  const handleNext = () => {
    if (currentIndex < missedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      navigation.goBack();
    }
  };

  if (missedQuestions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.title}>Review Missed Questions</Text>
        </View>
        <View style={styles.emptyState}>
          <Icon name="check-circle" size={80} color={colors.success} />
          <Text style={styles.emptyText}>{t('progress.noMissed')}</Text>
        </View>
      </View>
    );
  }

  const currentQuestion = missedQuestions[currentIndex];
  const progress = (currentIndex + 1) / missedQuestions.length;

  const getAnswerStyle = (index: number) => {
    if (selectedAnswer === null) return styles.answerDefault;
    if (index === currentQuestion.question.correctIndex) return styles.answerCorrect;
    if (index === selectedAnswer) return styles.answerIncorrect;
    return styles.answerDefault;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{missedQuestions.length}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{currentQuestion.categoryName}</Text>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question.text}</Text>
        </View>

        {/* Answers */}
        <View style={styles.answersContainer}>
          {currentQuestion.question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.answerCard, getAnswerStyle(index)]}
              onPress={() => handleSelectAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <Text
                style={[
                  styles.answerText,
                  selectedAnswer !== null &&
                    index === currentQuestion.question.correctIndex &&
                    styles.answerTextCorrect,
                  selectedAnswer === index &&
                    index !== currentQuestion.question.correctIndex &&
                    styles.answerTextIncorrect,
                ]}
              >
                {option}
              </Text>
              {selectedAnswer !== null && (
                <Icon
                  name={
                    index === currentQuestion.question.correctIndex
                      ? 'check-circle'
                      : index === selectedAnswer
                      ? 'close-circle'
                      : 'circle-outline'
                  }
                  size={20}
                  color={
                    index === currentQuestion.question.correctIndex
                      ? colors.success
                      : index === selectedAnswer
                      ? colors.error
                      : colors.borderGray
                  }
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanationCard}>
            <View style={styles.explanationHeader}>
              <Icon
                name={
                  selectedAnswer === currentQuestion.question.correctIndex
                    ? 'check-circle'
                    : 'alert-circle'
                }
                size={24}
                color={
                  selectedAnswer === currentQuestion.question.correctIndex
                    ? colors.success
                    : colors.error
                }
              />
              <Text
                style={[
                  styles.explanationTitle,
                  {
                    color:
                      selectedAnswer === currentQuestion.question.correctIndex
                        ? colors.success
                        : colors.error,
                  },
                ]}
              >
                {selectedAnswer === currentQuestion.question.correctIndex
                  ? 'Correct!'
                  : 'Incorrect'}
              </Text>
            </View>
            <Text style={styles.explanationText}>
              {currentQuestion.question.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      {showExplanation && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < missedQuestions.length - 1 ? 'Next Question' : 'Finish'}
            </Text>
            <Icon name="arrow-right" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.warning,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.warning,
    minWidth: 45,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: colors.grayText,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.warning + '20',
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.warning,
  },
  questionCard: {
    backgroundColor: colors.questionBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    minHeight: 120,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkText,
    lineHeight: 26,
    textAlign: 'center',
  },
  answersContainer: {
    gap: spacing.sm,
  },
  answerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    ...shadow.light,
  },
  answerDefault: {
    backgroundColor: colors.white,
    borderColor: colors.borderGray,
  },
  answerCorrect: {
    backgroundColor: colors.success + '10',
    borderColor: colors.success,
  },
  answerIncorrect: {
    backgroundColor: colors.error + '10',
    borderColor: colors.error,
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    color: colors.darkText,
    lineHeight: 22,
    marginRight: spacing.sm,
  },
  answerTextCorrect: {
    color: colors.success,
    fontWeight: '600',
  },
  answerTextIncorrect: {
    color: colors.error,
    fontWeight: '600',
  },
  explanationCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 15,
    color: colors.darkText,
    lineHeight: 22,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MissedQuestionsScreen;
