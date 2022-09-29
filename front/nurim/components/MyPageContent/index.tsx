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
    marginTop: '5%',
  },
  viewProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewContent: {
    marginTop: '5%',
    marginLeft: '20%',
    marginRight: '20%',
    flexDirection: 'row',
  },
  viewContentTitle: {
    width: '45%',
  },
  viewContentContent: {
    width: '55%',
  },
  textSize: {
    fontSize: 16,
    marginTop: '5%',
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
        <View style={styles.viewContentTitle}>
          <Text style={styles.textSize}>닉네임</Text>
          <Text style={styles.textSize}>휴대전화</Text>
          <Text style={styles.textSize}>비상연락처</Text>
        </View>
        <View style={styles.viewContentContent}>
          <Text style={styles.textSize}>{user?.nickname}</Text>
          <Text style={styles.textSize}>{user?.phone}</Text>
          <Text style={styles.textSize}>{user?.emergency}</Text>
        </View>
      </View>
    </View>
  );
};
export default MyPageContent;
