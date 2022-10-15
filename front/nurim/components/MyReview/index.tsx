import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ReviewType} from '../../screens/MyReviewFavor';
import MyReviewContent from '../MyReviewContent';

type MyReviewProps = {
  myReview: ReviewType[] | undefined;
};
const MyReview = (props: MyReviewProps) => {
  return (
    <View>
      <ScrollView>
        {props.myReview?.map(review => (
          <MyReviewContent
            key={review.id}
            locationName={review.locationName}
            content={review.content}
            date={review.date}
            type={review.type}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyReview;
