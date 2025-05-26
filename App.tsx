import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {MainStack} from './src/stacks/Main';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Header} from './src/components/Header';
function App(): React.JSX.Element {
  return (
      <SafeAreaProvider>
          <NavigationContainer>
              <Header/>
              <MainStack />
          </NavigationContainer>
      </SafeAreaProvider>
  );
}

export default App;
