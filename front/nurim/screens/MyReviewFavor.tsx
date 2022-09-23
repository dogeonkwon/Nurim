import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParams, MainStackNavigationProp} from './RootStack';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'; // 스택 내비게이션
import MyReviewHeader from '../components/MyReviewHeader';
import MyReview from '../components/MyReview';
import MyFavor from '../components/MyFavor';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeight: {
    height: '30%',
  },
  contentHeight: {
    height: '60%',
  },
});

type MyReviewFavorRouteProp = RouteProp<RootStackParams, 'MyReviewFavor'>;
type MyReviewFavorProps = {
  navigation: MainStackNavigationProp;
};
const MyReviewFavor = ({navigation}: MyReviewFavorProps) => {
  const {params} = useRoute<MyReviewFavorRouteProp>();

  const [viewType, setViewType] = useState<number>(params?.type);

  return (
    <View style={styles.container}>
      <View style={styles.titleHeight}>
        <Button title="<" onPress={() => navigation.navigate('Main')}></Button>
        <MyReviewHeader />
      </View>
      <View style={styles.contentHeight}>
        {params.type === 1 ? <MyReview /> : <MyFavor />}
      </View>
    </View>
  );
};

export default MyReviewFavor;
