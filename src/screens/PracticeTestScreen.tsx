/**
 * Practice Test Screen
 * Timed test that simulates actual DMV exam
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { getStateByCode } from '../constants/states';
import { getRandomQuestions, Question } from '../data/questions';
import { storageService, TestAnswer } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PracticeTest'>;
};

interface TestQuestion extends Question {
  selectedAnswer: number | null;
  flagged: boolean;
}

const PracticeTestScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showNavigator, setShowNavigator] = useState(false);
  const [stateCode, setStateCode] = useState('');
  const [licenseType, setLicenseType] = useState('car');
  const [passingScore, setPassingScore] = useState(80);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    initializeTest();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeRemaining > 0]);

  const initializeTest = async () => {
    const settings = await storageService.getUserSettings();
    const state = settings.selectedState
      ? getStateByCode(settings.selectedState)
      : null;

    const questionCount = state?.questionCount || 30;
    const timeLimit = state?.timeLimit || 45;
    const passing = state?.passingScore || 80;

    setStateCode(settings.selectedState || 'CA');
    setLicenseType(settings.licenseType || 'car');
    setPassingScore(passing);
    setTimeRemaining(timeLimit * 60);
    startTimeRef.current = Date.now();

    const testQuestions = getRandomQuestions(questionCount).map(q => ({
      ...q,
      selectedAnswer: null,
      flagged: false,
    }));

    setQuestions(testQuestions);
  };

  const handleTimeUp = () => {
    Alert.alert(
      'Time\'s Up!',
      'Your test time has expired. Your answers will be submitted.',
      [{ text: 'OK', onPress: submitTest }]
    );
  };

  const handleSelectAnswer = (index: number) => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === currentIndex ? { ...q, selectedAnswer: index } : q
      )
    );
  };

  const handleToggleFlag = () => {
    setQuestions(prev =>
      prev.map((q, i) =>
        i === currentIndex ? { ...q, flagged: !q.flagged } : q
      )
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowNavigator(false);
  };

  const handleEndTest = () => {
    const unansweredCount = questions.filter(q => q.selectedAnswer === null).length;

    Alert.alert(
      t('test.confirmEnd'),
      unansweredCount > 0
        ? `You have ${unansweredCount} unanswered questions.`
        : 'Are you sure you want to submit your test?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: 'Submit', onPress: submitTest },
      ]
    );
  };

  const submitTest = async () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
    const answers: TestAnswer[] = questions.map(q => ({
      questionId: q.id,
      selectedAnswer: q.selectedAnswer ?? -1,
      isCorrect: q.selectedAnswer === q.correctIndex,
      flagged: q.flagged,
    }));

    const correctCount = answers.filter(a => a.isCorrect).length;
    const scorePercent = Math.round((correctCount / questions.length) * 100);
    const passed = scorePercent >= passingScore;

    const test = await storageService.saveTestResult({
      score: correctCount,
      totalQuestions: questions.length,
      passed,
      timeTakenSeconds: timeTaken,
      stateCode,
      licenseType,
      answers,
    });

    navigation.replace('TestResults', { testId: test.id });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const isTimeWarning = timeRemaining < 120;

  if (questions.length === 0 || !currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading test...</Text>
      </View>
    );
  }

  const progress = (currentIndex + 1) / questions.length;
  const answeredCount = questions.filter(q => q.selectedAnswer !== null).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.timerContainer,
            isTimeWarning && styles.timerWarning,
          ]}
        >
          <Icon
            name="clock-outline"
            size={18}
            color={isTimeWarning ? colors.white : colors.darkText}
          />
          <Text
            style={[
              styles.timerText,
              isTimeWarning && styles.timerTextWarning,
            ]}
          >
            {formatTime(timeRemaining)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.navigatorButton}
          onPress={() => setShowNavigator(true)}
        >
          <Text style={styles.questionCount}>
            {currentIndex + 1}/{questions.length}
          </Text>
          <Icon name="grid" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      {/* Question */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </View>

        {/* Answers */}
        <View style={styles.answersContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerCard,
                currentQuestion.selectedAnswer === index && styles.answerSelected,
              ]}
              onPress={() => handleSelectAnswer(index)}
            >
              <View style={styles.answerRadio}>
                {currentQuestion.selectedAnswer === index ? (
                  <Icon name="radiobox-marked" size={24} color={colors.primary} />
                ) : (
                  <Icon name="radiobox-blank" size={24} color={colors.borderGray} />
                )}
              </View>
              <Text
                style={[
                  styles.answerText,
                  currentQuestion.selectedAnswer === index && styles.answerTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Flag Button */}
        <TouchableOpacity style={styles.flagButton} onPress={handleToggleFlag}>
          <Icon
            name={currentQuestion.flagged ? 'flag' : 'flag-outline'}
            size={20}
            color={currentQuestion.flagged ? colors.warning : colors.grayText}
          />
          <Text
            style={[
              styles.flagText,
              currentQuestion.flagged && styles.flagTextActive,
            ]}
          >
            {t('test.flagForReview')}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Icon
            name="chevron-left"
            size={24}
            color={currentIndex === 0 ? colors.borderGray : colors.primary}
          />
          <Text
            style={[
              styles.navButtonText,
              currentIndex === 0 && styles.navButtonTextDisabled,
            ]}
          >
            {t('common.previous')}
          </Text>
        </TouchableOpacity>

        {currentIndex === questions.length - 1 ? (
          <TouchableOpacity style={styles.endButton} onPress={handleEndTest}>
            <Text style={styles.endButtonText}>{t('test.endTest')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>{t('common.next')}</Text>
            <Icon name="chevron-right" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Question Navigator Modal */}
      <Modal
        visible={showNavigator}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNavigator(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Questions</Text>
              <Text style={styles.modalSubtitle}>
                {answeredCount}/{questions.length} answered
              </Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setShowNavigator(false)}
              >
                <Icon name="close" size={24} color={colors.darkText} />
              </TouchableOpacity>
            </View>

            <View style={styles.questionGrid}>
              {questions.map((q, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.questionGridItem,
                    q.selectedAnswer !== null && styles.questionGridItemAnswered,
                    q.flagged && styles.questionGridItemFlagged,
                    index === currentIndex && styles.questionGridItemCurrent,
                  ]}
                  onPress={() => handleNavigateToQuestion(index)}
                >
                  <Text
                    style={[
                      styles.questionGridText,
                      (q.selectedAnswer !== null || index === currentIndex) &&
                        styles.questionGridTextLight,
                    ]}
                  >
                    {index + 1}
                  </Text>
                  {q.flagged && (
                    <Icon
                      name="flag"
                      size={10}
                      color={colors.warning}
                      style={styles.flagIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.lightGray }]} />
                <Text style={styles.legendText}>Unanswered</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                <Text style={styles.legendText}>Answered</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
                <Text style={styles.legendText}>Flagged</Text>
              </View>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  timerWarning: {
    backgroundColor: colors.error,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  timerTextWarning: {
    color: colors.white,
  },
  navigatorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  questionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
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
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.borderGray,
    ...shadow.light,
  },
  answerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  answerRadio: {
    marginRight: spacing.md,
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    color: colors.darkText,
    lineHeight: 22,
  },
  answerTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  flagText: {
    fontSize: 14,
    color: colors.grayText,
  },
  flagTextActive: {
    color: colors.warning,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
  navButtonTextDisabled: {
    color: colors.borderGray,
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  endButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  endButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
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
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.grayText,
    marginLeft: spacing.sm,
  },
  modalClose: {
    marginLeft: 'auto',
    padding: spacing.xs,
  },
  questionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  questionGridItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionGridItemAnswered: {
    backgroundColor: colors.success,
  },
  questionGridItemFlagged: {
    backgroundColor: colors.warning,
  },
  questionGridItemCurrent: {
    backgroundColor: colors.primary,
  },
  questionGridText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkText,
  },
  questionGridTextLight: {
    color: colors.white,
  },
  flagIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  modalLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.grayText,
  },
});

export default PracticeTestScreen;
