import { createContext, FC, ReactNode, useState } from 'react';

interface ISettings {
  apiUrl: string;
}

export interface SettingsContextValue {
  settings: ISettings;
  saveSettings: (update: ISettings) => void;
}

interface SettingsProviderProps {
  settings: ISettings;
  children?: ReactNode;
}

const initialSettings: ISettings = {
  apiUrl: '',
};

export const storeSettings = (settings: ISettings): void => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

// Hook para acessar o contexto de configurações
// Facilita a utilização do contexto em diversos locais
export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
});

// Provedor de contexto para configurações
// Responsável por armazenar e fornecer as configurações da aplicação
export const SettingsProvider: FC<SettingsProviderProps> = ({
  settings,
  children,
}: SettingsProviderProps) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || initialSettings
  );

  // Salva as configurações no localStorage
  const saveSettings = (updatedSettings: ISettings): void => {
    setCurrentSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  // Retorna o contexto de configurações
  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
