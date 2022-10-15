/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface ILocation {
  latitude: number;
  longitude: number;
}

const GeoLocationAPI = ({}) => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <View>
      {location ? (
        <>
          <Text>{location}</Text>
          <Text>Latitude: {location.latitude}</Text>
          <Text>longitude: {location.longitude}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default GeoLocationAPI;
