import {Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text, ListItem, Avatar} from '@rneui/themed';
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
  const [visible, setVisible] = useState<boolean>(true);

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
  // ${props.props.location.latitude}&${props.props.location.longitude}
  useEffect(() => {
    const fetchTaxiInfoData = async () => {
      try {
          const addressResponse = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${props.props.location.latitude}&longitude=${props.props.location.longitude}&localityLanguage=ko`);
          const { data } = addressResponse;
          if (data.principalSubdivision != data.city) {
            setAddressData(data.principalSubdivision+data.city)}
            else {
            setAddressData(data.principalSubdivision)
          };
          console.log(addressData)
          setTaxiInfoData([]);
          setLoading(true);
          const response = await axios.get(
          serverIP + apis.taxiInfo + '/' + addressData,
          );
          setTaxiInfoData(response.data);
      } catch (e) {
        console.log('error:', e);
      } 
      setLoading(false);
    };
    fetchTaxiInfoData();
  }, [addressData])
  if (!addressData) return null;
  return (
    <View>
      {visible && (
        <>
    {taxiInfoData.map((l, taxiIndex) => (
      
        <ListItem key={taxiIndex} bottomDivider>
          <ListItem.Content>
            <ListItem.Title onPress = {() => {{naviToTaxiDetail(l)} setVisible(false)}}>
              <Text style={{fontWeight: 'bold', fontSize: 17, marginLeft: 10}}>{l.taxiAddress}</Text>
            </ListItem.Title>
            <ListItem.Subtitle onPress = {() => {{naviToTaxiDetail(l)} setVisible(false)}}>
              <Text style={{fontStyle: 'italic', fontSize: 12, marginLeft: 10}}>상세보기</Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity onPress = {() => {{Linking.openURL(`tel:${l.taxiPhone}`)} setVisible(false)}}>
            <Avatar source={require('../../assets/images/PHONE_CALL.png')}/>
          </TouchableOpacity>

          
        </ListItem>
    ))}
    </>
    )}
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

