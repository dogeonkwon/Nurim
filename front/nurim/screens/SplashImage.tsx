import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Avatar, Text} from '@rneui/themed';
import {getColor} from '../common/colors';
import Toast from 'react-native-simple-toast';
import {serverIP, apis} from '../common/urls';
import {useDispatch} from 'react-redux';
import {authorize} from '../slices/auth';
import {MainStackNavigationProp} from './RootStack';
import {useNavigation} from '@react-navigation/native';
import {
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ImageSize: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  kakaoButtomText: {
    color: 'black',
  },
  kakaoButton: {
    backgroundColor: getColor('KAKAO'),
  },
  kakaoButtonStyle: {
    width: 300,
  },
  ButtonContainer: {
    height: 60,
    width: 300,
  },
  ButtonText: {
    fontSize: 20,
    marginRight: 50,
    paddingLeft: 40,
  },
  buttonViewStyle: {
    marginTop: 50,
    width: 300,
    height: 60,
  },
  viewNonUser: {
    marginTop: 15,
  },
  textNonUser: {
    color: 'rgba(65,105,225, 0.8)',
    fontSize: 16,
  },
});

const SplashImage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<MainStackNavigationProp>();
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
          if (response.isFirst) navigation.navigate('SignUp');
          else navigation.navigate('Main');
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('login err', err);
    }
  };
  return (
    <View style={styles.viewContainer}>
      <View>
        <Image
          style={styles.ImageSize}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={styles.buttonViewStyle}>
        <Button
          buttonStyle={styles.kakaoButton}
          containerStyle={styles.ButtonContainer}
          onPress={() => kakaoLoginButtonClicked()}>
          <Avatar source={require('../assets/images/KAKAO_LOGO_YELLOW.png')} />
          <Text style={[styles.kakaoButtomText, styles.ButtonText]}>
            카카오 로그인
          </Text>
        </Button>
      </View>
      <View style={styles.viewNonUser}>
        <Text
          style={styles.textNonUser}
          onPress={() => navigation.navigate('Main')}>
          비회원으로 이용하기
        </Text>
      </View>
    </View>
  );
};

export default SplashImage;
