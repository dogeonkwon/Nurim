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

// 햄버거 -> 사이드바 네이게이션 실행 하는 함수 타입 지정
type MapProps = {
  openDrawer: void;
};

// 내 위치, 마커 등에 사용하는 위도와 경도 타입 지정
interface ILocation {
  latitude: number;
  longitude: number;
}

interface IRange {
  sw_latitude: number;
  sw_longitude: number;
  ne_latitude: number;
  ne_longitude: number;
}

type ICategory = {
  id: number;
  lat: number;
  lng: number;
};

const P0: ILocation = {latitude: 35.0974162, longitude: 128.9224885};
const P1 = {latitude: 35.099813701853336, longitude: 128.91850338616183};
const P2 = {latitude: 35.09565291172822, longitude: 128.91850338616183};
const P3 = {latitude: 35.099813701853336, longitude: 128.9219366138379};
const P4 = {latitude: 35.09565291172822, longitude: 128.9219366138379};
const P5 = {latitude: 35.09565291172822, longitude: 128.91850338616183};

const Map = ({openDrawer}: MapProps) => {
  // 현재 내 위치 구하는 함수
  const [location, setLocation] = useState<ILocation>(P0);
  // 대분류에 맞는 시설 가져오기
  const [category, setCategory] = useState<ICategory[]>();
  // 화면의 범위 측정
  const [range, setrange] = useState<IRange>({
    sw_latitude: 35.09565291172822,
    sw_longitude: 128.91850338616183,
    ne_latitude: 35.09565291172822,
    ne_longitude: 28.9219366138379,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // useEffect(() => {
  //   console.log(catenum);
  // }, [catenum, category]);

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
  const getCategory = (catenum: string): void => {
    fetch(serverIP + apis.placeAllInfo + '/' + catenum, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        const datas = [...response];
        let newDatas: ICategory[] = [];
        datas.map((data, id) => {
          const newData: ICategory = {
            id: id,
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
          onCameraChange={e =>
            setrange({
              sw_latitude: e.contentRegion[0].latitude,
              sw_longitude: e.contentRegion[0].longitude,
              ne_latitude: e.contentRegion[2].latitude,
              ne_longitude: e.contentRegion[2].longitude,
            })
          }
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        >
          {category?.map((e, idx) => {
            if (range.sw_latitude < e.lat && e.lat < range.ne_latitude) {
              if (range.sw_longitude < e.lng && e.lng < range.ne_longitude) {
                return (
                  <Marker
                    key={idx}
                    pinColor="blue"
                    coordinate={{
                      latitude: Number(e.lat),
                      longitude: Number(e.lng),
                    }}
                  />
                );
              }
            }
          })}
          {/* <Marker
            coordinate={P1}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          /> */}
        </NaverMapView>
      </View>
      <View style={styles.absolute_view}>
        <SearchBar openDrawer={openDrawer} />
        <FilterBar getCategory={getCategory} />
        {/* <FilterBar getCategory={getCategory} setCatenum={setCatenum} /> */}
      </View>
      <MainWidget getCurrentLocation={getCurrentLocation} />
    </View>
  );
};

export default Map;
