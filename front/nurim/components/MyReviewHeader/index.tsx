import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PopTab from '../../components/PopTab';
import {getColor} from '../../common/colors';
import {MainStackNavigationProp} from './../../screens/RootStack';
import {Tab, Text, TabView, Avatar} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

type MyReviewHeaderProps = {
  navigation: MainStackNavigationProp;
  selectedMenu: number;
  setSelectedMenu: (selectedMenu: number) => void;
  myReviewCnt: number;
  myFavorCnt: number;
};
const MyReviewHeader = (props: MyReviewHeaderProps) => {
  // redux
  const user = useSelector((state: RootState) => state.auth.user);

  // 스타일 속성
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('HEADER'),
    },
    titleText: {
      fontSize: 20,
      textAlign: 'center',
    },
    titleHeight: {
      height: '30%',
    },
    contentHeight: {
      height: '60%',
    },
    tabBackColor: {
      backgroundColor: getColor('HEADER'),
    },
    viewBack: {
      flex: 1,
      //height: '20%',
    },
    viewProfile: {
      flex: 2,
      //height: '50%',
      flexDirection: 'row',
    },
    viewProfilePicture: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewProfileContent: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewTab: {
      flex: 1,
      //height: '30%',
    },
    textWhite: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      {/* 뒤로가기 탭 */}
      <View style={styles.viewBack}>
        <PopTab
          title=""
          titleColor="rgba(0, 0, 0, 0.4)"
          navigation={props.navigation}
          color={getColor('HEADER')}
        />
      </View>
      {/* 프로필 파트 */}
      <View style={styles.viewProfile}>
        <View style={styles.viewProfilePicture}>
          <Avatar
            size="large"
            rounded
            source={{
              uri: `${user?.profile}`,
            }}
            /*
            containerStyle={{
              borderColor: 'rgba(0, 0, 0, 0.4)',
              borderStyle: 'solid',
              borderWidth: 3,
            }}*/
          />
        </View>
        {/* 내정보/ 작성리뷰/ 즐겨찾기 */}
        <View style={styles.viewProfileContent}>
          <Text style={[styles.textWhite, {fontSize: 16, marginBottom: 5}]}>
            {user?.nickname}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View>
              <Text style={[styles.textWhite, {textAlign: 'center'}]}>
                {`작성리뷰\n${props.myReviewCnt}`}
              </Text>
            </View>
            <View
              style={{
                width: '1%',
                height: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}></View>
            <View>
              <Text style={[styles.textWhite, {textAlign: 'center'}]}>
                {`즐겨찾기\n${props.myFavorCnt}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* 탭 버튼 */}
      <View style={styles.viewTab}>
        <Tab
          style={styles.tabBackColor}
          value={props.selectedMenu}
          onChange={e => props.setSelectedMenu(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 2,
          }}>
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: '#36BC9B',
            })}
            title="내리뷰보기"
            titleStyle={
              props.selectedMenu === 0
                ? {color: 'white', fontSize: 15}
                : {fontSize: 15}
            }
          />
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: '#36BC9B',
            })}
            title="내즐겨찾기"
            titleStyle={
              props.selectedMenu === 1
                ? {color: 'white', fontSize: 15}
                : {fontSize: 15}
            }
          />
        </Tab>
      </View>
    </View>
  );
};

export default MyReviewHeader;
