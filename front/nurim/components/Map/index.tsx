import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import SearchBar from '../SearchBar';
import FilterBar from '../FilterBar';

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

const Map = ({openDrawer}: MapProps) => {
  const P0 = {latitude: 35.0974162, longitude: 128.9224885};
  const P1 = {latitude: 35.0980062, longitude: 128.9244885};
  const P2 = {latitude: 35.0959062, longitude: 128.9234885};

  return (
    <View style={styles.container}>
      <View style={styles.relative_view}>
        <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={true}
          center={{...P0, zoom: 16}}
          onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={e =>
            console.warn('onCameraChange', JSON.stringify(e))
          }
          onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
          <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
          <Marker
            coordinate={P1}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          />
          <Path
            coordinates={[P0, P1]}
            onClick={() => console.warn('onClick! path')}
            width={10}
          />
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
    </View>
  );
};

export default Map;
