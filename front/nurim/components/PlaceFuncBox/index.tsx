/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Linking, Text, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IPlace} from '../PlacePreview';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import {IDetailType} from '../PlaceInfo';
import Toast from 'react-native-simple-toast';

interface IFuncType {
  preview: IPlace | null;
}

export type MyFavorType = {
  id: number; // 식별자
  locationName: string; // 업체명
  locationAddress: string; // 주소
  locationId: number;
};

const PlaceFuncBox = (placeInfo: IFuncType) => {
  // 유저 정보 불러오기
  const user = useSelector((state: RootState) => state.auth.user);

  // 즐겨찾기가 된 시설인지 확인
  const [placeFavor, setPlaceFavor] = useState<number>(0);

  // 즐겨찾기가 된 시설인지 확인
  const [favoriteId, setFavoriteId] = useState<number>(0);

  // 나의 즐겨찾기와 시설 ID 비교
  useEffect(() => {
    getMyFavor();
  }, [placeInfo]);

  // 서버에서 나의 즐겨찾기 가져와서 시설 ID와 비교하기
  const getMyFavor = (): void => {
    if (user) {
      // 통신 헤더 정의
      const requestHeaders = new Headers();
      requestHeaders.set('jwt-token', user?.token ? user.token : '');
      requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
      fetch(serverIP + apis.favorInfo, {
        method: 'GET',
        headers: requestHeaders,
      })
        .then(response => response.json())
        .then(response => {
          const datas = [...response];
          console.log(datas);
          datas.map(data => {
            if (data.locationId === placeInfo.preview?.locationId) {
              setPlaceFavor(1);
              setFavoriteId(data.favoriteId);
            }
          });
        })
        .catch(error => console.log('PlaceFuncBox 에러 임당', error));
    }
  };

  // 서버로 즐겨찾기 등록하기
  const pushMyFavor = (placeId: number | undefined): void => {
    if (user) {
      // 통신 헤더 정의
      const requestHeaders = new Headers();
      requestHeaders.set('jwt-token', user?.token ? user.token : '');
      requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
      fetch(serverIP + apis.favorInfo + '/' + placeId, {
        method: 'POST',
        headers: requestHeaders,
      }).catch(error => console.log('pushMyFavor 에러 임당', error));
    }
  };

  const deleteFavor = (favorId: number | undefined): void => {
    if (user) {
      // 통신 헤더 정의
      const requestHeaders = new Headers();
      requestHeaders.set('jwt-token', user?.token ? user.token : '');
      requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
      fetch(serverIP + apis.favorInfo + '/' + favorId, {
        method: 'DELETE',
        headers: requestHeaders,
      }).catch(error => console.log('pushMyFavor 에러 임당', error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          if (placeInfo.preview?.phone) {
            Linking.openURL(`tel: ${placeInfo.preview?.phone}`);
          } else {
            Alert.alert('등록된 번호가 없습니다.');
          }
        }}>
        <Icon name={'call'} size={25} color="black" />
        <Text style={{color: 'black'}}>전화 걸기</Text>
      </Pressable>
      <Pressable style={styles.button}>
        {user ? (
          placeFavor ? (
            <Icon
              name={'heart'}
              size={25}
              color="black"
              onPress={() => {
                deleteFavor(favoriteId);
                setPlaceFavor(0);
                Toast.show('즐겨찾기에서 삭제되었습니다.');
              }}
            />
          ) : (
            <Icon
              name={'heart-outline'}
              size={25}
              color="black"
              onPress={() => {
                pushMyFavor(placeInfo.preview?.locationId);
                setPlaceFavor(1);
                Toast.show('즐겨찾기에 추가되었습니다.');
              }}
            />
          )
        ) : (
          <Icon
            name={'heart-outline'}
            size={25}
            color="black"
            onPress={() => {
              return Alert.alert('로그인 후 이용가능합니다.');
            }}
          />
        )}
        <Text style={{color: 'black'}}>즐겨 찾기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  // 버튼의 스타일
  button: {
    padding: 5,
    alignItems: 'center',
  },
});

export default PlaceFuncBox;
