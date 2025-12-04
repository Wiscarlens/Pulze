/**
 * Study Mode Screen
 * Practice questions by category without time pressure
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { getCategoryById } from '../constants/categories';
import { getQuestionsByCategory, Question } from '../data/questions';
import { storageService } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'StudyMode'>;
  route: RouteProp<RootStackParamList, 'StudyMode'>;
};

const StudyModeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { categoryId } = route.params;
  const category = getCategoryById(categoryId);
  const questions = getQuestionsByCategory(categoryId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Shuffle questions on mount
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    checkBookmarkStatus();
  }, [currentIndex, shuffledQuestions]);

  const checkBookmarkStatus = async () => {
    if (shuffledQuestions.length > 0) {
      const bookmarked = await storageService.isBookmarked(
        shuffledQuestions[currentIndex].id
      );
      setIsBookmarked(bookmarked);
    }
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswerSelect = async (index: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);
    setShowExplanation(true);

    const isCorrect = index === currentQuestion.correctIndex;

    // Save attempt
    await storageService.saveQuestionAttempt({
      questionId: currentQuestion.id,
      selectedAnswer: index,
      isCorrect,
    });

    // Update category progress
    await storageService.updateCategoryProgress(categoryId, isCorrect);

    // Track missed questions
    if (!isCorrect) {
      await storageService.addMissedQuestion(currentQuestion.id, categoryId);
    } else {
      await storageService.markMissedQuestionCorrect(currentQuestion.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Completed all questions
      navigation.goBack();
    }
  };

  const handleBookmark = async () => {
    if (isBookmarked) {
      await storageService.removeBookmark(currentQuestion.id);
    } else {
      await storageService.addBookmark(currentQuestion.id, categoryId);
    }
    setIsBookmarked(!isBookmarked);
  };

  const getAnswerStyle = (index: number) => {
    if (selectedAnswer === null) {
      return styles.answerDefault;
    }

    if (index === currentQuestion.correctIndex) {
      return styles.answerCorrect;
    }

    if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
      return styles.answerIncorrect;
    }

    return styles.answerDefault;
  };

  const getAnswerTextStyle = (index: number) => {
    if (selectedAnswer === null) {
      return styles.answerTextDefault;
    }

    if (index === currentQuestion.correctIndex) {
      return styles.answerTextCorrect;
    }

    if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
      return styles.answerTextIncorrect;
    }

    return styles.answerTextDefault;
  };

  if (shuffledQuestions.length === 0 || !currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const progress = (currentIndex + 1) / shuffledQuestions.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={24} color={colors.darkText} />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{shuffledQuestions.length}
          </Text>
        </View>

        <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark}>
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? colors.primary : colors.grayText}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View style={styles.questionCard}>
          {currentQuestion.imageUrl && (
            <View style={styles.questionImage}>
              {/* Image placeholder - would use Image component with actual images */}
              <Icon name="image" size={60} color={colors.grayText} />
            </View>
          )}
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.answersContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.answerCard, getAnswerStyle(index)]}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[styles.answerText, getAnswerTextStyle(index)]}>
                {option}
              </Text>
              {selectedAnswer !== null && (
                <Icon
                  name={
                    index === currentQuestion.correctIndex
                      ? 'check-circle'
                      : index === selectedAnswer
                      ? 'close-circle'
                      : 'circle-outline'
                  }
                  size={20}
                  color={
                    index === currentQuestion.correctIndex
                      ? colors.correct
                      : index === selectedAnswer
                      ? colors.incorrect
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
                  selectedAnswer === currentQuestion.correctIndex
                    ? 'check-circle'
                    : 'alert-circle'
                }
                size={24}
                color={
                  selectedAnswer === currentQuestion.correctIndex
                    ? colors.success
                    : colors.error
                }
              />
              <Text
                style={[
                  styles.explanationTitle,
                  {
                    color:
                      selectedAnswer === currentQuestion.correctIndex
                        ? colors.success
                        : colors.error,
                  },
                ]}
              >
                {selectedAnswer === currentQuestion.correctIndex
                  ? t('study.correct')
                  : t('study.incorrect')}
              </Text>
            </View>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
            <TouchableOpacity style={styles.handbookLink}>
              <Icon name="book-open-variant" size={16} color={colors.primary} />
              <Text style={styles.handbookLinkText}>
                {currentQuestion.handbookRef}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Next Button */}
      {showExplanation && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < shuffledQuestions.length - 1
                ? t('study.nextQuestion')
                : t('common.done')}
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
  closeButton: {
    padding: spacing.xs,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    minWidth: 45,
    textAlign: 'right',
  },
  bookmarkButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  questionCard: {
    backgroundColor: colors.questionBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    minHeight: 150,
    justifyContent: 'center',
  },
  questionImage: {
    alignItems: 'center',
    marginBottom: spacing.md,
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
    backgroundColor: colors.correctLight,
    borderColor: colors.correct,
  },
  answerIncorrect: {
    backgroundColor: colors.incorrectLight,
    borderColor: colors.incorrect,
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    marginRight: spacing.sm,
  },
  answerTextDefault: {
    color: colors.darkText,
  },
  answerTextCorrect: {
    color: colors.correct,
    fontWeight: '600',
  },
  answerTextIncorrect: {
    color: colors.incorrect,
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
    marginBottom: spacing.md,
  },
  handbookLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  handbookLinkText: {
    fontSize: 14,
    color: colors.primary,
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

export default StudyModeScreen;
