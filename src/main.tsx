import { createRoot } from 'react-dom/client';

import { SettingsProvider } from '@/contexts';
import { getItemLocalStorage } from '@/utils';

import App from './App';

const settings = getItemLocalStorage('settings');

createRoot(document.getElementById('root')!).render(
  <SettingsProvider settings={settings}>
    <App />
  </SettingsProvider>
);
