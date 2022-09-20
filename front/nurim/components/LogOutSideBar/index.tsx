// 로그인 상태의 사이드바 프로필
// 2022.09.15 김국진
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
//import styled from 'styled-components/native';
import {styled} from '@mui/styles';
import {Button, Text, Avatar, Divider, Icon} from '@rneui/themed';
import {getFont} from '../../common/font';
import {getColor} from '../../common/colors';
import {signInWithKakao} from '../../modules/kakao';

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
  Button: {
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
  },
  Text: {
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
  },
});

const LogOutSideBar = () => {
  return (
    <Divider style={styles.Divider} fill center spacing={4}>
      <Text style={styles.Text.nameText}>로그인 해주세요.</Text>
      <Button
        buttonStyle={styles.Button.kakaoButton}
        containerStyle={styles.Button.ButtonContainer}
        onPress={() => signInWithKakao()}>
        <Avatar
          source={require('../../assets/images/KAKAO_LOGO_EDGE.png')}
          name="home"
          color="white"
        />
        <Text style={[styles.Text.kakaoButtomText, styles.Text.ButtonText]}>
          카카오 로그인
        </Text>
      </Button>
      <Button
        buttonStyle={styles.Button.naverButton}
        containerStyle={[styles.Button.ButtonContainer, {marginBottom: 20}]}>
        <Avatar
          source={require('../../assets/images/NAVER_LOGO.png')}
          color="white"
        />
        <Text style={[styles.Text.naverButtonText, styles.Text.ButtonText]}>
          네이버 로그인
        </Text>
      </Button>
    </Divider>
  );
};
export default LogOutSideBar;
