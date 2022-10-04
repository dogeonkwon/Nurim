import React, {useState} from 'react';
import {BottomSheet, Icon} from '@rneui/themed';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TaxiInfo from '../TaxiInfo';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {ILocation} from '../Map/index';

const TaxiPreview = (props : ILocation) => {
  //버튼을 눌러야만 보이도록 false, 타입스크립트 문법에 따라 useState와 기본값 사이에 boolean이라고 표기
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View style={styles.iconContainer}>
      {/* 아이콘 클릭시 bottomsheet가 보이도록 */}
      <Icon
        raised
        name="taxi"
        type="font-awesome"
        color="#36BC9B"
        onPress={() => setVisible(true)}
      />
      {/* onBackdropPress = {setVisible}, bottomsheet 이외의 화면을 누르면 다시 보이지 않도록(setVisible의 기본값인 false로) */}
      <BottomSheet
        modalProps={{}}
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <View>
          <TaxiInfo props={props}></TaxiInfo>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  textSize: {
    fontSize: 11,
  },
  imageSize: {
    width: 25,
    height: 25,
  },
  imageMargin: {
    marginRight: 20,
  },
  iconContainer: {
    marginRight: 70,
    marginTop: -10,
  },
});

export default TaxiPreview;
