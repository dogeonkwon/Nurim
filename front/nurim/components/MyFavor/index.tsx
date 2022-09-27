import React from 'react';
import {View, Text} from 'react-native';
import {FavorType} from '../../screens/MyReviewFavor';

type MyFavorProps = {
  myFavor: FavorType[] | undefined;
};

const MyFavor = (props: MyFavorProps) => {
  return (
    <View>
      {props.myFavor?.map(favor => (
        <Text>
          {favor.locationName} {favor.locationAddress}
        </Text>
      ))}
    </View>
  );
};

export default MyFavor;
