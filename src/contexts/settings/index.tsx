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

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
});

export const SettingsProvider: FC<SettingsProviderProps> = ({
  settings,
  children,
}: SettingsProviderProps) => {
  const [currentSettings, setCurrentSettings] = useState(
    settings || initialSettings
  );

  const saveSettings = (updatedSettings: ISettings): void => {
    setCurrentSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

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
