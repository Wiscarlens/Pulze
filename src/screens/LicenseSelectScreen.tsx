/**
 * License Type Selection Screen
 * Allows users to select which license type they are studying for
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius, shadow } from '../constants/theme';
import { storageService } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LicenseSelect'>;
};

type LicenseType = 'car' | 'motorcycle' | 'cdl';

interface LicenseOption {
  type: LicenseType;
  icon: string;
  titleKey: string;
  subtitleKey: string;
  comingSoon?: boolean;
}

const licenseOptions: LicenseOption[] = [
  {
    type: 'car',
    icon: 'car',
    titleKey: 'license.car.title',
    subtitleKey: 'license.car.subtitle',
  },
  {
    type: 'motorcycle',
    icon: 'motorbike',
    titleKey: 'license.motorcycle.title',
    subtitleKey: 'license.motorcycle.subtitle',
  },
  {
    type: 'cdl',
    icon: 'truck',
    titleKey: 'license.cdl.title',
    subtitleKey: 'license.cdl.subtitle',
    comingSoon: true,
  },
];

const LicenseSelectScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedLicense, setSelectedLicense] = useState<LicenseType | null>(null);

  const handleSelectLicense = (type: LicenseType, comingSoon?: boolean) => {
    if (!comingSoon) {
      setSelectedLicense(type);
    }
  };

  const handleContinue = async () => {
    if (selectedLicense) {
      await storageService.saveUserSettings({
        licenseType: selectedLicense,
        onboardingComplete: true,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.darkText} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('license.title')}</Text>
      </View>

      <View style={styles.content}>
        {licenseOptions.map(option => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.licenseCard,
              selectedLicense === option.type && styles.licenseCardSelected,
              option.comingSoon && styles.licenseCardDisabled,
            ]}
            onPress={() => handleSelectLicense(option.type, option.comingSoon)}
            disabled={option.comingSoon}
          >
            <View style={styles.iconContainer}>
              <Icon
                name={option.icon}
                size={48}
                color={
                  option.comingSoon
                    ? colors.grayText
                    : selectedLicense === option.type
                    ? colors.primary
                    : colors.darkText
                }
              />
            </View>
            <View style={styles.licenseInfo}>
              <Text
                style={[
                  styles.licenseName,
                  selectedLicense === option.type && styles.licenseNameSelected,
                  option.comingSoon && styles.licenseNameDisabled,
                ]}
              >
                {t(option.titleKey)}
              </Text>
              <Text style={styles.licenseSubtitle}>{t(option.subtitleKey)}</Text>
            </View>
            {option.comingSoon ? (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>
                  {t('license.cdl.comingSoon')}
                </Text>
              </View>
            ) : selectedLicense === option.type ? (
              <Icon name="check-circle" size={24} color={colors.primary} />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedLicense && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedLicense}
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  licenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.borderGray,
    ...shadow.medium,
  },
  licenseCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  licenseCardDisabled: {
    opacity: 0.6,
    backgroundColor: colors.lightGray,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  licenseInfo: {
    flex: 1,
  },
  licenseName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 4,
  },
  licenseNameSelected: {
    color: colors.primary,
  },
  licenseNameDisabled: {
    color: colors.grayText,
  },
  licenseSubtitle: {
    fontSize: 14,
    color: colors.grayText,
  },
  comingSoonBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.darkText,
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

export default LicenseSelectScreen;
