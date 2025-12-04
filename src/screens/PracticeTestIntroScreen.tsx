/**
 * Practice Test Intro Screen
 * Prepares user for timed test
 */

import React, { useState, useEffect } from 'react';
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
import { getStateByCode } from '../constants/states';
import { storageService } from '../services/storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PracticeTestIntro'>;
};

const PracticeTestIntroScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [stateInfo, setStateInfo] = useState({
    questionCount: 30,
    timeLimit: 45,
    passingScore: 80,
  });

  useEffect(() => {
    loadStateInfo();
  }, []);

  const loadStateInfo = async () => {
    const settings = await storageService.getUserSettings();
    if (settings.selectedState) {
      const state = getStateByCode(settings.selectedState);
      if (state) {
        setStateInfo({
          questionCount: state.questionCount,
          timeLimit: state.timeLimit,
          passingScore: state.passingScore,
        });
      }
    }
  };

  const handleStartTest = () => {
    navigation.replace('PracticeTest');
  };

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
        <Text style={styles.title}>{t('test.title')}</Text>
      </View>

      <View style={styles.content}>
        {/* Test Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon name="help-circle" size={32} color={colors.primary} />
              <Text style={styles.infoValue}>{stateInfo.questionCount}</Text>
              <Text style={styles.infoLabel}>Questions</Text>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Icon name="clock-outline" size={32} color={colors.primary} />
              <Text style={styles.infoValue}>{stateInfo.timeLimit}</Text>
              <Text style={styles.infoLabel}>Minutes</Text>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <Icon name="percent" size={32} color={colors.primary} />
              <Text style={styles.infoValue}>{stateInfo.passingScore}%</Text>
              <Text style={styles.infoLabel}>To Pass</Text>
            </View>
          </View>
        </View>

        {/* Rules */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>{t('test.intro.rules.title')}</Text>

          <View style={styles.ruleItem}>
            <Icon name="eye-off" size={20} color={colors.grayText} />
            <Text style={styles.ruleText}>{t('test.intro.rules.noFeedback')}</Text>
          </View>

          <View style={styles.ruleItem}>
            <Icon name="clipboard-check" size={20} color={colors.grayText} />
            <Text style={styles.ruleText}>{t('test.intro.rules.review')}</Text>
          </View>

          <View style={styles.ruleItem}>
            <Icon name="car" size={20} color={colors.grayText} />
            <Text style={styles.ruleText}>{t('test.intro.rules.simulation')}</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips for Success</Text>
          <Text style={styles.tipText}>
            • Read each question carefully before answering
          </Text>
          <Text style={styles.tipText}>
            • Flag questions you want to review later
          </Text>
          <Text style={styles.tipText}>
            • Manage your time - don't spend too long on one question
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
          <Icon name="play" size={20} color={colors.white} />
          <Text style={styles.startButtonText}>{t('test.intro.start')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
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
    padding: spacing.xs,
    marginBottom: spacing.md,
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
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.medium,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkText,
    marginTop: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.grayText,
    marginTop: 4,
  },
  infoDivider: {
    width: 1,
    height: 60,
    backgroundColor: colors.borderGray,
  },
  rulesCard: {
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: spacing.md,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: colors.grayText,
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tipText: {
    fontSize: 14,
    color: colors.darkText,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.grayText,
  },
});

export default PracticeTestIntroScreen;
