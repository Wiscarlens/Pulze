/**
 * Bookmarks Screen
 * Shows saved questions for later review
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { storageService, Bookmark } from '../services/storage';
import { getQuestionById } from '../data/questions';
import { getCategoryById } from '../constants/categories';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Bookmarks'>;
};

interface BookmarkWithQuestion extends Bookmark {
  questionText: string;
  categoryName: string;
}

const BookmarksScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [bookmarks, setBookmarks] = useState<BookmarkWithQuestion[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    const savedBookmarks = await storageService.getBookmarks();
    const bookmarksWithQuestions = savedBookmarks.map(bookmark => {
      const question = getQuestionById(bookmark.questionId);
      const category = getCategoryById(bookmark.categoryId);
      return {
        ...bookmark,
        questionText: question?.text || 'Question not found',
        categoryName: category?.name || 'Unknown',
      };
    });
    setBookmarks(bookmarksWithQuestions);
  };

  const handleRemoveBookmark = async (questionId: string) => {
    await storageService.removeBookmark(questionId);
    setBookmarks(prev => prev.filter(b => b.questionId !== questionId));
  };

  const handlePracticeBookmarked = () => {
    if (bookmarks.length > 0) {
      // Navigate to study mode with first bookmarked category
      navigation.navigate('StudyMode', { categoryId: bookmarks[0].categoryId });
    }
  };

  const renderBookmarkItem = ({ item }: { item: BookmarkWithQuestion }) => (
    <View style={styles.bookmarkCard}>
      <View style={styles.bookmarkContent}>
        <Text style={styles.categoryLabel}>{item.categoryName}</Text>
        <Text style={styles.questionText} numberOfLines={2}>
          {item.questionText}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveBookmark(item.questionId)}
      >
        <Icon name="bookmark-remove" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
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
        <Text style={styles.title}>{t('bookmarks.title')}</Text>
      </View>

      {bookmarks.length === 0 ? (
        // Empty State
        <View style={styles.emptyState}>
          <Icon name="bookmark-outline" size={80} color={colors.borderGray} />
          <Text style={styles.emptyTitle}>{t('bookmarks.empty')}</Text>
        </View>
      ) : (
        <>
          {/* Practice Button */}
          <View style={styles.practiceContainer}>
            <TouchableOpacity
              style={styles.practiceButton}
              onPress={handlePracticeBookmarked}
            >
              <Icon name="play" size={20} color={colors.white} />
              <Text style={styles.practiceButtonText}>
                {t('bookmarks.practiceBookmarked')}
              </Text>
            </TouchableOpacity>
            <Text style={styles.bookmarkCount}>
              {bookmarks.length} saved questions
            </Text>
          </View>

          {/* Bookmarks List */}
          <FlatList
            data={bookmarks}
            renderItem={renderBookmarkItem}
            keyExtractor={item => item.questionId}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: 16,
    color: colors.grayText,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 24,
  },
  practiceContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
  bookmarkCount: {
    fontSize: 14,
    color: colors.grayText,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  bookmarkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadow.light,
  },
  bookmarkContent: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  questionText: {
    fontSize: 14,
    color: colors.darkText,
    lineHeight: 20,
  },
  removeButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});

export default BookmarksScreen;
