import { useContext } from 'react';

import { SettingsContext, SettingsContextValue } from '@/contexts';

// Hook para acessar o contexto de configurações
export const useSettings = (): SettingsContextValue =>
  useContext(SettingsContext);
