/* eslint-disable no-lone-blocks */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {View, StyleSheet, Dimensions, Text, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar';
import FilterBar from '../FilterBar';
import MainWidget from '../MainWidget';
import Geolocation from '@react-native-community/geolocation';
import {serverIP, apis} from '../../common/urls';
import {List} from 'reselect/es/types';
import {
  RootStackParams,
  MainStackNavigationProp,
} from '../../screens/RootStack';
import PlacePreview from '../PlacePreview';
import {BottomSheet} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

// 햄버거 -> 사이드바 네이게이션 실행 하는 함수 타입 지정
type MapProps = {
  openDrawer: void;
};

// 내 위치, 마커 등에 사용하는 위도와 경도 타입 지정
export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IRange {
  sw_latitude: string;
  sw_longitude: string;
  ne_latitude: string;
  ne_longitude: string;
}

type ICategory = {
  id: number;
  locationId: number;
  lat: string;
  lng: string;
};

const P0: ILocation = {latitude: 35.0974162, longitude: 128.9224885};

const Map = ({openDrawer}: MapProps) => {
  // 현재 내 위치 구하는 함수
  const [location, setLocation] = useState<ILocation>(P0);
  // 대분류에 맞는 시설 가져오기
  const [category, setCategory] = useState<ICategory[]>();
  // 화면의 범위 측정
  const [range, setrange] = useState<IRange>({
    sw_latitude: '35.09565291172822',
    sw_longitude: '128.91850338616183',
    ne_latitude: '35.09565291172822',
    ne_longitude: '28.9219366138379',
  });
  const [catenum, setCatenum] = useState<string>('0');

  // 시설 미리보기 컴포넌트 띄우기
  const [preview, setPreview] = useState<boolean>(false);

  // 시설 아이디
  const [locatID, setlocatID] = useState<number>(0);

  // 내 위치 구하기
  useEffect(() => {
    getCurrentLocation();
    
  }, []);

  // useEffect(() => {
  //   getCategory();
  // }, [range]);

  // 현재 내 위치 구하기
  const getCurrentLocation = (): void => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const loca: ILocation = {
          latitude,
          longitude,
        };
        setLocation(loca);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // 카테고리 번호에 맞는 카테고리 좌표들 구하기
  const getCategory = (cateId: string): void => {
    fetch(serverIP + apis.placeAllInfo + '/' + cateId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(range),
    })
      .then(response => response.json())
      .then(response => {
        const datas = [...response];
        let newDatas: ICategory[] = [];
        datas.map((data, id) => {
          const newData: ICategory = {
            id: id,
            locationId: data.locationId,
            lat: data.lat,
            lng: data.lng,
          };
          newDatas.push(newData);
        });
        setCategory(newDatas);
      })
      .catch(e => console.log('error:', e));
  };

  return (
    <View style={styles.container}>
      <View style={styles.relative_view}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={false}
          center={{...location, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={e => {
            setrange({
              sw_latitude: e.contentRegion[0].latitude,
              sw_longitude: e.contentRegion[0].longitude,
              ne_latitude: e.contentRegion[2].latitude,
              ne_longitude: e.contentRegion[2].longitude,
            });
          }}>
          {category?.map((e, idx) => {
            return (
              <Marker
                key={idx}
                pinColor="blue"
                coordinate={{
                  latitude: Number(e.lat),
                  longitude: Number(e.lng),
                }}
                onClick={() => {
                  setPreview(true);
                  setlocatID(e.locationId);
                }}
              />
            );
          })}
        </NaverMapView>
      </View>
      <BottomSheet
        modalProps={{}}
        isVisible={preview}
        onBackdropPress={() => setPreview(false)}>
        <View>
          <PlacePreview locatID={locatID} location={location} />
        </View>
      </BottomSheet>
      <View style={styles.absolute_view}>
        <SearchBar openDrawer={openDrawer} />
        <FilterBar getCategory={getCategory} setCatenum={setCatenum} />
        {/* {preview ? <PlacePreview /> : null} */}
        {/* <PlacePreview /> */}
      </View>
      <MainWidget getCurrentLocation={getCurrentLocation} location={location} />
    </View>
  );
};

// 검색창 및 위젯을 지도 위로 띄우기 위한 스탕일시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute_view: {
    position: 'absolute',
    top: '3%',
    left: '5%',
  },
  relative_view: {
    position: 'relative',
  },
});

export default Map;
