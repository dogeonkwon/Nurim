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
import PlaceDetail from './PlaceDetail';
import MyPage from './MyPage';
import SignUp from './SignUp';

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
import {useSelector} from 'react-redux';
import {RootState} from '../slices';

/* 스택 내비게이션 사용 파트 */
// [스택 내비게이션] 화면마다 어떤 파라미터가 필요한지 목록, 타입 정의.
export type RootStackParams = {
  Main: undefined;
  마이페이지: undefined;
  SignUp: undefined;
  logoutsidebar: undefined;
  MyReviewFavor: {type: number};
  나의리뷰: {type: number};
  나의장소: {type: number};
};
const StackNavi = createDrawerNavigator<RootStackParams>();
export type MainDrawerNavigationProp = DrawerNavigationProp<RootStackParams>;

// Main Component Stack Navigator 구현
type MainParams = {
  Main: undefined;
  PlaceDetail: undefined;
  openDrawer: () => void;
};
export type MainStackNavigationProp = NativeStackNavigationProp<MainParams>;
const MainStack = createNativeStackNavigator<MainParams>();
const MainScreenStack = () => {
  return (
    <MainStack.Navigator initialRouteName="Main">
      {/* 지도 메인 페이지 */}
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      {/* 장소 상세보기 페이지 */}
      <MainStack.Screen component={PlaceDetail} name="PlaceDetail" />
    </MainStack.Navigator>
  );
};

/*
// Main Component Stack Navigator 구현
export type MyReviewFavorParams = {
  MyReviewFavor: {type: number};
};

const MyReviewFavorStack = createNativeStackNavigator<MyReviewFavorParams>();
const MyReviewFavorScreenStack = () => {
  return (
    <MyReviewFavorStack.Navigator initialRouteName="MyReview">
      <MyReviewFavorStack.Screen
        name="MyReview"
        component={MyReviewFavor}
        options={{headerShown: false}}
      />
    </MyReviewFavorStack.Navigator>
  );
};*/

const RootStack = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = false;
  return (
    <StackNavi.Navigator
      initialRouteName="Main"
      screenOptions={
        {
          /*
        // 색상 변경
        drawerActiveBackgroundColor: '#fb8c00',
        drawerActiveTintColor: 'white',
        */
        }
      }
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          {user ? (
            <LogInSideBar />
          ) : (
            <LogOutSideBar navigation={props.navigation} />
          )}
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}>
      {user && (
        <>
          <StackNavi.Screen
            component={MyPage}
            name="마이페이지"
            options={{headerShown: false}}
          />
          <StackNavi.Screen
            component={MyReviewFavor}
            name="나의리뷰"
            initialParams={{type: 0}}
            // 헤더 없애기
            options={{headerShown: false}}
          />
          <StackNavi.Screen
            component={MyReviewFavor}
            name="나의장소"
            initialParams={{type: 1}}
            // 헤더 없애기
            options={{headerShown: false}}
          />
        </>
      )}
      {/* 메인 맵 스크린  */}
      <StackNavi.Screen
        component={MainScreenStack}
        name="Main"
        // 헤더 없애기
        options={{
          headerShown: false,
          title: '지도보기',
        }}
      />

      <StackNavi.Screen
        component={SignUp}
        name="SignUp"
        options={{
          drawerItemStyle: {height: 0},
          headerShown: false,
        }}
      />
    </StackNavi.Navigator>
  );
};

export default RootStack;
