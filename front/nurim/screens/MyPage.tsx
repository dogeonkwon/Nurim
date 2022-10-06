import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Tab, Text, TabView} from '@rneui/themed';

import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParams, MainStackNavigationProp} from './RootStack';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'; // 스택 내비게이션
import PopTab from '../components/PopTab';
import {getColor} from '../common/colors';
import MyPageHeader from '../components/MyPageHeader';
import MyPageContent from '../components/MyPageContent';
import UpdateProfile from '../components/UpdateProfile';
import {useIsFocused} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeight: {
    height: '25%',
  },
  contentHeight: {
    height: '75%',
  },
});

type MyReviewFavorRouteProp = RouteProp<RootStackParams, '마이페이지'>;
type MyReviewFavorProps = {
  navigation: MainStackNavigationProp;
};
const MyPage = ({navigation}: MyReviewFavorProps) => {
  const {params} = useRoute<MyReviewFavorRouteProp>();

  // 0: 내정보조회 1: 내정보수정
  const [selectedMenu, setSelectedMenu] = useState<number>(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    setSelectedMenu(0);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.titleHeight}>
        <MyPageHeader
          navigation={navigation}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </View>
      <View style={styles.contentHeight}>
        {selectedMenu === 0 ? (
          <MyPageContent />
        ) : (
          <UpdateProfile setSelectedMenu={setSelectedMenu} />
        )}
      </View>
    </View>
    /*
    <View style={styles.container}>
      <View style={styles.titleHeight}>
        <PopTab title="내 정보 수정" navigation={navigation} color="" />
      </View>
      <View style={styles.contentHeight}>
        {selectedMenu === 0 ? <MyPageContent /> : <UpdateProfile />}
      </View>
    </View>
    */
  );
};

export default MyPage;
