import {Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Text, ListItem, Avatar} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {serverIP, apis} from '../../common/urls';
import {ILocation} from '../Map/index'

export type TaxiDetailType = {
  taxiAddress: string;
  taxiPhone: string;
  taxiWeekdayBookStart: string;
  taxiWeekdayBookEnd: string;
  taxiWeekendBookStart: string;
  taxiWeekendBookEnd: string;
  taxiWeekdayServiceStart: string;
  taxiWeekdayServiceEnd: string;
  taxiWeekendServiceStart: string;
  taxiWeekendServiceEnd: string;
  taxiBookPeriod: string;
  taxiInArea: string;
  taxiOutArea: string;
  taxiFee: string;
  taxiAgencyPhone: string;
};

const TaxiInfo = (props : ILocation) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const naviToTaxiDetail = (l:any) => {
    navigation.navigate('TaxiDetail', {taxiDetail : {taxiAddress : l.taxiAddress, taxiPhone : l.taxiPhone, taxiWeekdayBookStart : l.taxiWeekdayBookStart, 
      taxiWeekdayBookEnd : l.taxiWeekdayBookEnd, taxiWeekendBookStart : l.taxiWeekendBookStart, taxiWeekendBookEnd : l.taxiWeekendBookEnd,
      taxiWeekdayServiceStart : l.taxiWeekdayServiceStart, taxiWeekdayServiceEnd : l.taxiWeekdayServiceEnd, taxiWeekendServiceStart : l.taxiWeekendServiceStart,
      taxiWeekendServiceEnd : l.taxiWeekendServiceEnd, taxiBookPeriod : l.taxiBookPeriod, taxiInArea : l.taxiInArea, taxiOutArea : l.taxiOutArea,
      taxiFee : l.taxiFee, taxiAgencyPhone : l.taxiAgencyPhone, }});  
    }

  const [taxiInfoData, setTaxiInfoData] = useState<any[]>([]);
  const [addressData, setAddressData] = useState<string>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTaxiInfoData = async () => {
      try {
          // 좌표를 입력하여 주소데이터 받아오기
          const addressResponse = await axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng='+props["props"]["location"]["latitude"]+','+props["props"]["location"]["longitude"]+'&key=AIzaSyBdf3QkB2KbMDzdfPXYxoBBfyFSk_fxBqk&language=ko',
          );
          // 도시 단위로 addressData에 set
          setAddressData(addressResponse.data.results[0].address_components[3].long_name)
          // 요청이 시작 할 때에는 error 와 taxiInfoData 를 초기화하고
          setTaxiInfoData([]);
          // loading 상태를 true 로 바꾸자
          setLoading(true);
          // 받아온 addressData를 기반으로 택시회사 정보 받아오기
          const response = await axios.get(
          serverIP + apis.taxiInfo + '/' + addressData,
          // {addressData['results'][0]['address_components'][3]['long_name']}
          );
          //taxiInfoData에 데이터를 장착
          setTaxiInfoData(response.data);
      } catch (e) {
        console.log('error:', e);
      } 
      setLoading(false);
    };
    fetchTaxiInfoData();
  }, [addressData]);
  if (loading) return <Text>로딩중..</Text>;
  if (!taxiInfoData) return null;
  if (!addressData) return null;
  return (
    <View>
    {taxiInfoData.map((l, taxiIndex) => (
      
        <ListItem key={taxiIndex} bottomDivider>
        <TouchableOpacity onPress = {() => {Linking.openURL(`tel:${l.taxiPhone}`)}}>
          <Avatar source={require('../../assets/images/PHONE_CALL.png')}/></TouchableOpacity>
          <ListItem.Content>
              <ListItem.Title onPress = {() => {naviToTaxiDetail(l)}}>
                <Text style={{fontWeight: 'bold', fontSize: 17, marginLeft: 10}}>{l.taxiAddress}</Text>
              </ListItem.Title>
              <ListItem.Subtitle onPress = {() => {naviToTaxiDetail(l)}}>
                <Text style={{fontStyle: 'italic', fontSize: 12, marginLeft: 10}}>상세보기</Text>
              </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
    ))}
</View>
);
};

const styles = StyleSheet.create({
  containerSpec: {
    width: 300,
    marginHorizontal: 0,
    marginVertical: 0,
    marginLeft: -10,
    marginRight: 0
  },
  iconMargin: {
    marginLeft: 0,
    marginRight: 5
  },
});


export default TaxiInfo;

