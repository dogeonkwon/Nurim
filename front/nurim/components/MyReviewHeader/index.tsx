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
      height: '20%',
    },
    viewProfile: {
      height: '50%',
      flexDirection: 'row',
    },
    viewProfilePicture: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewProfileContent: {
      width: '50%',
    },
    viewTab: {
      height: '30%',
    },
  });

  return (
    <View style={styles.container}>
      {/* 뒤로가기 탭 */}
      <View style={styles.viewBack}>
        <PopTab
          title=""
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
          <Text>닉네임 : {user?.nickname}</Text>
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
            titleStyle={{fontSize: 15, color: 'white'}}
          />
          <Tab.Item
            containerStyle={active => ({
              backgroundColor: '#36BC9B',
            })}
            title="내즐겨찾기"
            titleStyle={{fontSize: 15}}
          />
        </Tab>
      </View>
    </View>
  );
};

export default MyReviewHeader;
