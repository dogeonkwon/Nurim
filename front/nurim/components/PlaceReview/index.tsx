/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  StatusBar,
  TextInputBase,
} from 'react-native';
import {IPlace} from '../PlacePreview';
import {Button, Overlay} from '@rneui/themed';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import {Flex} from '@react-native-material/core';
import {Input} from '@rneui/base';

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
  // 유저 정보 불러오기
  const user = useSelector((state: RootState) => state.auth.user);

  // 리뷰 종류(0: 전체, 1: 초록, 2: 노랑, 3: 빨강)
  const [reviewList, setReviewList] = useState<number>(4);

  // 리뷰 종류에 맞는 리뷰 리스트
  const [allReview, setAllReview] = useState<subListType[]>([]);

  // 모달창
  const [visible, setVisible] = useState(false);

  // 리뷰 등록 할 때 신호등 지수
  const [reviewColor, setReviewColor] = useState<number>(0);

  // 리뷰 글
  const [text, onChangeText] = useState<string>('');

  // 초록 불
  const [greenLight, onChangeGreenLight] = useState<string>(
    'rgba(204, 204, 204, 1)',
  );

  // 주황 불
  const [yellowLight, onChangeYellowLight] = useState<string>(
    'rgba(204, 204, 204, 1)',
  );

  // 빨간 불
  const [redLight, onChangeRedLight] = useState<string>(
    'rgba(204, 204, 204, 1)',
  );

  // 시설 데이터
  const [reviewInfo, setReviewInfo] = useState<IPlace | null>(null);

  useEffect(() => {
    getPlaceAll();
  }, [visible]);

  // 시설 ID에 맞는 데이터 구하기
  const getPlaceAll = (): void => {
    fetch(
      serverIP + apis.placeAllInfo + '/' + placeAllInfo.reviewInfo?.locationId,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(response => {
        setReviewInfo(response);
      })
      .catch(e => console.log('PlacePreview 에러 임당', e));
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getGreen = () => {
    setReviewColor(1);
    onChangeGreenLight('rgba(000, 204, 000, 1)');
    onChangeYellowLight('rgba(204, 204, 204, 1)');
    onChangeRedLight('rgba(204, 204, 204, 1)');
  };

  const getYellow = () => {
    setReviewColor(2);
    onChangeGreenLight('rgba(204, 204, 204, 1)');
    onChangeYellowLight('rgba(255, 193, 7, 1)');
    onChangeRedLight('rgba(204, 204, 204, 1)');
  };

  const getRed = () => {
    setReviewColor(3);
    onChangeGreenLight('rgba(204, 204, 204, 1)');
    onChangeYellowLight('rgba(204, 204, 204, 1)');
    onChangeRedLight('rgba(214, 61, 57, 1)');
  };

  useEffect(() => {
    getAllReview();
  }, [placeAllInfo.reviewInfo?.locationId]);

  useEffect(() => {
    getAllReview();
  }, [reviewList]);

  useEffect(() => {
    console.log(allReview);
  }, [allReview]);

  // 서버로 리뷰 등록하기
  const pushReview = (): void => {
    if (user) {
      // 통신 헤더 정의
      const requestHeaders = new Headers();
      requestHeaders.set('jwt-token', user?.token ? user.token : '');
      requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
      fetch(serverIP + apis.reviewWrite, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({
          content: text,
          locationId: placeAllInfo.reviewInfo?.locationId,
          type: reviewColor,
        }),
      }).catch(error => console.log('pushMyFavor 에러 임당', error));
    }
    toggleOverlay();
    getAllReview();
  };

  // 리뷰리스트 가져오기
  const getAllReview = () => {
    let subLists: subListType[] = [];
    if (reviewList === 4) {
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

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.underSignalPart}>
        <View style={styles.container}>
          <Text onPress={() => setReviewList(1)} style={{color: 'black'}}>
            🟢 {placeAllInfo.reviewInfo?.reviewCount.green}
          </Text>
          <Text onPress={() => setReviewList(2)} style={{color: 'black'}}>
            | 🟠 {placeAllInfo.reviewInfo?.reviewCount.yellow}
          </Text>
          <Text onPress={() => setReviewList(3)} style={{color: 'black'}}>
            | 🔴 {placeAllInfo.reviewInfo?.reviewCount.red}
          </Text>
          <Text onPress={() => setReviewList(4)} style={{color: 'black'}}>
            | 총 리뷰 {placeAllInfo.reviewInfo?.reviewCount.total} 건
          </Text>
        </View>
        <View style={styles.reviewListView}>
          <ScrollView
            style={styles.reviewScrollView}
            nestedScrollEnabled={true}>
            <View>
              {allReview.map((e, idx) => (
                <View key={idx} style={styles.eachReaviewView}>
                  <View style={styles.nameDay}>
                    <Text style={styles.name}>{e.nickname}</Text>
                    <Text style={styles.day}>
                      {e.createdDate.slice(0, 4)}.{e.createdDate.slice(4, 6)}.
                      {e.createdDate.slice(6, 8)}
                    </Text>
                  </View>
                  <Text style={styles.content}>{e.content}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <Button
            title="리뷰 작성"
            onPress={toggleOverlay}
            buttonStyle={styles.button}
          />
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <SafeAreaView style={styles.popup}>
              <Text style={styles.textPrimary}>
                사용자의 경험을 공유해 주세요.
              </Text>
              <View style={styles.userExp}>
                <View style={styles.userExpCon}>
                  <Button
                    onPress={getGreen}
                    containerStyle={styles.userConBtn}
                    buttonStyle={{backgroundColor: greenLight}}>
                    좋아요
                  </Button>
                  <Button
                    onPress={getYellow}
                    containerStyle={styles.userConBtn}
                    buttonStyle={{backgroundColor: yellowLight}}>
                    보통
                  </Button>
                  <Button
                    onPress={getRed}
                    containerStyle={styles.userConBtn}
                    buttonStyle={{backgroundColor: redLight}}>
                    나빠요
                  </Button>
                </View>
                <View style={styles.userExpWriteView}>
                  <TextInput
                    style={styles.userExpWrite}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={100}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="시설에 대한 만족도를 남겨주세요."
                  />
                </View>
                <View style={styles.userExpCon}>
                  <Button
                    containerStyle={styles.defaultBtn}
                    buttonStyle={styles.cancelBtn}
                    title="취소"
                    onPress={toggleOverlay}
                  />
                  <Button
                    containerStyle={styles.defaultBtn}
                    buttonStyle={styles.registBtn}
                    title="등록"
                    onPress={() => {
                      user
                        ? pushReview()
                        : Alert.alert('회원가입 후 이용가능합니다.');
                    }}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Overlay>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  underSignalPart: {
    marginLeft: 10,
    marginRight: 10,
    // flex: 0.1,
  },
  container: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightgray',
    marginBottom: 5,
    padding: 3,
  },
  reviewListView: {
    display: 'flex',
    flexDirection: 'column',
  },
  reviewScrollView: {
    height: '35%',
  },
  eachReaviewView: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 1,
  },
  nameDay: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  name: {
    fontSize: 15,
    color: 'black',
  },
  day: {
    marginLeft: 5,
    fontSize: 10,
    color: 'gray',
  },
  content: {
    marginBottom: 3,
    color: '#414141',
    fontSize: 13,
  },
  popup: {
    padding: 5,
    maxWidth: '90%',
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
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(54, 188, 155, 1)',
  },
  textPrimary: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
    width: '100%',
    marginHorizontal: 4,
  },
  userExp: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  userExpCon: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  userConBtn: {
    width: '30%',
  },
  userExpWriteView: {
    backgroundColor: '#e2e3e2',
    marginVertical: 10,
    padding: 0,
  },
  userExpWrite: {
    flexShrink: 1,
    margin: 0,
  },
  defaultBtn: {
    width: '45%',
  },
  cancelBtn: {
    backgroundColor: '#494949',
  },
  registBtn: {
    backgroundColor: '#3ec689',
  },
});

export default PlaceReview;
