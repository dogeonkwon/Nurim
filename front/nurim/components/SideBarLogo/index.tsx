import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Avatar} from '@rneui/themed';

const SideBarLogo = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        style={{
          resizeMode: 'contain',
          width: 100,
          height: 40,
          marginLeft: 10,
          marginTop: 10,
        }}
        source={require('../../assets/images/logo.png')}
      />
    </View>
  );
};

export default SideBarLogo;
