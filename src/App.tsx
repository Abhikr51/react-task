import { useContext, useState } from 'react';
import './App.css';
import MainNavigation from './navigation/main-navigation';
import { SaltProvider } from "@salt-ds/core";
import { AppContext } from './context/AppContext';
function App() {
  const {appThemeMode} = useContext(AppContext);
  return (
      <SaltProvider mode={appThemeMode}>
        <MainNavigation />
      </SaltProvider>
  );
}

export default App;
