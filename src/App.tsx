import { useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { runtimeConfigs } from '@/config';
import { AppProvider } from '@/contexts';
import { useSettings } from '@/hooks';

import Routes from './routes';
import { GlobalStyle } from './styles';
import { themeLight } from './theme';

function App() {
  const queryClient = new QueryClient();
  const theme = themeLight; // TODO Fazer verificação de acordo com o tema escolhido

  const { settings, saveSettings } = useSettings();

  const searchEnviroment = useCallback(async () => {
    const enviroment = await runtimeConfigs();

    if (enviroment) {
      saveSettings({
        ...settings,
        apiUrl: enviroment.API_URL || null,
      });
    }

    return enviroment;
  }, [settings, saveSettings]);

  useEffect(() => {
    const load = async () => {
      await searchEnviroment();
    };

    load();
  }, [searchEnviroment]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppProvider>
            <GlobalStyle />
            <Routes />
          </AppProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
