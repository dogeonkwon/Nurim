import {Linking, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Text, ListItem} from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type ButtonsComponentProps = {};

const TaxiInfo: React.FunctionComponent<ButtonsComponentProps> = () =>  {
  return (
    <View>
      <ListItem>
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
            onPress={()=>{Linking.openURL(`tel:01092403692`)}}
            size="lg"
        />
            </ListItem>

    </View>
  );
};

const CustomTitle = () => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 10 }}>부산광역시 특별교통총괄본부(부산시설공단)</Text>
      <Text style={{ fontStyle: 'italic', fontSize: 12, marginLeft: 10 }}>전화걸기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    iconSpec: {
        name: 'phone',
        type: 'font-awesome',
        size: 40,
        color: '#36BC9B',
    },
    containerSpec: {
        width: 300,
        marginHorizontal: -5,
        marginVertical: 0,
    },
    iconMargin: {
        marginLeft: 15
    }
});

export default TaxiInfo;


