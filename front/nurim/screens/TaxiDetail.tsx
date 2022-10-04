import React from 'react';
import {ListItem, Text, Avatar} from '@rneui/themed';
import {View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {MainStackNavigationProp} from './RootStack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ILocation} from '../components/Map/index'
import {MainParams} from './RootStack'
import PopTab from '../components/PopTab';
type TaxiDetailRouteProp = RouteProp<MainParams, 'TaxiDetail'>;
type TaxiDetailProps = {
  navigation: MainStackNavigationProp;
};

const TaxiDetail = (props : ILocation) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const {params} = useRoute<TaxiDetailRouteProp>();  
  console.log(params.taxiDetail.taxiAddress)

  const TaxiDetailList = [
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>운행 시간</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      주중 {params.taxiDetail.taxiWeekdayServiceStart}~{params.taxiDetail.taxiWeekdayServiceEnd}{'\n'}
      주말 {params.taxiDetail.taxiWeekendServiceStart}~{params.taxiDetail.taxiWeekendServiceEnd}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>사전 예약 신청 기간</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      {params.taxiDetail.taxiBookPeriod}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>사전 예약 가능 시간</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      주중 {params.taxiDetail.taxiWeekdayBookStart}~{params.taxiDetail.taxiWeekdayBookEnd}{'\n'}
      주말 {params.taxiDetail.taxiWeekendBookStart}~{params.taxiDetail.taxiWeekendBookEnd}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>차량 이용 요금</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      {params.taxiDetail.taxiFee}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>차량관내운행지역</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      {params.taxiDetail.taxiInArea}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>차량관외운행지역</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      {params.taxiDetail.taxiOutArea}
    </Text>,
    },
    { title: <Text style={{ backgroundColor: '#36BC9B', color: 'white'}}>지역교통약자센터전화번호</Text>,
    subTitle : <Text style={{ backgroundColor: '#c8c8c8', color: 'black'}}>
      {params.taxiDetail.taxiAgencyPhone}
    </Text>,
    },

  ]
  return (
      <ScrollView>
        <PopTab title="" navigation={navigation} color="" />
        <ListItem bottomDivider>
        <TouchableOpacity onPress = {() => {Linking.openURL(`tel:${params.taxiDetail.taxiPhone}`)}}>
          <Avatar source={require('../assets/images/PHONE_CALL.png')}/></TouchableOpacity>
          <ListItem.Content>
              <ListItem.Title>
                <Text style={{fontWeight: 'bold', fontSize: 17, marginLeft: 10}}>{params.taxiDetail.taxiAddress}</Text>
              </ListItem.Title>
          </ListItem.Content>
        </ListItem>
    {TaxiDetailList.map((l, i) => (
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
