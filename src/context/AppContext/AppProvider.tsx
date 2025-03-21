import React, { useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

export const AppProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
  const [appThemeMode, setAppThemeMode] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  // //onLoad
  // useEffect(() => {
  //   const theme = localStorage.getItem('theme');
  //   if (theme) {
  //     setAppThemeMode(theme as 'light' | 'dark');
  //   }
  // }, []);
  //onUpdateTheme
  useEffect(() => {
    localStorage.setItem('theme', appThemeMode);
  }, [appThemeMode]);
  return (
    <AppContext.Provider value={{ appThemeMode, setAppThemeMode }}>
      {children}
    </AppContext.Provider>
  );
};
