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
    marginTop: '10%',
  },
  profileImg: {
    borderColor: '#5a5c5c9a',
    borderStyle: 'solid',
    borderWidth: 5,
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
    borderBottomColor: 'rgba(54, 188, 155, 0.6)',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },
  contentTextStyle: {
    fontSize: 16,
    marginBottom: '5%',
    color: 'black',
  },
  titleTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b2c2cc2',
  },
});
const MyPageContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user?.profile);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewProfile}>
        <Avatar
          size={250}
          rounded
          source={{
            uri: `${user?.profile}`,
          }}
          containerStyle={styles.profileImg}
        />
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewContentItem}>
          <View style={styles.viewContentTitle}>
            <Text style={styles.titleTextStyle}>닉네임</Text>
          </View>
          <View style={styles.viewContentContent}>
            <Text style={styles.contentTextStyle}>{user?.nickname}</Text>
          </View>
        </View>
        <View style={styles.viewContentItem}>
          <View style={styles.viewContentTitle}>
            <Text style={styles.titleTextStyle}>휴대전화</Text>
          </View>
          <View style={styles.viewContentContent}>
            <Text style={styles.contentTextStyle}>{user?.phone}</Text>
          </View>
        </View>
        <View style={styles.viewContentItem}>
          <View style={styles.viewContentTitle}>
            <Text style={styles.titleTextStyle}>비상연락처</Text>
          </View>
          <View style={styles.viewContentContent}>
            <Text style={styles.contentTextStyle}>{user?.emergency}</Text>
          </View>
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
