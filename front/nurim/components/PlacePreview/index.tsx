/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Linking, Button, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {serverIP, apis} from '../../common/urls';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {useNavigation} from '@react-navigation/native';
import PlaceFuncBox from '../PlaceFuncBox';
import {ILocation} from '../Map';

interface reviewColor {
  content: string;
  createdDate: string;
  nickname: string;
  reviewId: number;
}

interface IReviews {
  green: reviewColor[];
  red: reviewColor[];
  yellow: reviewColor[];
}

interface IAddition {
  reviewId: number;
  content: string;
  createdDate: string;
  nickname: string;
}

interface IReviewCount {
  green: number;
  yellow: number;
  red: number;
  total: number;
}

export type IPlace = {
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
};

interface PlacePreviewProps {
  locatID: number;
  location: ILocation;
}

const PlacePreview = (props: PlacePreviewProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  // 시설 데이터
  const [placeInfo, setPlaceInfo] = useState<IPlace | null>(null);

  useEffect(() => {
    getPlaceInfo();
  }, []);

  // 시설 ID에 맞는 데이터 구하기
  const getPlaceInfo = (): void => {
    fetch(serverIP + apis.placeAllInfo + '/' + props.locatID, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        setPlaceInfo(response);
      })
      .catch(e => console.log('PlacePreview 에러 임당', e));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 제목, 상세보기 */}
      <View style={styles.header}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {placeInfo?.locationName}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('PlaceDetail', {
              locatID: props.locatID,
              location: props.location,
            });
          }}>
          <Text>상세보기</Text>
        </Pressable>
      </View>
      {/* 서브카테고리 */}
      <Text style={{paddingLeft: 5, color: 'gray'}}>
        {placeInfo?.subCategoryName}
      </Text>
      {/* 주소, 영업시간(있으면) */}
      <View style={styles.info}>
        <Text>{placeInfo?.address}</Text>
        {placeInfo?.openingHours ? <Text>{placeInfo.openingHours}</Text> : null}
      </View>
      {/* 리뷰 */}
      <View style={styles.review}>
        {/* <Icon name={'circle'} size={15} color="green" /> */}
        <Text style={{padding: 5, color: 'gray'}}>
          🟢 {placeInfo?.reviewCount.green}
        </Text>
        <Text style={{padding: 5, color: 'gray'}}>
          | 🟠 {placeInfo?.reviewCount.yellow}
        </Text>
        <Text style={{padding: 5, color: 'gray'}}>
          | 🔴 {placeInfo?.reviewCount.red}
        </Text>
        <Text style={{padding: 5, color: 'gray'}}>
          | 한줄평 {placeInfo?.reviewCount.total}
        </Text>
      </View>
      {/* 전화, 리뷰, 즐겨찾기 */}
      <View style={styles.funcbox}>
        <PlaceFuncBox preview={placeInfo} />
        {/* <Text>전화걸기 | 통계 | 즐겨찾기</Text> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // 검색창 스타일
  container: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  info: {
    padding: 5,
  },
  review: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  funcbox: {
    alignContent: 'center',
    marginVertical: 10,
    // borderColor: 'blue',
    // borderWidth: 10,
  },
});

export default PlacePreview;
