// 로그인 상태의 사이드바 프로필
// 2022.09.15 김국진
import React from 'react';
import {View, ScrollView, StyleSheet, Platform} from 'react-native';
//import styled from 'styled-components/native';
import {styled} from '@mui/styles';
import {Button, Text, Avatar, Divider, Icon} from '@rneui/themed';
import {getFont} from '../../common/font';
import {getColor} from '../../common/colors';
import {signInWithKakao} from '../../modules/kakao';
import {naverLogin} from '../../modules/naver';

const styles = StyleSheet.create({
  Divider: {
    flex: 1,
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

const LogOutSideBar = () => {
  return (
    <Divider style={styles.Divider}>
      <Text style={styles.nameText}>로그인 해주세요.</Text>
      <Button
        buttonStyle={styles.kakaoButton}
        containerStyle={styles.ButtonContainer}
        onPress={() => signInWithKakao()}>
        <Avatar source={require('../../assets/images/KAKAO_LOGO_EDGE.png')} />
        <Text style={[styles.kakaoButtomText, styles.ButtonText]}>
          카카오 로그인
        </Text>
      </Button>
      <Button
        buttonStyle={styles.naverButton}
        containerStyle={[styles.ButtonContainer, {marginBottom: 20}]}
        onPress={() => naverLogin(Platform.OS)}>
        <Avatar source={require('../../assets/images/NAVER_LOGO.png')} />
        <Text style={[styles.naverButtonText, styles.ButtonText]}>
          네이버 로그인
        </Text>
      </Button>
    </Divider>
  );
};
export default LogOutSideBar;
