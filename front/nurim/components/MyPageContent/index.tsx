// 내정보보기 컴포넌트
// 2022-09-26 김국진
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, Avatar, Divider, Icon} from '@rneui/themed';
import {RootState} from '../../slices';
import {serverIP, apis} from '../../common/urls';
import Toast from 'react-native-simple-toast';
import {useSelector, useDispatch} from 'react-redux';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {useNavigation} from '@react-navigation/native';
import {logout} from '@react-native-seoul/kakao-login';
import {authorize} from '../../slices/auth';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: '5%',
  },
  viewProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewContent: {
    marginTop: '5%',
    marginLeft: '15%',
    marginRight: '15%',
  },
  viewContentItem: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '10%',
  },
  viewContentTitle: {
    width: '40%',
  },
  viewContentContent: {
    width: '60%',
  },
  viewOut: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  textStyle: {
    fontSize: 16,
    fontWeight: '600',
  },
});
const MyPageContent = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<MainStackNavigationProp>();
  const user = useSelector((state: RootState) => state.auth.user);

  // 회원 탈퇴 클릭
  const outClicked = () => {
    Alert.alert('회원 탈퇴하시겠습니까?', '', [
      {
        text: '확인',
        onPress: () => signDelete(),
        style: 'cancel',
      },
      {text: '취소'},
    ]);
  };

  const signDelete = () => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    fetch(serverIP + apis.userDelete, {
      method: 'DELETE',
      headers: requestHeaders,
    })
      //.then(response => response.json())
      .then(response => {
        Toast.show('회원탈퇴하였습니다.');
        // 로그아웃
        logout().then(() => {
          dispatch(authorize(null));
          navigation.navigate('Main');
        });
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewProfile}>
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
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewContentItem}>
          <View style={styles.viewContentTitle}>
            <Text style={styles.textStyle}>닉네임</Text>
          </View>
          <View style={styles.viewContentContent}>
            <Text style={styles.textStyle}>{user?.nickname}</Text>
          </View>
        </View>
        <View style={styles.viewContentItem}>
          <View style={styles.viewContentTitle}>
            <Text style={styles.textStyle}>휴대전화</Text>
          </View>
          <View style={styles.viewContentContent}>
            <Text style={styles.textStyle}>{user?.phone}</Text>
          </View>
        </View>
        <View style={styles.viewContentItem}>
          <View style={styles.viewContentTitle}>
            <Text style={styles.textStyle}>비상연락처</Text>
          </View>
          <View style={styles.viewContentContent}>
            <Text style={styles.textStyle}>{user?.emergency}</Text>
          </View>
        </View>
        <View style={styles.viewOut}>
          <Text onPress={() => outClicked()}>회원탈퇴</Text>
        </View>
        {/*
        <View style={styles.viewContentTitle}>
          <Text style={styles.textStyle}>닉네임</Text>
          <Text style={styles.textStyle}>휴대전화</Text>
          <Text style={styles.textStyle}>비상연락처</Text>
        </View>
        <View style={styles.viewContentContent}>
          <Text style={styles.textStyle}>{user?.nickname}</Text>
          <Text style={styles.textStyle}>{user?.phone}</Text>
          <Text style={styles.textStyle}>{user?.emergency}</Text>
        </View>*/}
      </View>
    </View>
  );
};
export default MyPageContent;
