/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {type PropsWithChildren} from 'react';
 import {
   SafeAreaView,
   View,
   Text
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 
 import Map from './screens/Map';
 import RootStack from './screens/RootStack';
 
 const App = () => {
   return (
     <NavigationContainer><RootStack/></NavigationContainer>
   );
 };
 
 export default App;
 