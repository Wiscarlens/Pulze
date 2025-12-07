/**
 * Pulze - Driver Permit Practice App
 * Main entry point with navigation setup
 */

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Initialize i18n
import './src/locales';

// Types
import { RootStackParamList } from '@/navigation/types';

// Services
import { storageService } from './src/services/storage';

// Screens
import {
  SplashScreen,
  OnboardingScreen,
  LanguageSelectScreen,
  StateSelectScreen,
  NameEntryScreen,
  LicenseSelectScreen,
  HomeScreen,
  StudyModeScreen,
  PracticeTestIntroScreen,
  PracticeTestScreen,
  TestResultsScreen,
  RoadSignsScreen,
  ProgressScreen,
  ProfileScreen,
  BookmarksScreen,
  FlashCardsScreen,
  MissedQuestionsScreen,
} from './src/screens';

// Theme
import { colors } from '@/constants';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    const complete = await storageService.isOnboardingComplete();
    setIsOnboardingComplete(complete);
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <SplashScreen onFinish={handleSplashFinish} />
      </>
    );
  }

  // Still loading onboarding status
  if (isOnboardingComplete === null) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isOnboardingComplete ? 'Home' : 'Onboarding'}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.white },
          }}>
          {/* Onboarding Flow */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="LanguageSelect"
            component={LanguageSelectScreen}
          />
          <Stack.Screen name="StateSelect" component={StateSelectScreen} />
          <Stack.Screen name="NameEntry" component={NameEntryScreen} />
          <Stack.Screen name="LicenseSelect" component={LicenseSelectScreen} />

          {/* Main App Screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="StudyMode" component={StudyModeScreen} />
          <Stack.Screen
            name="PracticeTestIntro"
            component={PracticeTestIntroScreen}
          />
          <Stack.Screen name="PracticeTest" component={PracticeTestScreen} />
          <Stack.Screen name="TestResults" component={TestResultsScreen} />
          <Stack.Screen name="RoadSigns" component={RoadSignsScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
          <Stack.Screen name="FlashCards" component={FlashCardsScreen} />
          <Stack.Screen
            name="MissedQuestions"
            component={MissedQuestionsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default App;
