import type { TextStyle } from 'react-native';

export const fontFamilies = {
  regular: 'Inter_400Regular',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;
export const typography = {
  display: {
    fontFamily: fontFamilies.semibold,
    fontSize: 40,
    lineHeight: 48,
  },
  title: {
    fontFamily: fontFamilies.semibold,
    fontSize: 28,
    lineHeight: 36,
  },
  habitName: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  metric: {
    fontFamily: fontFamilies.regular,
    fontSize: 36,
    lineHeight: 44,
    fontVariant: ['tabular-nums'],
  },
  body: { fontFamily: fontFamilies.regular, fontSize: 16, lineHeight: 24 },
  label: { fontFamily: fontFamilies.semibold, fontSize: 13, lineHeight: 20 },
  caption: { fontFamily: fontFamilies.regular, fontSize: 12, lineHeight: 18 },
} satisfies Record<string, TextStyle>;
