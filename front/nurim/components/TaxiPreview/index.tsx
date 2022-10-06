import React, {useState} from 'react';
import {BottomSheet, Icon} from '@rneui/themed';
import {StyleSheet, ScrollView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TaxiInfo from '../TaxiInfo';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {ILocation} from '../Map/index';
import Toast from 'react-native-simple-toast';
import { ScreenHeight } from '@rneui/base';

const TaxiPreview = (props: ILocation) => {
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
        // onPress={() => Toast.show('미지원 기능입니다.')}
      />
      {/* onBackdropPress = {setVisible}, bottomsheet 이외의 화면을 누르면 다시 보이지 않도록(setVisible의 기본값인 false로) */}
      <BottomSheet
        modalProps={{}}
        scrollViewProps={{}}
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        containerStyle={styles.bottomSheetStyle}
        backdropStyle ={{  }}>
        <ScrollView style ={{maxHeight:250}}>  
        <TaxiInfo props={props}></TaxiInfo>
        </ScrollView> 
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
  bottomSheetStyle: {
    // marginTop: 250, backgroundColor: 'transparent'
  }
});

export default TaxiPreview;
