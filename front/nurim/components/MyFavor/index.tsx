import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {FavorType} from '../../screens/MyReviewFavor';
import MyFavorContent from '../MyFavorContent';

type MyFavorProps = {
  myFavor: FavorType[] | undefined;
};

const MyFavor = (props: MyFavorProps) => {
  return (
    <View>
      <ScrollView>
        {props.myFavor?.map(favor => (
          <MyFavorContent
            key={favor.id}
            locationName={favor.locationName}
            locationAddress={favor.locationAddress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyFavor;
