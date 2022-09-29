/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './slices';
import AdditionalButton from './components/AdditionalButton';
import TaxiPreview from './components/TaxiPreview';
const store = createStore(rootReducer);
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AdditionalButton />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
