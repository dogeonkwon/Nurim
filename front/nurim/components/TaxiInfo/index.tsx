import {Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Text, ListItem} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {useNavigation} from '@react-navigation/native';

const TaxiInfo = () => {
  return (
    <View>
      <ListItem bottomDivider>
        <Button
          //길어지므로 아래에 const로 정의
          title={<CustomTitle />}
          containerStyle={styles.containerSpec}
          icon={styles.iconSpec}
          iconContainerStyle={styles.iconMargin}
          //iconRight로 글자들 오른쪽에 배치
          iconRight
          //경계선이 없는 흰색 버튼
          type="clear"
          size="lg"
        />
      </ListItem>
    </View>
  );
};

const CustomTitle = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  return (
    <View style={{marginLeft:0, marginRight: 15}}>
      <TouchableOpacity onPress = {() => {navigation.navigate('TaxiDetail')}}>
      <Text style={{fontWeight: 'bold', fontSize: 17, marginLeft: 10}}>
        부산광역시 특별교통총괄본부(부산시설공단)
      </Text>
      <Text style={{fontStyle: 'italic', fontSize: 12, marginLeft: 10}}>
        상세보기
      </Text>
      </TouchableOpacity>
      {/* <Button
        title="상세보기"
        onPress={() => navigation.navigate('TaxiDetail')}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  iconSpec: {
    name: 'phone',
    type: 'font-awesome',
    size: 55,
    color: '#36BC9B',
    onPress: () => {
      Linking.openURL(`tel:01092403692`);
    }
  },
  containerSpec: {
    width: 300,
    marginHorizontal: 0,
    marginVertical: 0,
    marginLeft: -10,
    marginRight: 0
  },
  iconMargin: {
    marginLeft: 0,
    marginRight:0
  },
});

export default TaxiInfo;
