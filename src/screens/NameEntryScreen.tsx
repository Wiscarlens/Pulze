/**
 * Name Entry Screen
 * Collects user's name for personalized greeting
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius } from '../constants/theme';
import { storageService } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'NameEntry'>;
};

const NameEntryScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');

  const handleContinue = async () => {
    if (name.trim()) {
      await storageService.saveUserSettings({ displayName: name.trim() });
    }
    navigation.navigate('LicenseSelect');
  };

  const handleSkip = () => {
    navigation.navigate('LicenseSelect');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.title}>{t('name.title')}</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="account-circle" size={80} color={colors.primary} />
          </View>
          <TextInput
            style={styles.input}
            placeholder={t('name.placeholder')}
            placeholderTextColor={colors.grayText}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={30}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>{t('common.continue')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>{t('name.skip')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
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
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  input: {
    width: '100%',
    fontSize: 20,
    color: colors.darkText,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: spacing.md,
    textAlign: 'center',
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
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    fontSize: 16,
    color: colors.grayText,
  },
});

export default NameEntryScreen;
