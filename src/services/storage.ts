/**
 * Storage Service
 * Handles all local data persistence using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const KEYS = {
  USER_SETTINGS: '@pulze_user_settings',
  CATEGORY_PROGRESS: '@pulze_category_progress',
  QUESTION_ATTEMPTS: '@pulze_question_attempts',
  BOOKMARKS: '@pulze_bookmarks',
  MISSED_QUESTIONS: '@pulze_missed_questions',
  TEST_HISTORY: '@pulze_test_history',
  ONBOARDING_COMPLETE: '@pulze_onboarding_complete',
};

// Types
export interface UserSettings {
  displayName: string | null;
  selectedState: string | null;
  licenseType: 'car' | 'motorcycle' | 'cdl' | null;
  language: string;
  darkMode: boolean;
  soundEffects: boolean;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryProgress {
  categoryId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  lastAttemptedAt: string;
}

export interface QuestionAttempt {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  attemptedAt: string;
}

export interface Bookmark {
  questionId: string;
  categoryId: string;
  addedAt: string;
}

export interface MissedQuestion {
  questionId: string;
  categoryId: string;
  correctStreak: number;
  lastMissedAt: string;
}

export interface TestHistory {
  id: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  timeTakenSeconds: number;
  stateCode: string;
  licenseType: string;
  completedAt: string;
  answers: TestAnswer[];
}

export interface TestAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  flagged: boolean;
}

// Default user settings
const defaultUserSettings: UserSettings = {
  displayName: null,
  selectedState: null,
  licenseType: null,
  language: 'en',
  darkMode: false,
  soundEffects: true,
  onboardingComplete: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Storage Service Class
 */
