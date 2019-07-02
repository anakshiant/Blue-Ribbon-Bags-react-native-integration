
import React, { useContext } from 'react';
import { ThemeProvider } from 'react-native-elements';

import AppContainer from './src/routes';
import ThemeContext from './src/contexts/ThemeContext';
import { PurchaseProvider } from './src/providers/PurchasProvider';



export default () => {

  const theme = useContext(ThemeContext);

  return (
    <PurchaseProvider>
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    </PurchaseProvider>
  )
}