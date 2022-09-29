import React from 'react';
import {View, Text} from 'react-native';
import {FavorType} from '../../screens/MyReviewFavor';
import MyFavorContent from '../MyFavorContent';

type MyFavorProps = {
  myFavor: FavorType[] | undefined;
};

const MyFavor = (props: MyFavorProps) => {
  return (
    <View>
      {props.myFavor?.map(favor => (
        <MyFavorContent
          locationName={favor.locationName}
          locationAddress={favor.locationAddress}
        />
      ))}
    </View>
  );
};

export default MyFavor;
