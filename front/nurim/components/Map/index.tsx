/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar';
import FilterBar from '../FilterBar';
import MainWidget from '../MainWidget';
import Geolocation from '@react-native-community/geolocation';

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

type MapProps = {
  openDrawer: void;
};

// interface usee {
//   si: string;
//   gu: string;
//   dong: string;
// }

// const initialLocation: usee = {
//   si: '',
//   gu: '',
//   dong: '',
// };

interface ILocation {
  latitude: number;
  longitude: number;
}

const Map = ({openDrawer}: MapProps, {}) => {
  const P0: ILocation = {latitude: 35.0974162, longitude: 128.9224885};
  const P1 = {latitude: 35.0980062, longitude: 128.9244885};

  const [location, setLocation] = useState<ILocation>(P0);
  // 밖으로 빼서 함수 만들기
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const loca: ILocation = {
          latitude,
          longitude,
        };
        setLocation(loca);
        // setLocation({
        //   latitude,
        //   longitude,
        // });
        // if (location) {
        //   console.log(location);
        //   console.log(location.latitude, location.longitude);
        // }
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    console.log(
      '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* <GeoLocationAPI /> */}
      {/* <MainWidget /> */}
      <View style={styles.relative_view}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={false}
          center={{...location, zoom: 16}}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          // onCameraChange={e =>
          //   console.warn('onCameraChange', JSON.stringify(e))
          // }
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
      <MainWidget />
    </View>
  );
};

export default Map;
