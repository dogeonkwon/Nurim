// 네이티브 스택 네비게이션 화면
// 2022.09.14 김국진 작업

import React from 'react';
import {Button, Text, View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'; // 스택 내비게이션
import {useNavigation} from '@react-navigation/native';
import {Box} from '@react-native-material/core';

// Screen import
import Map from './Map';
import MyPage from './MyPage';

import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer'; // 드로어 내비게이션
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

/* 스택 내비게이션 사용 파트 */
// [스택 내비게이션] 화면마다 어떤 파라미터가 필요한지 목록, 타입 정의.
type RootStackParamList = {
  RootDrawer: undefined;
  Map: undefined;
  MyPage: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();
/* 스택 내비게이션 사용 파트 종료 */

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

const RootStack = () => {
  return (
    <Box minH={'100%'} style={{backgroundColor: 'tomato'}}>
      <Stack.Navigator initialRouteName="Map">
        {/* 메인 맵 스크린  */}
        <Stack.Screen
          component={Map}
          name="Map"
          // 헤더 없애기
          options={{headerShown: false}}
        />
        <Stack.Screen component={MyPage} name="MyPage" />
        {/* */}
        {/* */}
        {/* */}
        {/* */}
        {/* */}
        {/* */}
        {/* */}
        {/* */}
        {/* */}
      </Stack.Navigator>
    </Box>
  );
};

export default RootStack;
