/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import React from 'react';
import {SafeAreaView} from 'react-native';
import Placeinfo from '../components/PlaceInfo';
import PlaceReview from '../components/PlaceReview';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackNavigationProp, MainParams} from './RootStack';

type PlaceDetailRouteProp = RouteProp<MainParams, 'PlaceDetail'>;
type PlaceDetailProps = {
  navigation: MainStackNavigationProp;
};

const PlaceDetail = () => {
  const {params} = useRoute<PlaceDetailRouteProp>();
  console.log(params);
  return (
    <SafeAreaView>
      {/* <Placeinfo />
      <PlaceReview /> */}
    </SafeAreaView>
  );
};

export default PlaceDetail;
