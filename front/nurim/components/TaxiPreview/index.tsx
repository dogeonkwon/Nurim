import React, { useState } from 'react';
import { BottomSheet, Button, ListItem, Image, Text } from '@rneui/themed';
import { StyleSheet, SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TaxiInfo from '../TaxiInfo/index'

type BottomSheetComponentProps = {};

const TaxiPreview: React.FunctionComponent<BottomSheetComponentProps> = () => {
    //버튼을 눌러야만 보이도록 false, 타입스크립트 문법에 따라 useState와 기본값 사이에 boolean이라고 표기
  const [visible, setVisible] = useState<boolean>(false);
  const taxiInfoList = [
    { title : <SafeAreaView>
            <TaxiInfo></TaxiInfo>
        </SafeAreaView>,
        subTitle : <Text style={styles.textSize}>
            아래를 클릭하시면 택시의 상세정보를 확인할 수 있습니다.
        </Text>,
    },
    { title: <Text>운행 시간</Text>,
      subTitle : <Text>
      TaxiInfoContent 컴포넌트 {'\n'}
      완성하여 import
      </Text>,
      onPress: () => (false)
    },
    { title: <Text>사전 예약 신청 기간</Text>,
    subTitle : <Text>
    TaxiInfoContent 컴포넌트 완성하여 import
    </Text>,
    onPress: () => (false)
    },
    { title: <Text>차량 이용 요금</Text>,
    subTitle : <Text>
    TaxiInfoContent 컴포넌트 완성하여 import
    </Text>,
    onPress: () => (false)
    },
];

return (
    <SafeAreaProvider>
    {/* 버튼 클릭시 bottomsheet가 보이도록 */}
    <Button onPress={() => setVisible(true)} type="clear">
    <Image
          style={[styles.imageSize, styles.imageMargin]}
          source={require('../../assets/images/CALL_TAXI.png')}
        />
    <Text>콜택시</Text>
    </Button>
    {/* onBackdropPress = {setVisible}, bottomsheet 이외의 화면을 누르면 다시 보이지 않도록(setVisible의 기본값인 false로) */}
    <BottomSheet modalProps={{}} isVisible={visible} onBackdropPress = {setVisible}>
      {taxiInfoList.map((l, i) => (
        <ListItem
          key={i}
          onPress={l.onPress}
          //리스트아이템 사이에 줄 추가
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title>{l.title}</ListItem.Title>
            <ListItem.Subtitle>{l.subTitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
    textSize: {
        fontSize : 11
    },
    imageSize: {
      width: 25,
      height: 25,
    },
    imageMargin: {
      marginRight: 20,
    }
    });

export default TaxiPreview;