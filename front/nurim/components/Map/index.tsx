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
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar';
import FilterBar from '../FilterBar';
import MainWidget from '../MainWidget';
import Geolocation from '@react-native-community/geolocation';

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

// 카테고리 별 시설 목록 불러오기
fetch('https://j7e105.p.ssafy.io/api/location/02', {
  method: 'GET',
})
  .then(response => {
    console.log(response);
  })
  .catch(e => console.log('error:', e));

const Map = ({openDrawer}: MapProps) => {
  const P0: ILocation = {latitude: 35.0974162, longitude: 128.9224885};
  const P1 = {latitude: 35.099813701853336, longitude: 128.91850338616183};
  const P2 = {latitude: 35.09565291172822, longitude: 128.91850338616183};
  const P3 = {latitude: 35.099813701853336, longitude: 128.9219366138379};
  const P4 = {latitude: 35.09565291172822, longitude: 128.9219366138379};
  const P5 = {latitude: 35.09565291172822, longitude: 128.91850338616183};

  const [location, setLocation] = useState<ILocation>(P0);
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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 화면의 범위 측정
  const [range, setrange] = useState<IRange>({
    sw_latitude: 35.09565291172822,
    sw_longitude: 128.91850338616183,
    ne_latitude: 35.09565291172822,
    ne_longitude: 28.9219366138379,
  });
  console.log('하하하', range.sw_latitude);
  return (
    <View style={styles.container}>
      <Text>{range.sw_latitude}</Text>
      <View style={styles.relative_view}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={false}
          center={{...location, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={
            e => (range.sw_latitude = e.contentRegion[0].latitude)
            // useEffect(() => {
            //   const sw_latitude = e.contentRegion[0].latitude;
            //   const sw_longitude = e.contentRegion[0].longitude;
            //   const ne_latitude = e.contentRegion[2].latitude;
            //   const ne_longitude = e.contentRegion[2].longitude;

            //   const subRange: IRange = {
            //     sw_latitude,
            //     sw_longitude,
            //     ne_latitude,
            //     ne_longitude,
            //   };

            //   setrange(subRange);
          }
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        >
          <Marker
            coordinate={location}
            onClick={() => console.warn('onClick! p0')}
          />
          <Marker
            coordinate={P1}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          />
          <Marker
            coordinate={P3}
            pinColor="yellow"
            onClick={() => console.warn('onClick! p1')}
          />
          <Marker
            coordinate={P5}
            pinColor="red"
            onClick={() => console.warn('onClick! p1')}
          />
          {/* <Path
            coordinates={[P0, P1]}
            onClick={() => console.warn('onClick! path')}
            width={10}
          /> */}
          {/* <Marker
            coordinate={P2}
            pinColor="red"
            onClick={() => console.warn('onClick! p2')}
          /> */}
          {/* <Polyline
            coordinates={[P1, P2]}
            onClick={() => console.warn('onClick! polyline')}
          /> */}
          {/* <Circle
            coordinate={P0}
            color={'rgba(255,0,0,0.3)'}
            radius={200}
            onClick={() => console.warn('onClick! circle')}
          /> */}
          {/* <Polygon
            coordinates={[P0, P1, P2]}
            color={'rgba(0, 0, 0, 0.5)'}
            onClick={() => console.warn('onClick! polygon')}
          /> */}
        </NaverMapView>
      </View>
      <View style={styles.absolute_view}>
        <SearchBar openDrawer={openDrawer} />
        <FilterBar />
      </View>
      <MainWidget getCurrentLocation={getCurrentLocation} />
    </View>
  );
};

export default Map;
