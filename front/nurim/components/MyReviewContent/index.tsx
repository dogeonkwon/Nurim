import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: '1%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewGreen: {
    backgroundColor: 'green',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDate: {
    fontSize: 13,
    textAlign: 'right',
  },
  textContent: {
    fontSize: 14,
    width: '80%',
  },
  textDelete: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'right',
  },
  imogeStyle: {
    padding: 5,
    fontSize: 22,
  },
});

type MyReviewContentProps = {
  reviewId: number;
  locationName: string;
  content: string;
  date: string;
  type: number;
  refreshReview: boolean;
  setRefreshReview: (refreshReview: boolean) => void;
};

const MyReviewContent = (props: MyReviewContentProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  // 날짜 포맷 맞추기
  const dateFormatChange = (date: string): string => {
    return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(
      6,
      8,
    )} ${date.substring(8, 10)}:${date.substring(10, 12)}:${date.substring(
      12,
      14,
    )} 작성`;
  };
  //
  const deleteButtonClicked = () => {
    Alert.alert('리뷰를 삭제하시겠습니까?', '', [
      {
        text: '확인',
        onPress: () => deleteReview(),
        style: 'cancel',
      },
      {text: '취소'},
    ]);
  };
  const deleteReview = () => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    fetch(serverIP + apis.reviewDelete + props.reviewId, {
      method: 'DELETE',
      headers: requestHeaders,
    })
      //.then(response => response.json())
      .then(response => {
        console.log(response);
        Toast.show('리뷰가 삭제되었습니다.');
        props.setRefreshReview(!props.refreshReview);
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewTitle}>
        <Text style={styles.textTitle}>{props.locationName}</Text>
        <Text style={styles.textDelete} onPress={() => deleteButtonClicked()}>
          리뷰삭제
        </Text>
      </View>
      <Text style={styles.textDate}>{dateFormatChange(props.date)}</Text>
      <View style={styles.viewContent}>
        {props.type === 1 ? (
          <Text style={styles.imogeStyle}>🟢</Text>
        ) : props.type === 2 ? (
          <Text style={styles.imogeStyle}>🟠</Text>
        ) : (
          <Text style={styles.imogeStyle}>🔴</Text>
        )}
        <Text style={styles.textContent}>{props.content}</Text>
      </View>
    </View>
  );
};

export default MyReviewContent;
