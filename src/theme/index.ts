import { createTheme } from '@mui/material/styles';

// Define configurações de tipografia
const typography = {
  h1: {
    fontWeight: 500,
    fontSize: 35,
    letterSpacing: '-0.24px',
  },
  h2: {
    fontWeight: 500,
    fontSize: 29,
    letterSpacing: '-0.24px',
  },
  h3: {
    fontWeight: 500,
    fontSize: 24,
    letterSpacing: '-0.06px',
  },
  h4: {
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: '-0.06px',
  },
  h5: {
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: '-0.05px',
  },
  h6: {
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: '-0.05px',
  },
  overline: {
    fontWeight: 500,
  },
};

export const lightTheme = createTheme({
  typography, // Adiciona a tipografia personalizada
  palette: {
    mode: 'light',
    primary: {
      main: '#0366d6', // Azul primário do GitHub
      light: '#2188ff', // Azul mais claro
      dark: '#005cc5', // Azul mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    secondary: {
      main: '#6f42c1', // Roxo do GitHub (usado em alguns elementos)
      light: '#8a63d2', // Roxo mais claro
      dark: '#5a32a3', // Roxo mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    error: {
      main: '#d73a49', // Vermelho do GitHub
      light: '#f97583', // Vermelho mais claro
      dark: '#cb2431', // Vermelho mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    warning: {
      main: '#f66a0a', // Laranja do GitHub
      light: '#ff8f4f', // Laranja mais claro
      dark: '#e36209', // Laranja mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    info: {
      main: '#0366d6', // Azul primário do GitHub
      light: '#2188ff', // Azul mais claro
      dark: '#005cc5', // Azul mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    success: {
      main: '#28a745', // Verde do GitHub
      light: '#34d058', // Verde mais claro
      dark: '#22863a', // Verde mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    background: {
      default: '#ffffff', // Fundo branco
      paper: '#f6f8fa', // Fundo cinza claro
    },
    text: {
      primary: '#24292e', // Texto escuro (cinza quase preto)
      secondary: '#586069', // Texto cinza
      disabled: '#959da5', // Texto cinza desabilitado
    },
  },
});

export const darkTheme = createTheme({
  typography, // Adiciona a tipografia personalizada
  palette: {
    mode: 'dark',
    primary: {
      main: '#0366d6', // Azul primário do GitHub
      light: '#2188ff', // Azul mais claro
      dark: '#005cc5', // Azul mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    secondary: {
      main: '#6f42c1', // Roxo do GitHub
      light: '#8a63d2', // Roxo mais claro
      dark: '#5a32a3', // Roxo mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    error: {
      main: '#d73a49', // Vermelho do GitHub
      light: '#f97583', // Vermelho mais claro
      dark: '#cb2431', // Vermelho mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    warning: {
      main: '#f66a0a', // Laranja do GitHub
      light: '#ff8f4f', // Laranja mais claro
      dark: '#e36209', // Laranja mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    info: {
      main: '#0366d6', // Azul primário do GitHub
      light: '#2188ff', // Azul mais claro
      dark: '#005cc5', // Azul mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    success: {
      main: '#28a745', // Verde do GitHub
      light: '#34d058', // Verde mais claro
      dark: '#22863a', // Verde mais escuro
      contrastText: '#ffffff', // Texto branco
    },
    background: {
      default: '#0d1117', // Fundo escuro do GitHub Dark
      paper: '#161b22', // Fundo de componentes escuro
    },
    text: {
      primary: '#c9d1d9', // Texto claro (cinza claro)
      secondary: '#8b949e', // Texto cinza
      disabled: '#484f58', // Texto cinza desabilitado
    },
  },
});
