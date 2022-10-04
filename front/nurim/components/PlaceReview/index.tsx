/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {IPlace} from '../PlacePreview';

type IReviewType = {
  reviewInfo: IPlace | null;
};

export type subListType = {
  id: number;
  content: string;
  createdDate: string;
  nickname: string;
  reviewId: number;
};

const PlaceReview = (placeAllInfo: IReviewType) => {
  const [reviewList, setReviewList] = useState<number>(0);

  const [allReview, setAllReview] = useState<object[]>([]);

  useEffect(() => {
    getAllReview();
  }, []);

  // console.log(placeAllInfo.reviewInfo?.reviews.green);
  const getAllReview = () => {
    let subLists: subListType[] = [];
    // { placeAllInfo}
    if (reviewList === 0) {
      {
        placeAllInfo.reviewInfo?.reviews.green.map((data1, idx) => {
          const subList1: subListType = {
            id: idx,
            content: data1.content,
            createdDate: data1.createdDate,
            nickname: data1.nickname,
            reviewId: data1.reviewId,
          };
          subLists.push(subList1);
        });
      }
      placeAllInfo.reviewInfo?.reviews.yellow.map((data2, idx) => {
        const subList2: subListType = {
          id: idx,
          content: data2.content,
          createdDate: data2.createdDate,
          nickname: data2.nickname,
          reviewId: data2.reviewId,
        };
        subLists.push(subList2);
      });
      placeAllInfo.reviewInfo?.reviews.red.map((data3, idx) => {
        const subList3: subListType = {
          id: idx,
          content: data3.content,
          createdDate: data3.createdDate,
          nickname: data3.nickname,
          reviewId: data3.reviewId,
        };
        subLists.push(subList3);
      });
      setAllReview(subLists);
    } else if (reviewList === 1) {
      placeAllInfo.reviewInfo?.reviews.green.map((data1, idx) => {
        const subList1: subListType = {
          id: idx,
          content: data1.content,
          createdDate: data1.createdDate,
          nickname: data1.nickname,
          reviewId: data1.reviewId,
        };
        subLists.push(subList1);
      });
      setAllReview(subLists);
    } else if (reviewList === 2) {
      placeAllInfo.reviewInfo?.reviews.yellow.map((data2, idx) => {
        const subList2: subListType = {
          id: idx,
          content: data2.content,
          createdDate: data2.createdDate,
          nickname: data2.nickname,
          reviewId: data2.reviewId,
        };
        subLists.push(subList2);
      });
      setAllReview(subLists);
    } else if (reviewList === 3) {
      placeAllInfo.reviewInfo?.reviews.red.map((data3, idx) => {
        const subList3: subListType = {
          id: idx,
          content: data3.content,
          createdDate: data3.createdDate,
          nickname: data3.nickname,
          reviewId: data3.reviewId,
        };
        subLists.push(subList3);
      });
      setAllReview(subLists);
    }
  };
  // console.log(placeAllInfo);e

  console.log(placeAllInfo.reviewInfo?.reviews, '@@@@@@@@@@@@@@@');

  // placeAllInfo.reviewInfo?.reviews.green.map((e, idx) => {
  //   console.log(e.content);
  // });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <Icon name={'circle'} size={15} color="green" /> */}
        <Text onPress={() => setReviewList(1)}>
          🟢 {placeAllInfo.reviewInfo?.reviewCount.green}
        </Text>
        <Text onPress={() => setReviewList(2)}>
          | 🟠 {placeAllInfo.reviewInfo?.reviewCount.yellow}
        </Text>
        <Text onPress={() => setReviewList(3)}>
          | 🔴 {placeAllInfo.reviewInfo?.reviewCount.red}
        </Text>
        <Text onPress={() => setReviewList(0)}>
          | 총 리뷰 {placeAllInfo.reviewInfo?.reviewCount.total} 건
        </Text>
      </View>
      <View>
        {allReview ? (
          allReview.map((e, idx) => {
            <Text>{e.content}</Text>;
          })
        ) : (
          <Text>등록된 리뷰가 없습니다.</Text>
        )}
      </View>
      <View style={{backgroundColor: 'blue'}}>
        <Text>리뷰 작성</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'gray',
  },
  change: {
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'gray',
  },
  icon: {
    margin: 15,
    alignItems: 'center',
  },
});

export default PlaceReview;
