/**
 * Language Selection Screen
 * Allows users to choose their preferred language
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { SUPPORTED_LANGUAGES, changeLanguage } from '../locales';
import { storageService } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LanguageSelect'>;
};

const LanguageSelectScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    const settings = await storageService.getUserSettings();
    if (settings.language) {
      setSelectedLanguage(settings.language);
    }
  };

  const handleSelectLanguage = async (code: string) => {
    setSelectedLanguage(code);
    await changeLanguage(code);
  };

  const handleContinue = async () => {
    await storageService.saveUserSettings({ language: selectedLanguage });
    navigation.navigate('StateSelect');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('language.title')}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {SUPPORTED_LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageCard,
              selectedLanguage === lang.code && styles.languageCardSelected,
            ]}
            onPress={() => handleSelectLanguage(lang.code)}
          >
            <View style={styles.languageInfo}>
              <Text
                style={[
                  styles.languageName,
                  selectedLanguage === lang.code && styles.languageNameSelected,
                ]}
              >
                {lang.nativeName}
              </Text>
              {lang.name !== lang.nativeName && (
                <Text style={styles.languageNameEnglish}>{lang.name}</Text>
              )}
            </View>
            {selectedLanguage === lang.code && (
              <Icon name="check-circle" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  languageCard: {
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
  languageCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkText,
  },
  languageNameSelected: {
    color: colors.primary,
  },
  languageNameEnglish: {
    fontSize: 14,
    color: colors.grayText,
    marginTop: 2,
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
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguageSelectScreen;
