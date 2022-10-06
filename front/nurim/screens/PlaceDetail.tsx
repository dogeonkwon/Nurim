// placeDetail
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Placeinfo from '../components/PlaceInfo';
import PlaceReview from '../components/PlaceReview';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackNavigationProp, MainParams} from './RootStack';
import {serverIP, apis} from '../common/urls';
import {IPlace} from '../components/PlacePreview';
import PopTab from '../components/PopTab';
import PlaceDetailTab from '../components/PlaceDetailTab';
import PlaceDetailChart from '../components/PlaceDetailChart';

type PlaceDetailRouteProp = RouteProp<MainParams, 'PlaceDetail'>;
type PlaceDetailProps = {
  navigation: MainStackNavigationProp;
};

const PlaceDetail = (props: PlaceDetailProps) => {
  const {params} = useRoute<PlaceDetailRouteProp>();

  // 시설 데이터
  const [placeAllInfo, setPlaceAllInfo] = useState<IPlace | null>(null);

  const [tabIndex, setTabIndex] = useState<number>(0);

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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <PopTab
          title={placeAllInfo?.locationName ? placeAllInfo.locationName : ''}
          titleColor="black"
          navigation={props.navigation}
          color="white"
        />
      </View>
      {/* <ScrollView nestedScrollEnabled={true}> */}
      <View style={{flex: 4}}>
        <Placeinfo placeAllInfo={placeAllInfo} location={params.location} />
      </View>
      <View
        style={{
          marginLeft: '5%',
          marginRight: '5%',
          marginTop: '5%',
          flex: 4,
        }}>
        <PlaceDetailTab
          locationId={
            placeAllInfo?.locationName ? placeAllInfo?.locationName : ''
          }
          tabIndex={tabIndex}
          reviewInfo={placeAllInfo}
          setTabIndex={setTabIndex}
        />
        {tabIndex === 0 ? (
          <PlaceReview reviewInfo={params.locatID} />
        ) : (
          <PlaceDetailChart locationId={params.locatID} />
        )}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default PlaceDetail;
