/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Placeinfo from '../components/PlaceInfo';
import PlaceReview from '../components/PlaceReview';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackNavigationProp, MainParams} from './RootStack';
import {serverIP, apis} from '../common/urls';
import {IPlace} from '../components/PlacePreview';

type PlaceDetailRouteProp = RouteProp<MainParams, 'PlaceDetail'>;
type PlaceDetailProps = {
  navigation: MainStackNavigationProp;
};

const PlaceDetail = () => {
  const {params} = useRoute<PlaceDetailRouteProp>();

  // 시설 데이터
  const [placeAllInfo, setPlaceAllInfo] = useState<IPlace | null>(null);

  useEffect(() => {
    getPlaceAll();
  }, [params]);

  // 시설 ID에 맞는 데이터 구하기
  const getPlaceAll = (): void => {
    fetch(serverIP + apis.placeAllInfo + '/' + params.locatID, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        setPlaceAllInfo(response);
      })
      .catch(e => console.log('PlacePreview 에러 임당', e));
  };

  return (
    <SafeAreaView>
      <Placeinfo placeAllInfo={placeAllInfo} />
      {/* <PlaceReview placeAllInfo={placeAllInfo}/> */}
    </SafeAreaView>
  );
};

export default PlaceDetail;
