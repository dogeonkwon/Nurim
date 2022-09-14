// 드로어 네비게이션 화면
// 2022.09.14 김국진 작업

import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer'; // 드로어 내비게이션
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {Box} from '@react-native-material/core';
import {RootStackNavigationProp} from './RootStack';
import RootStack from './RootStack';

// Screen import
import SideBar from './SideBar';
import Map from './Map';

/* 드로어 내비게이션 사용 파트 */
// [드로어 내비게이션] 화면마다 어떤 파라미터가 필요한지 목록, 타입 정의
type RootDrawerParamList = {
  SideBar: undefined;
  Map: undefined;
  RootStack: undefined;
};

export type RootDrawerNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  DrawerNavigationProp<RootDrawerParamList>
>;

export type RootDrawerNavigationScreenParams =
  NavigatorScreenParams<RootDrawerParamList>;

const Drawer = createDrawerNavigator<RootDrawerParamList>();
/* 드로어 내비게이션 사용 파트 종료 */

const RootDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen
        component={Map}
        name="Map"
        options={{drawerLabel: 'Map'}}
      />
      <Drawer.Screen
        component={SideBar}
        name="SideBar"
        options={{drawerLabel: 'SideBar'}}
      />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
