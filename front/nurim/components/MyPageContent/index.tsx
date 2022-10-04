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

  textStyle: {
    fontSize: 16,
    fontWeight: '600',
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
