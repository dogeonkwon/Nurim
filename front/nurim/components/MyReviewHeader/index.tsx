import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PopTab from '../../components/PopTab';
import {getColor} from '../../common/colors';
import {MainStackNavigationProp} from './../../screens/RootStack';
import {Tab, Text, TabView} from '@rneui/themed';

type MyReviewHeaderProps = {
  navigation: MainStackNavigationProp;
  selectedMenu: number;
  setSelectedMenu: (selectedMenu: number) => void;
};
const MyReviewHeader = (props: MyReviewHeaderProps) => {
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
  });

  return (
    <View style={styles.container}>
      <PopTab
        title=""
        navigation={props.navigation}
        color={getColor('HEADER')}
      />
      <Text style={styles.titleText}>마이페이지</Text>
      <Tab
        value={props.selectedMenu}
        onChange={e => props.setSelectedMenu(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 2,
        }}
        variant="#36BC9B">
        <Tab.Item
          containerStyle={active => ({
            backgroundColor: '#36BC9B',
          })}
          title="내정보보기"
          titleStyle={{fontSize: 15, color: 'white'}}
        />
        <Tab.Item
          containerStyle={active => ({
            backgroundColor: '#36BC9B',
          })}
          title="내정보수정"
          titleStyle={{fontSize: 15}}
        />
      </Tab>
    </View>
  );
};

export default MyReviewHeader;
