import React from 'react';
import {View, Text} from 'react-native';
import {ReviewType} from '../../screens/MyReviewFavor';

type MyReviewProps = {
  myReview: ReviewType[] | undefined;
};
const MyReview = (props: MyReviewProps) => {
  return (
    <View>
      {props.myReview?.map(review => (
        <Text>{review.content}</Text>
      ))}
    </View>
  );
};

export default MyReview;
