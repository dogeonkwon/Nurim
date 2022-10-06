// 로그인 상태의 사이드바 프로필
// 2022.09.15 김국진
import React from 'react';
import {View, ScrollView, StyleSheet, Platform} from 'react-native';
//import styled from 'styled-components/native';
import {Button, Avatar, Divider, Icon} from '@rneui/themed';
import {getFont} from '../../common/font';
import {getColor} from '../../common/colors';
import {naverLogin} from '../../modules/naver';
import {
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import {serverIP, apis} from '../../common/urls';
import {useDispatch, useSelector} from 'react-redux';
import {authorize} from '../../slices/auth';
import {
  MainStackNavigationProp,
  MainDrawerNavigationProp,
} from './../../screens/RootStack';
import {Tab, Text, TabView} from '@rneui/themed';
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  Divider: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Avatar: {
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 50,
    overflow: 'hidden',
  },
  kakaoButton: {
    backgroundColor: getColor('KAKAO'),
  },
  naverButton: {
    backgroundColor: getColor('NAVER'),
  },
  ButtonContainer: {
    height: 50,
    width: 240,
    marginHorizontal: 1,
    marginVertical: 5,
  },
  nameText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 22,
    fontFamily: getFont(3),
  },
  ButtonText: {
    fontSize: 18,
    marginRight: 50,
    paddingLeft: 40,
  },
  kakaoButtomText: {
    color: 'black',
  },
  naverButtonText: {
    color: 'white',
  },
});

type LogOutSideBarProps = {
  navigation: any;
};
const LogOutSideBar = (props: LogOutSideBarProps) => {
  const dispatch = useDispatch();
  // 카카오 로그인 버튼 클릭 이벤트
  const kakaoLoginButtonClicked = async () => {
    try {
      const token: any = await login();
      const requestHeaders = new Headers();
      requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
      fetch(serverIP + apis.kakaoLogin, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({
          access_token: JSON.stringify(token.accessToken),
        }),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          dispatch(
            authorize({
              nickname: response.nickname, // 닉네임
              phone: response.phone, // 휴대폰번호
              emergency: response.emergency, // 비상연락번호
              token: response.token, // 액세스토큰
              profile: response.imgUrl,
            }),
          );
          Toast.show('로그인 되었습니다.');
          if (response.isFirst) props.navigation.navigate('SignUp');
          else return true;
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('login err', err);
    }
  };

  // 네이버 로그인 버튼 클릭 이벤트
  const naverLoginButtonClicked = () => {
    naverLogin();
  };
  return (
    <Divider style={styles.Divider}>
      <Button
        buttonStyle={styles.kakaoButton}
        containerStyle={styles.ButtonContainer}
        onPress={() => kakaoLoginButtonClicked()}>
        <Avatar source={require('../../assets/images/KAKAO_LOGO_EDGE.png')} />
        <Text style={[styles.kakaoButtomText, styles.ButtonText]}>
          카카오 로그인
        </Text>
      </Button>
      {/*
      <Button
        buttonStyle={styles.naverButton}
        containerStyle={[styles.ButtonContainer, {marginBottom: 20}]}
        //onPress={() => naverLoginButtonClicked()}
        onPress={() => Toast.show('미지원 기능입니다.')}>
        <Avatar source={require('../../assets/images/NAVER_LOGO.png')} />
        <Text style={[styles.naverButtonText, styles.ButtonText]}>
          네이버 로그인
        </Text>
  </Button>*/}
    </Divider>
  );
};
export default LogOutSideBar;
