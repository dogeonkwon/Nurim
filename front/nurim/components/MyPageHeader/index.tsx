import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PopTab from '../../components/PopTab';
import {getColor} from '../../common/colors';
import {MainStackNavigationProp} from './../../screens/RootStack';
import {Tab, Text, TabView} from '@rneui/themed';

type MyPageHeaderProps = {
  navigation: MainStackNavigationProp;
  selectedMenu: number;
  setSelectedMenu: (selectedMenu: number) => void;
};
const MyPageHeader = (props: MyPageHeaderProps) => {
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
    tabBackColor: {
      backgroundColor: getColor('HEADER'),
    },
    viewBack: {
      flex: 2,
      //height: '25%',
    },
    viewContent: {
      flex: 5,
      //height: '40%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewTab: {
      flex: 3,
      //height: '35%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.viewBack}>
        <PopTab
          title=""
          titleColor="rgba(0, 0, 0, 0.4)"
          navigation={props.navigation}
          color={getColor('HEADER')}
        />
      </View>
      <View style={styles.viewContent}>
        <Text style={styles.titleText}>내계정</Text>
      </View>
      <View style={styles.viewTab}>
        <Tab
          style={[styles.tabBackColor, styles.viewTab]}
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
            title="내정보보기"
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
            title="내정보수정"
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

export default MyPageHeader;
