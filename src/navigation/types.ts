/**
 * Navigation type definitions
 */

export type RootStackParamList = {
  // Onboarding
  Onboarding: undefined;
  LanguageSelect: undefined;
  StateSelect: undefined;
  NameEntry: undefined;
  LicenseSelect: undefined;

  // Main App
  Home: undefined;
  StudyMode: { categoryId: string };
  PracticeTestIntro: undefined;
  PracticeTest: undefined;
  TestResults: { testId: string };
  RoadSigns: undefined;
  SignDetail: { signId: string };
  Progress: undefined;
  Profile: undefined;
  Bookmarks: undefined;
  MissedQuestions: undefined;
  FlashCards: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  SignsTab: undefined;
  ProgressTab: undefined;
  ProfileTab: undefined;
};
