/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Linking, View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaxiPreview from '../TaxiPreview';
import EmergencyList from '../EmergencyList';
import {MainStackNavigationProp} from '../../screens/RootStack';

interface IReviews {
  additionalProp1: object[];
  additionalProp3: object[];
  additionalProp2: object[];
}

interface IReviewCount {
  green: number;
  yellow: number;
  red: number;
  total: number;
}

interface IPlace {
  id: number;
  locationId: number;
  locationName: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  openingHours: string;
  subCategoryName: string;
  mainCategoryName: string;
  mainCategoryId: string;
  sido: string;
  gu: string;
  dong: string;
  facilities: string[];
  reviews: IReviews;
  reviewCount: IReviewCount;
}

const PlaceFuncBox = (placeInfo: IPlace) => {
  console.log(placeInfo);
  console.log(placeInfo.phone);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          Linking.openURL(`tel: ${placeInfo.phone}`);
        }}>
        <Icon name={'call'} size={30} />
        <Text>{placeInfo.phone}</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Icon name={'cellular'} size={30} />
        <Text>통계 보기</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Icon name={'heart-outline'} size={30} />
        <Text>즐겨 찾기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
  },
  // 버튼의 스타일
  button: {
    padding: 5,
    alignItems: 'center',
  },
});

export default PlaceFuncBox;
