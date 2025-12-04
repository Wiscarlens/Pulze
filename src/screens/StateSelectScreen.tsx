/**
 * State Selection Screen
 * Allows users to select their state for state-specific questions
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { US_STATES, StateInfo } from '../constants/states';
import { storageService } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'StateSelect'>;
};

const StateSelectScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) {
      return US_STATES;
    }
    const query = searchQuery.toLowerCase();
    return US_STATES.filter(
      state =>
        state.name.toLowerCase().includes(query) ||
        state.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectState = (code: string) => {
    setSelectedState(code);
  };

  const handleContinue = async () => {
    if (selectedState) {
      await storageService.saveUserSettings({ selectedState });
      navigation.navigate('NameEntry');
    }
  };

  const renderStateItem = ({ item }: { item: StateInfo }) => (
    <TouchableOpacity
      style={[
        styles.stateCard,
        selectedState === item.code && styles.stateCardSelected,
      ]}
      onPress={() => handleSelectState(item.code)}
    >
      <View style={styles.stateInfo}>
        <Text
          style={[
            styles.stateName,
            selectedState === item.code && styles.stateNameSelected,
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.stateDetails}>
          {item.questionCount} questions • {item.passingScore}% to pass
        </Text>
      </View>
      {selectedState === item.code && (
        <Icon name="check-circle" size={24} color={colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('state.title')}</Text>
        <Text style={styles.subtitle}>{t('state.subtitle')}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={colors.grayText} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('state.searchPlaceholder')}
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

      <FlatList
        data={filteredStates}
        renderItem={renderStateItem}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('empty.noResults')}</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedState && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedState}
        >
          <Text style={styles.buttonText}>{t('common.continue')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    marginBottom: spacing.md,
    padding: spacing.xs,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkText,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayText,
    lineHeight: 22,
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
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  stateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.borderGray,
    ...shadow.light,
  },
  stateCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  stateInfo: {
    flex: 1,
  },
  stateName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 4,
  },
  stateNameSelected: {
    color: colors.primary,
  },
  stateDetails: {
    fontSize: 12,
    color: colors.grayText,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.grayText,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  buttonDisabled: {
    backgroundColor: colors.borderGray,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StateSelectScreen;
