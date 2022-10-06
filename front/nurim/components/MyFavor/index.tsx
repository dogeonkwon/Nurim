import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {FavorType} from '../../screens/MyReviewFavor';
import MyFavorContent from '../MyFavorContent';

type MyFavorProps = {
  myFavor: FavorType[] | undefined;
  refreshFavor: boolean;
  setRefreshFavor: (refreshFavor: boolean) => void;
};

const MyFavor = (props: MyFavorProps) => {
  return (
    <View>
      <ScrollView>
        {props.myFavor?.map(favor => (
          <MyFavorContent
            key={favor.id}
            favoriteId={favor.favoriteId}
            locationName={favor.locationName}
            locationAddress={favor.locationAddress}
            refreshFavor={props.refreshFavor}
            setRefreshFavor={props.setRefreshFavor}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyFavor;
