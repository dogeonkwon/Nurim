/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Linking, Text, Pressable, Alert} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IPlace} from '../PlacePreview';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

interface IPreview {
  preview: IPlace | null;
}

export type MyFavorType = {
  id: number; // 식별자
  locationName: string; // 업체명
  locationAddress: string; // 주소
  locationId: number;
};

const PlaceFuncBox = (placeInfo: IPreview) => {
  // 유저 정보 불러오기
  const user = useSelector((state: RootState) => state.auth.user);

  // 나의 즐겨찾기 Data
  const [myFavor, setMyFavor] = useState<MyFavorType[] | undefined>();

  // 나의 즐겨찾기 Data(myFavor)와 시설 ID(placeInfo.preview.locationId)를 비교하여 즐겨찾기가 되어 있는지 비교
  const [placeFavor, setPlaceFavor] = useState<number>(0);

  // 나의 즐겨찾기와 시설 ID 비교
  useEffect(() => {
    getMyFavor();
  }, [placeInfo]);

  // 서버에서 나의 즐겨찾기 가져오기
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
          let newDatas: MyFavorType[] = [];
          datas.map((data, index) => {
            const newData: MyFavorType = {
              id: index,
              locationName: data.locationName,
              locationAddress: data.locationAddress,
              locationId: data.locationId,
            };
            if (data.locationId === placeInfo.preview?.locationId) {
              setPlaceFavor(1);
            }
            newDatas.push(newData);
          });
          setMyFavor(newDatas);
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
        <Icon name={'call'} size={30} />
        <Text>전화 걸기</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Icon name={'cellular'} size={30} />
        <Text>통계 보기</Text>
      </Pressable>
      <Pressable style={styles.button}>
        {user ? (
          placeFavor ? (
            <Icon name={'heart'} size={30} />
          ) : (
            <Icon name={'heart-outline'} size={30} />
          )
        ) : (
          <Icon name={'heart-outline'} size={50} />
        )}
        <Text>즐겨 찾기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'gray',
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