class StorageService {
  // User Settings
  async getUserSettings(): Promise<UserSettings> {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_SETTINGS);
      if (data) {
        return { ...defaultUserSettings, ...JSON.parse(data) };
      }
      return defaultUserSettings;
    } catch (error) {
      console.error('Error getting user settings:', error);
      return defaultUserSettings;
    }
  }

  async saveUserSettings(settings: Partial<UserSettings>): Promise<void> {
    try {
      const current = await this.getUserSettings();
      const updated = {
        ...current,
        ...settings,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(KEYS.USER_SETTINGS, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving user settings:', error);
      throw error;
    }
  }

  async isOnboardingComplete(): Promise<boolean> {
    const settings = await this.getUserSettings();
    return settings.onboardingComplete;
  }

  async completeOnboarding(): Promise<void> {
    await this.saveUserSettings({ onboardingComplete: true });
  }

  // Category Progress
  async getCategoryProgress(): Promise<CategoryProgress[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.CATEGORY_PROGRESS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting category progress:', error);
      return [];
    }
  }

  async updateCategoryProgress(
    categoryId: string,
    isCorrect: boolean
  ): Promise<void> {
    try {
      const progress = await this.getCategoryProgress();
      const index = progress.findIndex(p => p.categoryId === categoryId);

      if (index >= 0) {
        progress[index].questionsAttempted += 1;
        if (isCorrect) {
          progress[index].questionsCorrect += 1;
        }
        progress[index].lastAttemptedAt = new Date().toISOString();
      } else {
        progress.push({
          categoryId,
          questionsAttempted: 1,
          questionsCorrect: isCorrect ? 1 : 0,
          lastAttemptedAt: new Date().toISOString(),
        });
      }

      await AsyncStorage.setItem(KEYS.CATEGORY_PROGRESS, JSON.stringify(progress));
    } catch (error) {
      console.error('Error updating category progress:', error);
      throw error;
    }
  }

  async getCategoryProgressById(categoryId: string): Promise<CategoryProgress | null> {
    const progress = await this.getCategoryProgress();
    return progress.find(p => p.categoryId === categoryId) || null;
  }

  // Question Attempts
  async saveQuestionAttempt(attempt: Omit<QuestionAttempt, 'attemptedAt'>): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(KEYS.QUESTION_ATTEMPTS);
      const attempts: QuestionAttempt[] = data ? JSON.parse(data) : [];

      attempts.push({
        ...attempt,
        attemptedAt: new Date().toISOString(),
      });

      // Keep only last 1000 attempts to prevent storage bloat
      const trimmed = attempts.slice(-1000);
      await AsyncStorage.setItem(KEYS.QUESTION_ATTEMPTS, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Error saving question attempt:', error);
      throw error;
    }
  }

  async getQuestionAttempts(): Promise<QuestionAttempt[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.QUESTION_ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting question attempts:', error);
      return [];
    }
  }

  // Bookmarks
  async getBookmarks(): Promise<Bookmark[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting bookmarks:', error);
      return [];
    }
  }

  async addBookmark(questionId: string, categoryId: string): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks();
      const exists = bookmarks.some(b => b.questionId === questionId);

      if (!exists) {
        bookmarks.push({
          questionId,
          categoryId,
          addedAt: new Date().toISOString(),
        });
        await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  }

  async removeBookmark(questionId: string): Promise<void> {
    try {
      const bookmarks = await this.getBookmarks();
      const filtered = bookmarks.filter(b => b.questionId !== questionId);
      await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  async isBookmarked(questionId: string): Promise<boolean> {
    const bookmarks = await this.getBookmarks();
    return bookmarks.some(b => b.questionId === questionId);
  }

  // Missed Questions
  async getMissedQuestions(): Promise<MissedQuestion[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.MISSED_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting missed questions:', error);
      return [];
    }
  }

  async addMissedQuestion(questionId: string, categoryId: string): Promise<void> {
    try {
      const missed = await this.getMissedQuestions();
      const index = missed.findIndex(m => m.questionId === questionId);

      if (index >= 0) {
        // Reset streak if already exists
        missed[index].correctStreak = 0;
        missed[index].lastMissedAt = new Date().toISOString();
      } else {
        missed.push({
          questionId,
          categoryId,
          correctStreak: 0,
          lastMissedAt: new Date().toISOString(),
        });
      }

      await AsyncStorage.setItem(KEYS.MISSED_QUESTIONS, JSON.stringify(missed));
    } catch (error) {
      console.error('Error adding missed question:', error);
      throw error;
    }
  }

  async markMissedQuestionCorrect(questionId: string): Promise<void> {
    try {
      const missed = await this.getMissedQuestions();
      const index = missed.findIndex(m => m.questionId === questionId);

      if (index >= 0) {
        missed[index].correctStreak += 1;

        // Remove if answered correctly twice
        if (missed[index].correctStreak >= 2) {
          missed.splice(index, 1);
        }

        await AsyncStorage.setItem(KEYS.MISSED_QUESTIONS, JSON.stringify(missed));
      }
    } catch (error) {
      console.error('Error marking missed question correct:', error);
      throw error;
    }
  }

  // Test History
  async getTestHistory(): Promise<TestHistory[]> {
    try {
      const data = await AsyncStorage.getItem(KEYS.TEST_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting test history:', error);
      return [];
    }
  }

  async saveTestResult(test: Omit<TestHistory, 'id' | 'completedAt'>): Promise<TestHistory> {
    try {
      const history = await this.getTestHistory();
      const newTest: TestHistory = {
        ...test,
        id: `test_${Date.now()}`,
        completedAt: new Date().toISOString(),
      };

      history.push(newTest);

      // Keep only last 50 tests
      const trimmed = history.slice(-50);
      await AsyncStorage.setItem(KEYS.TEST_HISTORY, JSON.stringify(trimmed));

      return newTest;
    } catch (error) {
      console.error('Error saving test result:', error);
      throw error;
    }
  }

  async getTestById(testId: string): Promise<TestHistory | null> {
    const history = await this.getTestHistory();
    return history.find(t => t.id === testId) || null;
  }

  // Statistics
  async getOverallStats(): Promise<{
    totalQuestionsAnswered: number;
    totalCorrect: number;
    accuracy: number;
    testsCompleted: number;
    testsPassed: number;
    studyStreak: number;
  }> {
    const [attempts, tests, progress] = await Promise.all([
      this.getQuestionAttempts(),
      this.getTestHistory(),
      this.getCategoryProgress(),
    ]);

    const totalQuestionsAnswered = progress.reduce(
      (sum, p) => sum + p.questionsAttempted,
      0
    );
    const totalCorrect = progress.reduce((sum, p) => sum + p.questionsCorrect, 0);
    const accuracy =
      totalQuestionsAnswered > 0
        ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
        : 0;
    const testsCompleted = tests.length;
    const testsPassed = tests.filter(t => t.passed).length;

    // Calculate study streak (consecutive days)
    const studyStreak = this.calculateStudyStreak(attempts);

    return {
      totalQuestionsAnswered,
      totalCorrect,
      accuracy,
      testsCompleted,
      testsPassed,
      studyStreak,
    };
  }

  private calculateStudyStreak(attempts: QuestionAttempt[]): number {
    if (attempts.length === 0) return 0;

    const dates = attempts.map(a =>
      new Date(a.attemptedAt).toDateString()
    );
    const uniqueDates = [...new Set(dates)].sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // Check if studied today or yesterday
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
      return 0;
    }

    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = new Date(
        Date.now() - i * 86400000
      ).toDateString();
      if (uniqueDates.includes(expectedDate)) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  // Calculate exam readiness score (0-100)
  async getExamReadiness(): Promise<number> {
    const [progress, missed, tests] = await Promise.all([
      this.getCategoryProgress(),
      this.getMissedQuestions(),
      this.getTestHistory(),
    ]);

    if (progress.length === 0) return 0;

    // Factors:
    // 1. Overall accuracy (40%)
    // 2. Category coverage (20%)
    // 3. Recent test scores (25%)
    // 4. Missed questions ratio (15%)

    const totalAttempted = progress.reduce((s, p) => s + p.questionsAttempted, 0);
    const totalCorrect = progress.reduce((s, p) => s + p.questionsCorrect, 0);
    const accuracy = totalAttempted > 0 ? totalCorrect / totalAttempted : 0;

    const categoryCoverage = Math.min(progress.length / 9, 1); // 9 categories

    const recentTests = tests.slice(-5);
    const avgTestScore =
      recentTests.length > 0
        ? recentTests.reduce((s, t) => s + t.score / t.totalQuestions, 0) /
          recentTests.length
        : 0;

    const missedRatio = Math.max(0, 1 - missed.length / 20); // Penalty for missed questions

    const readiness =
      accuracy * 0.4 +
      categoryCoverage * 0.2 +
      avgTestScore * 0.25 +
      missedRatio * 0.15;

    return Math.round(readiness * 100);
  }

  // Clear all data (for testing or reset)
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(KEYS));
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
export default storageService;
