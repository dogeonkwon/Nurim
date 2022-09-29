import React, {useState} from 'react';
import {BottomSheet, Button, ListItem, Image, Text} from '@rneui/themed';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TaxiInfo from '../components/TaxiInfo';
import TaxiInfoContent from '../components/TaxiInfoContent';
import PopTab from '../components/PopTab';
import {MainStackNavigationProp} from './RootStack';
import {useNavigation} from '@react-navigation/native';

const TaxiDetail = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const AdditionalTaxiInfoContentList = [
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>하드코딩사항4</Text>,
    subTitle : <Text>
    하드코딩사항 {'\n'}
    하드코딩사항
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>하드코딩사항5</Text>,
    subTitle : <Text>
    하드코딩사항
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>하드코딩사항6</Text>,
    subTitle : <Text>
    하드코딩사항
    </Text>,
    },
];

  return (
    <ScrollView>
      <PopTab title="" navigation={navigation} color="" />
      <TaxiInfo></TaxiInfo>
      <TaxiInfoContent></TaxiInfoContent>
      {AdditionalTaxiInfoContentList.map((l, i) => (
            <ListItem
            key={i}
            //리스트아이템 사이에 줄 추가
            bottomDivider
            >
            <ListItem.Content>
                <ListItem.Title>{l.title}</ListItem.Title>
                <ListItem.Subtitle>{l.subTitle}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>
        ))}
    </ScrollView>
  );
};


export default TaxiDetail;
