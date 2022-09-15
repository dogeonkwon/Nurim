// 로그인 상태의 사이드바 프로필
// 2022.09.15 김국진
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
//import styled from 'styled-components/native';
import {styled} from '@mui/styles';
import {Button, Text, Avatar, Divider} from '@rneui/themed';
import {getFont} from '../../common/font';

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
  Text: {
    nameText: {
      marginTop: 15,
      marginBottom: 15,
      fontSize: 16,
      fontFamily: getFont(3),
    },
  },
});

const LogInSideBar = () => {
  const name = '김국진';
  return (
    <Divider style={styles.Divider} fill center spacing={4}>
      <Avatar
        rounded
        style={styles.Avatar}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg',
        }}
      />
      <Text style={styles.Text.nameText}>{name} 님. 환영합니다.</Text>
    </Divider>
  );
};
export default LogInSideBar;
