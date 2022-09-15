import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MyPage from './MyPage';
import Map from './Map';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen name="Map" component="Map" />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
