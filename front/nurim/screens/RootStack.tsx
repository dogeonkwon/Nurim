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
import {logout} from '@react-native-seoul/kakao-login';

// Screen import
import Main from './Main';
import PlaceDetail from './PlaceDetail';
import MyPage from './MyPage';
import SignUp from './SignUp';
import TaxiDetail from './TaxiDetail';
import MainWidget from '../components/MainWidget';
import SplashImage from './SplashImage';

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
import SideBarLogo from '../components/SideBarLogo';
import LogInSideBar from '../components/LogInSideBar';
import CustomDrawer from '../components/CustomDrawer';
import MyReviewFavor from './MyReviewFavor';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {authorize} from '../slices/auth';
import {RootState} from '../slices';
import {ILocation} from '../components/Map';
import {TaxiDetailType} from '../components/TaxiInfo';
import Toast from 'react-native-simple-toast';

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
export type MainParams = {
  Main: undefined;
  SplashImage: undefined;
  PlaceDetail: {locatID: number; location: ILocation};
  TaxiDetail: {taxiDetail: TaxiDetailType};
  openDrawer: () => void;
  MainWidget: undefined;
  SignUp: undefined;
};
export type MainStackNavigationProp = NativeStackNavigationProp<MainParams>;
const MainStack = createNativeStackNavigator<MainParams>();
const MainScreenStack = () => {
  return (
    <MainStack.Navigator initialRouteName="SplashImage">
      {/* 첫 화면 */}
      <MainStack.Screen
        component={SplashImage}
        name="SplashImage"
        options={{headerShown: false}}
      />
      {/* 지도 메인 페이지 */}
      <MainStack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      {/* 장소 상세보기 페이지 */}
      <MainStack.Screen
        component={PlaceDetail}
        name="PlaceDetail"
        options={{headerShown: false}}
      />
      {/* 콜택시 상세보기 페이지 */}
      <MainStack.Screen
        component={TaxiDetail}
        name="TaxiDetail"
        options={{headerShown: false}}
      />
      <MainStack.Screen
        component={SignUp}
        name="SignUp"
        options={{headerShown: false}}
      />
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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = false;
  const logoutButtonClicked = async () => {
    // 로그아웃
    const message = await logout();
    Toast.show('로그아웃 되었습니다.');

    dispatch(authorize(null));
  };
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
          <SideBarLogo />
          {user ? (
            <LogInSideBar />
          ) : (
            <LogOutSideBar navigation={props.navigation} />
          )}
          <DrawerItemList {...props} />
          {user && (
            <View>
              <Text
                style={{
                  color: '#3366FF',
                  textAlign: 'right',
                  marginRight: '4%',
                  fontSize: 13,
                }}
                onPress={() => logoutButtonClicked()}>
                로그아웃
              </Text>
            </View>
          )}
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
