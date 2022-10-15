import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const PlaceReview = () => {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: 'blue'}}>
        <Text>리뷰 수</Text>
      </View>
      <View style={{backgroundColor: 'green'}}>
        <Text>리뷰 목록</Text>
      </View>
      <View style={{backgroundColor: 'blue'}}>
        <Text>리뷰 작성</Text>
      </View>
    </SafeAreaView>
  );
};
export default PlaceReview;
