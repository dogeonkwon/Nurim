// 로그인 상태의 사이드바 프로필
// 2022.09.15 김국진
import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
//import styled from 'styled-components/native';
import {styled} from '@mui/styles';
import {Button, Text, Avatar, Divider} from '@rneui/themed';
import {getFont} from '../../common/font';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

const styles = StyleSheet.create({
  Divider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: '40%',
    marginTop: 50,
    paddingBottom: 20,
  },
  Avatar: {
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 50,
    overflow: 'hidden',
  },
  nameText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: getFont(3),
  },
});

const LogInSideBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Divider style={styles.Divider}>
      <Avatar
        size="xlarge"
        rounded
        source={{
          uri: `${user?.profile}`,
        }}
        containerStyle={{
          borderColor: 'rgba(0, 0, 0, 0.4)',
          borderStyle: 'solid',
          borderWidth: 3,
        }}
      />
      <Text style={styles.nameText}>{user?.nickname} 님. 환영합니다.</Text>
    </Divider>
  );
};
export default LogInSideBar;
