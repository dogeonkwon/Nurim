// 내정보보기 컴포넌트
// 2022-09-26 김국진
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Avatar, Divider, Icon} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '5%',
  },
  viewContent: {
    marginTop: '5%',
    marginLeft: '20%',
    marginRight: '20%',
  },
  textSize: {
    fontSize: 16,
    marginTop: '2%',
  },
});
const MyPageContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
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
        <Text style={styles.textSize}>닉네임: {user?.nickname}</Text>
        <Text style={styles.textSize}>휴대전화: {user?.phone}</Text>
        <Text style={styles.textSize}>비상연락처: {user?.emergency}</Text>
      </View>
    </View>
  );
};
export default MyPageContent;
