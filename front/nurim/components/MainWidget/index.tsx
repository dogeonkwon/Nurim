/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  // 비상호출, 내위치 버튼 컴포넌트 위치
  wrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // margin: 10,
  },
  // 버튼의 스타일
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginBottom: 20,
    marginRight: 15,
  },
});

interface ILocation {
  latitude: number;
  longitude: number;
}

const MainWidget = ({}) => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        console.log(location);
        console.log(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <SafeAreaView style={styles.wrap}>
      {/* {location ? (
        <>
          <Text>{location}</Text>
          <Text>Latitude: {location.latitude}</Text>
          <Text>longitude: {location.longitude}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )} */}
      <TouchableOpacity style={styles.button}>
        <Icon name={'car-emergency'} size={30} color="#01a699" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon2 name={'my-location'} size={30} color="#01a699" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainWidget;
