import { createContext } from 'react';

interface AppContextProps {
  appThemeMode: 'light' | 'dark';
  setAppThemeMode: (mode: 'light' | 'dark') => void;
}

export const AppContext = createContext<AppContextProps>({
  appThemeMode: 'light',
  setAppThemeMode: () => {},
});
