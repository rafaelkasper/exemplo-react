import { BrowserRouter } from 'react-router';
import Routes from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { themeLight } from './theme';
import { GlobalStyle } from './styles';

function App() {
  const queryClient = new QueryClient();

  const theme = themeLight; // TODO Fazer verificaçãod e acordo com o tema escolhido

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
