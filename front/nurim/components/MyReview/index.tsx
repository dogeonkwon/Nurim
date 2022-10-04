import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ReviewType} from '../../screens/MyReviewFavor';
import MyReviewContent from '../MyReviewContent';

type MyReviewProps = {
  myReview: ReviewType[] | undefined;
  refreshReview: boolean;
  setRefreshReview: (refreshReview: boolean) => void;
};
const MyReview = (props: MyReviewProps) => {
  return (
    <View>
      <ScrollView>
        {props.myReview?.map(review => (
          <MyReviewContent
            key={review.id}
            reviewId={review.reviewId}
            locationName={review.locationName}
            content={review.content}
            date={review.date}
            type={review.type}
            refreshReview={props.refreshReview}
            setRefreshReview={props.setRefreshReview}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyReview;
