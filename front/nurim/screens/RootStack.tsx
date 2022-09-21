// 네이티브 스택 네비게이션, 드로어 내비게이션 설정 화면
// 2022.09.14 김국진 작업

import React from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'; // 스택 내비게이션
import {useNavigation} from '@react-navigation/native';
import {Box} from '@react-native-material/core';

// Screen import
import Main from './Main';
import MyPage from './MyPage';

import {
  createDrawerNavigator,
  DrawerNavigationProp,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'; // 드로어 내비게이션
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import LogOutSideBar from '../components/LogOutSideBar/';
import LogInSideBar from '../components/LogInSideBar';
import CustomDrawer from '../components/CustomDrawer';
import MyReviewFavor from './MyReviewFavor';
import {SafeAreaView} from 'react-native-safe-area-context';

/* 스택 내비게이션 사용 파트 */
// [스택 내비게이션] 화면마다 어떤 파라미터가 필요한지 목록, 타입 정의.
export type RootStackParams = {
  Main: undefined;
  MyPage: undefined;
  SignUp: undefined;
  logoutsidebar: undefined;
  MyReviewFavor: undefined;
};
const StackNavi = createDrawerNavigator<RootStackParams>();

// Main Component Stack Navigator 구현
export type MyReviewFavorParams = {
  MyReviewFavor: undefined;
};

const MyReviewFavorStack = createNativeStackNavigator<MyReviewFavorParams>();
const MyReviewFavorScreenStack = navigation => {
  return (
    <MyReviewFavorStack.Navigator initialRouteName="MyReviewFavor">
      <MyReviewFavorStack.Screen
        name="MyReviewFavor"
        component={MyReviewFavor}
        options={{
          headerLeft: ({onPress}) => (
            <TouchableOpacity>
              <Text>Left</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </MyReviewFavorStack.Navigator>
  );
};

const RootStack = () => {
  const isLogin = false;
  return (
    <StackNavi.Navigator
      initialRouteName="Main"
      screenOptions={{
        // 색상 변경
        drawerActiveBackgroundColor: '#fb8c00',
        drawerActiveTintColor: 'white',
      }}
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          {isLogin ? <LogInSideBar /> : <LogOutSideBar />}
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}>
      {isLogin && (
        <>
          <StackNavi.Screen
            component={MyReviewFavorScreenStack}
            name="리뷰보기"
            // 헤더 없애기
            options={{
              headerShown: false,
            }}
          />
          <StackNavi.Screen
            component={MyReviewFavorScreenStack}
            name="즐겨찾기"
            // 헤더 없애기
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      {/* 메인 맵 스크린  */}
      <StackNavi.Screen
        component={Main}
        name="Main"
        // 헤더 없애기
        options={{
          headerShown: false,
          title: '지도보기',
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
          },
        }}
      />
      <StackNavi.Screen component={MyPage} name="MyPage" />
      {/* */}
      {/* */}
      {/* */}
      {/* */}
      {/* */}
      {/* */}
      {/* */}
      {/* */}
      {/* */}
    </StackNavi.Navigator>
  );
};

export default RootStack;
