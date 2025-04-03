const colors = {
  primary: "#67E8F9",
  secondary: "#A5F3FC",
  accent: "#155E75",

  background: "#18181B",
  surface: "#27272A",

  text: "#FAFAFA",
  textSecondary: "#E4E4E7",
  textDisabled: "#A1A1AA",

  border: "#71717A",

  success: "#86EFAC",
  warning: "#F59E0B",
  error: "#F87171",
};

//estos son los que se deben usar
const colorsFinal = {
  primary: {
    main: colors.primary,
    medium: colors.secondary,
    light: "#ECFEFF",
  },
  backgrounds: {
    base: colors.background,
    medium: "#27272A",
    light: "#35353B",
    primary: "#155E75",
  },
  textsAndIcons: {
    main: colors.text,
    medium: "#ECFEFF",
    light: "#F4F4F5",
    dark: "#A1A1AA",
    onColor: "#18181B",
  },
  borders: {
    main: colors.border,
    medium: "#A1A1AA",
    dark: "#52525B",
  },
  success: colors.success,
  error: {
    main: "#F87171",
    dark: "#DC2626",
    light: "#FECACA",
  },
  complements: {
    yellow: "#FDA23B",
    pink: "#FD5EED",
    purple: "#7667F9",
    green: "#33B48F",
  },
};

export default colors;
