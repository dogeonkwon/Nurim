/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import React from 'react';
import {SafeAreaView} from 'react-native';
import Placeinfo from '../components/PlaceInfo';
import PlaceReview from '../components/PlaceReview';

const PlaceDetail = () => {
  return (
    <SafeAreaView>
      <Placeinfo />
      <PlaceReview />
    </SafeAreaView>
  );
};

export default PlaceDetail;
