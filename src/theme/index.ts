import { softShadows, strongShadows } from './shadows';

// Define um tema escuro
export const themeDark = {
  name: 'dark',
  palette: {
    mode: 'dark',
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    background: {
      default: '#282C34',
      dark: '#1c2025',
      paper: '#282C34',
    },
    primary: {
      main: '#3B96C2',
    },
    secondary: {
      main: '#3B96C2',
    },
    text: {
      primary: '#e6e5e8',
      secondary: '#adb0bb',
    },
    grey: {
      main: '#e0e0e0',
      dark: '#bdbdbd',
    },
  },
  shadows: strongShadows,
};

// Define um tema claro
export const themeLight = {
  name: 'light',
  palette: {
    mode: 'light',
    action: {
      active: '#546e7a',
    },
    background: {
      default: '#f4f6f8',
      dark: '#f4f6f8',
      paper: '#fff',
    },
    primary: {
      main: '#307DA2',
    },
    secondary: {
      main: '#ff5811',
    },
    text: {
      primary: '#263238',
      secondary: '#546e7a',
    },
    grey: {
      main: '#e0e0e0',
      dark: '#bdbdbd',
    },
  },
  shadows: softShadows,
};
