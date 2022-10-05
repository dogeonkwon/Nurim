import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParams, MainStackNavigationProp} from './RootStack';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'; // 스택 내비게이션
import MyReviewHeader from '../components/MyReviewHeader';
import MyReview from '../components/MyReview';
import MyFavor from '../components/MyFavor';
import {useIsFocused} from '@react-navigation/native';
import {serverIP, apis} from '../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../slices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeight: {
    flex: 3,
  },
  contentHeight: {
    flex: 7,
  },
});

// 나의 리뷰 타입 지정
export type ReviewType = {
  id: number; // 식별자
  reviewId: number; // 리뷰아이디
  locationName: string; // 업체명
  content: string; // 리뷰내용
  date: string; // 작성일
  type: number; // 신호등지수
};

export type FavorType = {
  id: number; // 식별자
  favoriteId: number; // 업체 번호
  locationName: string; // 업체명
  locationAddress: string; // 주소
};

type MyReviewFavorRouteProp = RouteProp<RootStackParams, 'MyReviewFavor'>;
type MyReviewFavorProps = {
  navigation: MainStackNavigationProp;
};
const MyReviewFavor = ({navigation}: MyReviewFavorProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {params} = useRoute<MyReviewFavorRouteProp>();
  // 나의리뷰/즐겨찾기 메뉴 스왑용도
  const [selectedMenu, setSelectedMenu] = useState<number>(params?.type);
  // 나의 리뷰 Data
  const [myReview, setMyReview] = useState<ReviewType[] | undefined>();
  // 나의 리뷰 갯수
  const [myReviewCnt, setMyReviewCnt] = useState<number>(0);
  // 나의 즐겨찾기 Data
  const [myFavor, setMyFavor] = useState<FavorType[] | undefined>();
  // 나의 즐겨찾기 갯수
  const [myFavorCnt, setMyFavorCnt] = useState<number>(0);

  // 리프레시용 상태
  const [refreshReview, setRefreshReview] = useState<boolean>(false);
  const [refreshFavor, setRefreshFavor] = useState<boolean>(false);

  // 화면 포커스 인식용
  const isFocused = useIsFocused();

  // 화면이 포커스되었을 때 실행
  useEffect(() => {
    setSelectedMenu(params?.type);
    getMyReview();
    getMyFavor();
  }, [isFocused]);

  // 선택 탭이 바뀌었을 때
  useEffect(() => {
    if (selectedMenu === 0) {
      getMyReview();
    } else {
      getMyFavor();
    }
  }, [selectedMenu]);

  useEffect(() => {
    getMyReview();
  }, [refreshReview]);

  useEffect(() => {
    getMyFavor();
  }, [refreshFavor]);

  // 나의 리뷰 GET 서버 통신
  const getMyReview = (): void => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    let count = 0;
    fetch(serverIP + apis.myReviewInfo, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then(response => response.json())
      .then(response => {
        // 수신된 데이터 깊은 복사
        const datas = [...response];
        // 새롭게 업데이트할 배열 생성
        let newDatas: ReviewType[] = [];
        datas.map((data, index) => {
          // 리뷰 객체 생성
          const newData: ReviewType = {
            id: index,
            reviewId: data.reviewId,
            locationName: data.locationName,
            content: data.content,
            date: data.createdDate,
            type: data.type,
          };
          // 생성한 리뷰 객체를 배열에 push
          newDatas.push(newData);
          count++;
        });
        // 생성한 리뷰 배열을 상태에 업데이트
        setMyReview(newDatas);
        setMyReviewCnt(count);
      })
      .catch(error => console.log(error));
  };

  // 서버에서 나의 즐겨찾기 가져오기
  const getMyFavor = (): void => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    let count = 0;
    fetch(serverIP + apis.favorInfo, {
      method: 'GET',
      headers: requestHeaders,
    })
      .then(response => response.json())
      .then(response => {
        const datas = [...response];
        let newDatas: FavorType[] = [];
        datas.map((data, index) => {
          const newData: FavorType = {
            id: index,
            favoriteId: data.favoriteId,
            locationName: data.locationName,
            locationAddress: data.locationAddress,
          };
          newDatas.push(newData);
          count++;
        });
        setMyFavor(newDatas);
        setMyFavorCnt(count);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleHeight}>
        <MyReviewHeader
          navigation={navigation}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          myReviewCnt={myReviewCnt}
          myFavorCnt={myFavorCnt}
        />
      </View>

      <View style={styles.contentHeight}>
        {selectedMenu === 0 ? (
          <MyReview
            myReview={myReview}
            refreshReview={refreshReview}
            setRefreshReview={setRefreshReview}
          />
        ) : (
          <MyFavor
            myFavor={myFavor}
            refreshFavor={refreshFavor}
            setRefreshFavor={setRefreshFavor}
          />
        )}
      </View>
    </View>
  );
};

export default MyReviewFavor;
