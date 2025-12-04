/**
 * English translations
 */

export default {
  // Common
  common: {
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip',
    continue: 'Continue',
    cancel: 'Cancel',
    done: 'Done',
    save: 'Save',
    close: 'Close',
    back: 'Back',
    retry: 'Retry',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },

  // Onboarding
  onboarding: {
    welcome: {
      title: 'Pass Your Permit Test with Confidence',
      subtitle: 'Practice with real DMV questions',
    },
    features: {
      title: 'Learn Every Road Sign & Rule',
      subtitle: 'State-specific questions with explanations',
    },
    progress: {
      title: 'Know When You\'re Ready',
      subtitle: 'Track your progress and ace the test',
    },
    getStarted: 'Get Started',
  },

  // Language Selection
  language: {
    title: 'Choose Your Language',
    english: 'English',
    spanish: 'Español',
    haitianCreole: 'Kreyòl Ayisyen',
    chinese: '简体中文',
    vietnamese: 'Tiếng Việt',
    korean: '한국어',
    arabic: 'العربية',
  },

  // State Selection
  state: {
    title: 'Select Your State',
    subtitle: 'We\'ll show you questions based on your state\'s driving laws',
    searchPlaceholder: 'Search states...',
  },

  // Name Entry
  name: {
    title: 'What should we call you?',
    placeholder: 'Enter your first name',
    skip: 'Skip for now',
  },

  // License Type
  license: {
    title: 'What license are you studying for?',
    car: {
      title: 'Car (Class C)',
      subtitle: 'Standard passenger vehicle',
    },
    motorcycle: {
      title: 'Motorcycle (Class M)',
      subtitle: 'Two-wheeled vehicles',
    },
    cdl: {
      title: 'Commercial (CDL)',
      subtitle: 'Trucks & buses',
      comingSoon: 'Coming Soon',
    },
  },

  // Home Screen
  home: {
    greeting: 'Hi, {{name}}!',
    greetingDefault: 'Ready to practice?',
    subtitle: 'What do you want to learn today?',
    examReadiness: 'Exam Readiness',
    keepPracticing: 'Keep practicing!',
    almostReady: 'Almost there!',
    ready: 'You\'re ready!',
    startPracticeTest: 'Start Practice Test',
    quickStudy: 'Quick Study',
    flashCard: 'Flash Card',
    handbook: 'Handbook',
    quiz: 'Quiz',
    questions: '{{count}} Questions',
  },

  // Categories
  categories: {
    road_signs: 'Road Signs',
    traffic_signals: 'Traffic Signals',
    right_of_way: 'Right of Way',
    parking_rules: 'Parking Rules',
    safe_driving: 'Safe Driving',
    alcohol_drugs: 'Alcohol & Drugs',
    special_situations: 'Special Situations',
    vehicle_equipment: 'Vehicle Equipment',
    road_markings: 'Road Markings',
  },

  // Study Mode
  study: {
    title: 'Study Mode',
    question: 'Question {{current}} of {{total}}',
    explanation: 'Explanation',
    handbookRef: 'See Handbook Reference',
    nextQuestion: 'Next Question',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    bookmark: 'Bookmark',
    bookmarked: 'Bookmarked',
  },

  // Practice Test
  test: {
    title: 'Practice Test',
    intro: {
      questions: '{{count}} Questions',
      timeLimit: '{{minutes}} Minutes',
      passingScore: '{{score}}% to Pass',
      rules: {
        title: 'Test Rules',
        noFeedback: 'No feedback until test is complete',
        review: 'You can review answers at the end',
        simulation: 'Simulates real DMV test conditions',
      },
      start: 'Start Test',
    },
    question: 'Question {{current}}/{{total}}',
    flagForReview: 'Flag for Review',
    endTest: 'End Test',
    confirmEnd: 'Are you sure you want to end the test?',
    timeWarning: 'Less than 2 minutes remaining!',
  },

  // Results
  results: {
    passed: 'PASSED',
    needsPractice: 'NEEDS PRACTICE',
    score: '{{correct}}/{{total}}',
    percentage: '{{percent}}%',
    passingThreshold: '{{score}}% required to pass',
    timeTaken: 'Time: {{time}}',
    categoryBreakdown: 'Category Breakdown',
    reviewAnswers: 'Review Answers',
    retakeTest: 'Retake Test',
    shareResults: 'Share Results',
    backToHome: 'Back to Home',
  },

  // Road Signs
  signs: {
    title: 'Road Signs',
    searchPlaceholder: 'Search signs...',
    all: 'All',
    regulatory: 'Regulatory',
    warning: 'Warning',
    guide: 'Guide',
    construction: 'Construction',
    practiceQuestions: 'Practice Questions',
  },

  // Progress
  progress: {
    title: 'Your Progress',
    questionsAnswered: 'Questions Answered',
    accuracy: 'Accuracy',
    studyStreak: 'Study Streak',
    days: '{{count}} days',
    examReadiness: 'Exam Readiness',
    categoryPerformance: 'Category Performance',
    weakAreas: 'Weak Areas',
    practiceNow: 'Practice Now',
    testHistory: 'Test History',
    reviewMissed: 'Review Missed Questions',
    noProgress: 'Start your first quiz to track progress!',
    noMissed: 'Great job! You haven\'t missed any questions yet.',
    noTestHistory: 'Complete your first practice test to see results here.',
  },

  // Profile
  profile: {
    title: 'Profile',
    displayName: 'Display Name',
    settings: 'Settings',
    changeState: 'Change State',
    changeLicense: 'Change License Type',
    language: 'Language',
    darkMode: 'Dark Mode',
    soundEffects: 'Sound Effects',
    support: 'Support',
    findDMV: 'Find Nearest DMV',
    helpFAQ: 'Help & FAQ',
    rateApp: 'Rate This App',
    shareApp: 'Share with Friends',
    version: 'Version {{version}}',
  },

  // Bookmarks
  bookmarks: {
    title: 'Bookmarks',
    empty: 'Tap the bookmark icon on any question to save it here.',
    practiceBookmarked: 'Practice Bookmarked',
  },

  // DMV Finder
  dmv: {
    title: 'Find DMV',
    mapView: 'Map',
    listView: 'List',
    getDirections: 'Get Directions',
    scheduleAppointment: 'Schedule Appointment',
    open: 'Open',
    closed: 'Closed',
    enableLocation: 'Enable location access to find nearby DMV offices',
  },

  // Errors
  errors: {
    network: 'No internet connection',
    generic: 'Something went wrong',
    tryAgain: 'Try Again',
  },

  // Empty States
  empty: {
    noResults: 'No results found',
    tryDifferent: 'Try different keywords',
  },
};
