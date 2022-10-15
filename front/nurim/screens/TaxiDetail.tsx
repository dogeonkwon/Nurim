import React from 'react';
import {ListItem, Text, Avatar} from '@rneui/themed';
import {View, ScrollView, TouchableOpacity, Linking, Image} from 'react-native';
import {MainStackNavigationProp} from './RootStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ILocation} from '../components/Map/index'
import {MainParams} from './RootStack'
import PopTab from '../components/PopTab';
import { ScreenWidth } from '@rneui/base';
type TaxiDetailRouteProp = RouteProp<MainParams, 'TaxiDetail'>;
type TaxiDetailProps = {
  navigation: MainStackNavigationProp;
};

const TaxiDetail = (props : ILocation) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const {params} = useRoute<TaxiDetailRouteProp>();  
  console.log(params.taxiDetail.taxiAddress)

  const TaxiDetailList = [
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/SERVICE_TIME.png')}/> 운행 시간</Text>,
    subTitle : <Text style={{ color: 'black'}}>
      주중 {params.taxiDetail.taxiWeekdayServiceStart}~{params.taxiDetail.taxiWeekdayServiceEnd}{'\n'}
      주말 {params.taxiDetail.taxiWeekendServiceStart}~{params.taxiDetail.taxiWeekendServiceEnd}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/BOOK_TIME.png')}/> 사전 예약 신청 기간</Text>,
    subTitle : <Text style={{  color: 'black'}}>
      {params.taxiDetail.taxiBookPeriod}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/BOOK_TIME.png')}/> 사전 예약 가능 시간</Text>,
    subTitle : <Text style={{  color: 'black'}}>
      주중 {params.taxiDetail.taxiWeekdayBookStart}~{params.taxiDetail.taxiWeekdayBookEnd}{'\n'}
      주말 {params.taxiDetail.taxiWeekendBookStart}~{params.taxiDetail.taxiWeekendBookEnd}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/TAXI_FEE.png')}/> 차량 이용 요금</Text>,
    subTitle : <Text style={{ color: 'black'}}>
      {params.taxiDetail.taxiFee}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/TAXI_INSIDE.png')}/> 차량관내운행지역</Text>,
    subTitle : <Text style={{color: 'black'}}>
      {params.taxiDetail.taxiInArea}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/TAXI_OUTSIDE.png')}/> 차량관외운행지역</Text>,
    subTitle : <Text style={{  color: 'black'}}>
      {params.taxiDetail.taxiOutArea}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}><Image source = {require('../assets/images/DISABLED_CENTER.png')}/> 지역교통약자센터 전화번호</Text>,
    subTitle : 
      <TouchableOpacity onPress = {() => {Linking.openURL(`tel:${params.taxiDetail.taxiAgencyPhone}`)}}><Text style={{  color: 'black'}}>{params.taxiDetail.taxiAgencyPhone}
      </Text></TouchableOpacity>,
    },

  ]
  return (
      <ScrollView>
        <PopTab title="" titleColor= "" navigation={navigation} color="white" />
        <ListItem bottomDivider>
          <ListItem.Content>
              <ListItem.Title>
                <Text style={{fontWeight: 'bold', fontSize: 17, marginLeft: 10}}>{params.taxiDetail.taxiAddress}</Text>
              </ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity onPress = {() => {Linking.openURL(`tel:${params.taxiDetail.taxiPhone}`)}}>
          <Avatar source={require('../assets/images/PHONE_CALL.png')}/></TouchableOpacity>

        </ListItem>
    {TaxiDetailList.map((l, i) => (
        <ListItem
        key={i}
        //리스트아이템 사이에 줄 추가
        bottomDivider
        >
        <ListItem.Content>
            <View style={{backgroundColor: '#36BC9B', borderRadius: 5, padding: 3}}>
            <ListItem.Title>{l.title}</ListItem.Title>
            </View>
            <Text style = {{height : 5}}></Text>
            <View style={{backgroundColor: '#F0F0F0', borderRadius: 7, padding: 7}}>
            <ListItem.Subtitle>{l.subTitle}</ListItem.Subtitle>
            </View>
        </ListItem.Content>
        </ListItem>
    ))}
    </ScrollView>
);
};
export default TaxiDetail;
