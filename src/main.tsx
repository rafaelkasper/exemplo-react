import { createRoot } from 'react-dom/client';

import { SettingsProvider } from '@/contexts';
import { getItemLocalStorage } from '@/utils';

import App from './App';

const settings = getItemLocalStorage('settings');

// Adiciona o contexto de settings para o App.
// Ele é o responsável por ler as configurações do arquivo public/static/config.json
createRoot(document.getElementById('root')!).render(
  <SettingsProvider settings={settings}>
    <App />
  </SettingsProvider>
);
