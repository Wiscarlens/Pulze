/**
 * Theme constants for the Pulze app
 * Contains colors, typography, and spacing definitions
 */

export const colors = {
  // Primary brand colors
  primary: '#D94B3A',
  primaryDark: '#C43D2F',

  // Status colors
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',

  // Answer feedback colors
  correct: '#3eb8d4',
  correctLight: '#dcf8ff',
  incorrect: '#DC3545',
  incorrectLight: '#FFE4E4',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  darkText: '#333333',
  grayText: '#666666',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0',

  // Background colors
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  questionBackground: '#dcf8ff',
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 10,
  lg: 15,
  xl: 20,
  round: 50,
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heavy: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
};
