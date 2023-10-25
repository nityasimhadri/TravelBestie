import { DefaultTheme } from 'react-native-paper';
import colors from './colors.js';

const theme = {
    ...DefaultTheme,
    roundness: 8, // A commonly used value that gives a modern feel
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        accent: colors.accent,
        background: colors.background,
        surface: colors.background,  // Assuming you want surface color to be same as background
        text: colors.text,
        placeholder: colors.placeholder,
        error: colors.error,
        disabled: colors.placeholder,  // Using placeholder color as a disabled color for illustrative purposes
    }
};

export default theme;
