import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  viewContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderStyle: 'solid',
    marginTop: '1%',
  },
  viewDivider: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  viewContent: {
    width: '85%',
    flexDirection: 'column',
  },
  viewPicture: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 18,
    color: 'black',
    marginTop: 3,
    marginBottom: 3,
  },
  textContent: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 4,
  },
});

type MyFavorProps = {
  favoriteId: number;
  locationName: string; // 업체명
  locationAddress: string; // 주소
  refreshFavor: boolean;
  setRefreshFavor: (refreshFavor: boolean) => void;
};

const MyFavorContent = ({
  favoriteId,
  locationName,
  locationAddress,
  refreshFavor,
  setRefreshFavor,
}: MyFavorProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  // 즐겨찾기 해제
  const favorButtonClicked = () => {
    Alert.alert('즐겨찾기를 해제하시겠습니까?', '', [
      {
        text: '확인',
        onPress: () => deleteFavor(),
        style: 'cancel',
      },
      {text: '취소'},
    ]);
  };
  const deleteFavor = () => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    fetch(serverIP + apis.favorDelete + favoriteId, {
      method: 'DELETE',
      headers: requestHeaders,
    })
      //.then(response => response.json())
      .then(response => {
        Toast.show('즐겨찾기가 삭제되었습니다.');
        setRefreshFavor(!refreshFavor);
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewDivider}>
        <View style={styles.viewContent}>
          <Text style={styles.textTitle}>{locationName}</Text>
          <Text style={styles.textContent}>{locationAddress}</Text>
        </View>
        <View style={styles.viewPicture}>
          <Icon
            name="favorite"
            size={30}
            onPress={() => favorButtonClicked()}
          />
        </View>
      </View>
    </View>
  );
};

export default MyFavorContent;
