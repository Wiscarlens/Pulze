/**
 * Profile Screen
 * User preferences and settings
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { getStateByCode } from '../constants/states';
import { storageService, UserSettings } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
};

const APP_VERSION = '1.0.0';

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<UserSettings | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [])
  );

  const loadSettings = async () => {
    const userSettings = await storageService.getUserSettings();
    setSettings(userSettings);
  };

  const handleToggleDarkMode = async (value: boolean) => {
    if (settings) {
      setSettings({ ...settings, darkMode: value });
      await storageService.saveUserSettings({ darkMode: value });
    }
  };

  const handleToggleSoundEffects = async (value: boolean) => {
    if (settings) {
      setSettings({ ...settings, soundEffects: value });
      await storageService.saveUserSettings({ soundEffects: value });
    }
  };

  const handleChangeState = () => {
    navigation.navigate('StateSelect');
  };

  const handleChangeLanguage = () => {
    navigation.navigate('LanguageSelect');
  };

  const handleChangeLicense = () => {
    navigation.navigate('LicenseSelect');
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await storageService.clearAllData();
            await loadSettings();
            Alert.alert('Progress Reset', 'All your progress has been cleared.');
          },
        },
      ]
    );
  };

  const handleRateApp = () => {
    // Open app store rating page
    Alert.alert('Rate Pulze', 'Thank you for wanting to rate us!');
  };

  const handleShareApp = async () => {
    try {
      const message = 'Check out Pulze - the best app to prepare for your driving permit test! https://pulze.app';
      await Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
    } catch (error) {
      Alert.alert('Share', 'Unable to open share dialog');
    }
  };

  const handleViewBookmarks = () => {
    navigation.navigate('Bookmarks');
  };

  const stateName = settings?.selectedState
    ? getStateByCode(settings.selectedState)?.name
    : 'Not selected';

  const licenseTypeName = settings?.licenseType
    ? settings.licenseType === 'car'
      ? 'Car (Class C)'
      : settings.licenseType === 'motorcycle'
      ? 'Motorcycle (Class M)'
      : 'Commercial (CDL)'
    : 'Not selected';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" size={80} color={colors.primary} />
        </View>
        <Text style={styles.displayName}>
          {settings?.displayName || 'Driver'}
        </Text>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Icon name="map-marker" size={16} color={colors.primary} />
            <Text style={styles.badgeText}>{stateName}</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.actionCard} onPress={handleViewBookmarks}>
          <Icon name="bookmark" size={24} color={colors.primary} />
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>{t('bookmarks.title')}</Text>
            <Text style={styles.actionSubtitle}>View saved questions</Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.grayText} />
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingRow} onPress={handleChangeState}>
            <Icon name="map-marker" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.changeState')}</Text>
              <Text style={styles.settingValue}>{stateName}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.grayText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={handleChangeLicense}>
            <Icon name="card-account-details" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.changeLicense')}</Text>
              <Text style={styles.settingValue}>{licenseTypeName}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.grayText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={handleChangeLanguage}>
            <Icon name="translate" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.language')}</Text>
              <Text style={styles.settingValue}>
                {settings?.language === 'es' ? 'Español' : 'English'}
              </Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.grayText} />
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <Icon name="weather-night" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.darkMode')}</Text>
            </View>
            <Switch
              value={settings?.darkMode || false}
              onValueChange={handleToggleDarkMode}
              trackColor={{ false: colors.borderGray, true: colors.primary + '50' }}
              thumbColor={settings?.darkMode ? colors.primary : colors.lightGray}
            />
          </View>

          <View style={[styles.settingRow, styles.settingRowLast]}>
            <Icon name="volume-high" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.soundEffects')}</Text>
            </View>
            <Switch
              value={settings?.soundEffects || false}
              onValueChange={handleToggleSoundEffects}
              trackColor={{ false: colors.borderGray, true: colors.primary + '50' }}
              thumbColor={settings?.soundEffects ? colors.primary : colors.lightGray}
            />
          </View>
        </View>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.support')}</Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingRow} onPress={handleRateApp}>
            <Icon name="star" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.rateApp')}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.grayText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingRow, styles.settingRowLast]}
            onPress={handleShareApp}
          >
            <Icon name="share-variant" size={22} color={colors.grayText} />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{t('profile.shareApp')}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.grayText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.dangerButton} onPress={handleResetProgress}>
          <Icon name="delete" size={20} color={colors.error} />
          <Text style={styles.dangerButtonText}>Reset All Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={styles.version}>{t('profile.version', { version: APP_VERSION })}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    paddingBottom: spacing.xxl * 2,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  profileCard: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    marginBottom: spacing.sm,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    marginBottom: spacing.sm,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary + '15',
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  badgeText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayText,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadow.light,
  },
  actionInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.grayText,
    marginTop: 2,
  },
  settingsCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadow.light,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  settingInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.darkText,
  },
  settingValue: {
    fontSize: 14,
    color: colors.grayText,
    marginTop: 2,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.error,
    gap: spacing.sm,
  },
  dangerButtonText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.grayText,
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
