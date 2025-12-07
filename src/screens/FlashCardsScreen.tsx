/**
 * Flash Cards Screen
 * Review missed questions in flash card format
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { colors, spacing, borderRadius, shadow } from '@/constants';
import { storageService, MissedQuestion } from '../services/storage';
import { getQuestionById, Question, getRandomQuestions } from '@/data';

const { width } = Dimensions.get('window');

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'FlashCards'>;
};

interface FlashCard {
  question: Question;
  missedInfo?: MissedQuestion;
}

const FlashCardsScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const flipAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, []),
  );

  const loadCards = async () => {
    const missedQuestions = await storageService.getMissedQuestions();

    let flashCards: FlashCard[] = [];

    // Add missed questions
    for (const missed of missedQuestions) {
      const question = getQuestionById(missed.questionId);
      if (question) {
        flashCards.push({ question, missedInfo: missed });
      }
    }

    // If less than 10 cards, add random questions
    if (flashCards.length < 10) {
      const additionalQuestions = getRandomQuestions(10 - flashCards.length);
      for (const q of additionalQuestions) {
        if (!flashCards.some(card => card.question.id === q.id)) {
          flashCards.push({ question: q });
        }
      }
    }

    // Shuffle cards
    flashCards = flashCards.sort(() => Math.random() - 0.5);
    setCards(flashCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedAnswer(null);
  };

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const handleSelectAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const currentCard = cards[currentIndex];
    const isCorrect = index === currentCard.question.correctIndex;

    // Update progress
    await storageService.saveQuestionAttempt({
      questionId: currentCard.question.id,
      selectedAnswer: index,
      isCorrect,
    });

    await storageService.updateCategoryProgress(
      currentCard.question.categoryId,
      isCorrect,
    );

    if (!isCorrect) {
      await storageService.addMissedQuestion(
        currentCard.question.id,
        currentCard.question.categoryId,
      );
    } else if (currentCard.missedInfo) {
      await storageService.markMissedQuestionCorrect(currentCard.question.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      flipAnim.setValue(0);
    } else {
      // Completed all cards
      navigation.goBack();
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.title}>Flash Cards</Text>
        </View>
        <View style={styles.emptyState}>
          <Icon name="cards" size={80} color={colors.borderGray} />
          <Text style={styles.emptyText}>Loading flash cards...</Text>
        </View>
      </View>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = (currentIndex + 1) / cards.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{cards.length}
          </Text>
        </View>
      </View>

      {/* Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={selectedAnswer === null ? flipCard : undefined}
          style={styles.cardTouchable}>
          {/* Front of card - Question */}
          <Animated.View
            style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
            <Text style={styles.cardLabel}>Question</Text>
            <Text style={styles.cardQuestion}>{currentCard.question.text}</Text>
            <Text style={styles.tapHint}>Tap to reveal answer</Text>
          </Animated.View>

          {/* Back of card - Answer */}
          <Animated.View
            style={[styles.card, styles.cardBack, backAnimatedStyle]}>
            <Text style={styles.cardLabel}>Answer</Text>
            <Text style={styles.cardAnswer}>
              {currentCard.question.options[currentCard.question.correctIndex]}
            </Text>
            <Text style={styles.explanation}>
              {currentCard.question.explanation}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      {(isFlipped || selectedAnswer !== null) && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex < cards.length - 1 ? 'Next Card' : 'Finish'}
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
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
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
    backgroundColor: colors.borderGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    minWidth: 45,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.grayText,
    marginTop: spacing.md,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  cardTouchable: {
    width: width - spacing.lg * 2,
    height: 280,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    ...shadow.heavy,
  },
  cardFront: {
    backgroundColor: colors.primary,
  },
  cardBack: {
    backgroundColor: colors.white,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    opacity: 0.8,
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
  },
  cardQuestion: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 28,
  },
  tapHint: {
    position: 'absolute',
    bottom: spacing.md,
    fontSize: 12,
    color: colors.white,
    opacity: 0.6,
  },
  cardAnswer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  explanation: {
    fontSize: 14,
    color: colors.grayText,
    textAlign: 'center',
    lineHeight: 20,
  },
  answersContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  answersLabel: {
    fontSize: 14,
    color: colors.grayText,
    marginBottom: spacing.sm,
  },
  answerOption: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.borderGray,
  },
  answerCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  answerIncorrect: {
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
  },
  answerText: {
    fontSize: 14,
    color: colors.darkText,
  },
  answerTextCorrect: {
    color: colors.success,
    fontWeight: '600',
  },
  answerTextIncorrect: {
    color: colors.error,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.white,
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

export default FlashCardsScreen;
