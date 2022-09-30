/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Linking, Button, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState, useEffect} from 'react';
import {serverIP, apis} from '../../common/urls';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {useNavigation} from '@react-navigation/native';
import PlaceFuncBox from '../PlaceFuncBox';

interface IReviews {
  additionalProp1: object[];
  additionalProp3: object[];
  additionalProp2: object[];
}

interface IAddition {
  reviewId: number;
  content: string;
  createdDate: string;
  nickname: string;
}

interface IReviewCount {
  green: number;
  yellow: number;
  red: number;
  total: number;
}

interface IPlace {
  id: number;
  locationId: number;
  locationName: string;
  address: string;
  phone: string;
  lat: string;
  lng: string;
  openingHours: string;
  subCategoryName: string;
  mainCategoryName: string;
  mainCategoryId: string;
  sido: string;
  gu: string;
  dong: string;
  facilities: string[];
  reviews: IReviews;
  reviewCount: IReviewCount;
}

interface PlacePreviewProps {
  locatID: number;
}

const PlacePreview = (locatID: PlacePreviewProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  // 시설 데이터
  const [placeInfo, setPlaceInfo] = useState<IPlace>();

  useEffect(() => {
    getPlaceInfo();
  }, []);

  // 시설 ID에 맞는 데이터 구하기
  const getPlaceInfo = (): void => {
    fetch(serverIP + apis.placeAllInfo + '/' + locatID.locatID, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        setPlaceInfo(response);
      })
      .catch(e => console.log('error:', e));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 제목, 상세보기 */}
      <View style={styles.header}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {placeInfo?.locationName}
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('PlaceDetail');
          }}>
          <Text>상세보기</Text>
        </Pressable>
      </View>
      {/* 서브카테고리 */}
      <Text style={{paddingLeft: 5, color: 'gray'}}>
        {placeInfo?.subCategoryName}
      </Text>
      {/* 주소, 영업시간(있으면) */}
      <View style={styles.info}>
        <Text>{placeInfo?.address}</Text>
        {placeInfo?.openingHours ? <Text>{placeInfo.openingHours}</Text> : null}
      </View>
      {/* 리뷰 */}
      <View style={styles.review}>
        {/* <Icon name={'circle'} size={15} color="green" /> */}
        <Text style={{padding: 5, color: 'gray'}}>
          🟢 {placeInfo?.reviewCount.green}
        </Text>
        <Text style={{padding: 5, color: 'gray'}}>
          | 🟠 {placeInfo?.reviewCount.yellow}
        </Text>
        <Text style={{padding: 5, color: 'gray'}}>
          | 🔴 {placeInfo?.reviewCount.red}
        </Text>
        <Text style={{padding: 5, color: 'gray'}}>
          | 한줄평 {placeInfo?.reviewCount.total}
        </Text>
      </View>
      {/* 전화, 리뷰, 즐겨찾기 */}
      <View style={styles.funcbox}>
        <PlaceFuncBox placeInfo={placeInfo} />
        {/* <Text>전화걸기 | 통계 | 즐겨찾기</Text> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // 검색창 스타일
  container: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  info: {
    padding: 5,
  },
  review: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  funcbox: {
    alignContent: 'center',
    marginVertical: 10,
    // borderColor: 'blue',
    // borderWidth: 10,
  },
});

export default PlacePreview;
