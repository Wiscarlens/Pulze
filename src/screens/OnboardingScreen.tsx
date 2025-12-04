/**
 * Onboarding Screen
 * Introduces app features to first-time users
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, borderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

interface Slide {
  id: string;
  icon: string;
  titleKey: string;
  subtitleKey: string;
}

const slides: Slide[] = [
  {
    id: '1',
    icon: 'car-key',
    titleKey: 'onboarding.welcome.title',
    subtitleKey: 'onboarding.welcome.subtitle',
  },
  {
    id: '2',
    icon: 'road-variant',
    titleKey: 'onboarding.features.title',
    subtitleKey: 'onboarding.features.subtitle',
  },
  {
    id: '3',
    icon: 'chart-line',
    titleKey: 'onboarding.progress.title',
    subtitleKey: 'onboarding.progress.subtitle',
  },
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('LanguageSelect');
    }
  };

  const handleSkip = () => {
    navigation.replace('LanguageSelect');
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={120} color={colors.primary} />
      </View>
      <Text style={styles.title}>{t(item.titleKey)}</Text>
      <Text style={styles.subtitle}>{t(item.subtitleKey)}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isLastSlide && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>{t('common.skip')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {renderDots()}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {isLastSlide ? t('onboarding.getStarted') : t('common.next')}
          </Text>
          <Icon
            name={isLastSlide ? 'check' : 'arrow-right'}
            size={20}
            color={colors.white}
          />
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
  },
  skipButton: {
    padding: spacing.sm,
  },
  skipText: {
    fontSize: 16,
    color: colors.grayText,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grayText,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.borderGray,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
