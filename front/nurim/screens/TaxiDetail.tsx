import React, { useState } from 'react';
import { BottomSheet, Button, ListItem, Image, Text } from '@rneui/themed';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TaxiInfo from '../components/TaxiInfo'
import TaxiInfoContent from '../components/TaxiInfoContent'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const TaxiDetail = () => {
    return (
        <SafeAreaProvider>
            <ListItem>
            <ListItem.Content>
            <TaxiInfo></TaxiInfo>
          <TaxiInfoContent></TaxiInfoContent>

            </ListItem.Content>
            </ListItem>
    </SafeAreaProvider>
    );
};


export default TaxiDetail;
