import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MyPage from './MyPage';
import Main from './Main';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component="Main" />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
