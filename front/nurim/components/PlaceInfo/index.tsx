/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {ILocation} from '../Map';
import PlaceFuncBox from '../PlaceFuncBox';
import {IPlace} from '../PlacePreview';

// ------------------------------------------------------- 아래쪽은 실제 사용할 코드

type iconF = {
  id: number;
  image: string;
  desc: string;
  check: string;
};

const iconFilter: iconF[] = [
  {id: 0, image: 'restroom', desc: '화장실', check: '대변기'},
  {id: 1, image: 'shower', desc: '샤워실', check: '샤워실및탈의실'},
  {id: 2, image: 'road', desc: '접근로', check: '주출입구접근로'},
  {
    id: 3,
    image: 'elevator-passenger',
    desc: '승강기',
    check: '계단또는승강설비',
  },
  {id: 4, image: 'exit-run', desc: '피난시설', check: '경보및피난설비'},
  {id: 5, image: 'parking', desc: '주차장', check: '장애인전용주차구역'},
  {id: 6, image: 'info-circle', desc: '안내시설', check: '유도및안내설비'},
  {id: 7, image: 'braille', desc: '점자블록', check: '점자블록'},
];

export interface IDetailType {
  placeAllInfo: IPlace | null;
  location: ILocation;
}

// 내 좌표 불러와서 거리 구해야 함
// 디테일 페이지에서 내 좌표 가져오기..

const PlaceDetail = (props: IDetailType) => {
  const [iconList, setIconList] = useState<iconF[]>([]);
  console.log(props.placeAllInfo);
  useEffect(() => {
    getIcon();
  }, [props]);

  const [myLat, setMyLat] = useState<number>(props.location.latitude);
  const [myLng, setMyLng] = useState<number>(props.location.longitude);

  const getIcon = () => {
    let newIcons: iconF[] = [];
    props.placeAllInfo?.facilities.map(data => {
      const trimData: string = data.replace(/ /g, '');
      iconFilter.forEach((e, idx) => {
        if (e.check === trimData) {
          const newIcon: iconF = {
            id: idx,
            image: e.image,
            desc: e.desc,
            check: e.check,
          };
          newIcons.push(newIcon);
        }
      });
    });
    setIconList(newIcons);
  };

  // 출발지 위경도로 부터 도착지 위경도까지의 거리 구하기
  const deg2rad = (deg: number) => {
    return (deg * Math.PI) / 180.0;
  };
  const rad2deg = (rad: number) => {
    return (rad * 180) / Math.PI;
  };

  const getDistance = (
    lng1: number,
    lat1: number,
    lng2: number,
    lat2: number,
    useKm?: boolean,
  ) => {
    if (lng1 === lng2 && lat1 === lat2) {
      return 0;
    } else {
      const theta = lng1 - lng2;
      let dist =
        Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.cos(deg2rad(theta));
      dist = Math.acos(dist);
      dist = rad2deg(dist);
      dist = dist * 60 * 1.1515;
      if (useKm) {
        dist = dist * 1.609344;
      } else {
        dist = dist * 1609.344;
      }
      return Math.round(dist);
    }
  };

  const distance = getDistance(
    Number(props.placeAllInfo?.lng),
    Number(props.placeAllInfo?.lat),
    Number(myLng),
    Number(myLat),
    true,
  );

  return (
    <View>
      {/* 시설 정보 */}
      <View style={styles.placeName}>
        <Text>{props.placeAllInfo?.locationName}</Text>
      </View>
      <View style={styles.change}>
        <Text>
          {distance} KM | {props.placeAllInfo?.subCategoryName}
        </Text>
      </View>
      <View style={styles.change}>
        <PlaceFuncBox preview={props.placeAllInfo} />
      </View>
      <View style={styles.change}>
        <Text>{props.placeAllInfo?.address}</Text>
      </View>
      {props.placeAllInfo?.openingHours ? (
        <View style={styles.change}>
          <Text>{props.placeAllInfo?.openingHours}</Text>
        </View>
      ) : null}
      {props.placeAllInfo?.phone ? (
        <View style={styles.change}>
          <Text>{props.placeAllInfo?.phone}</Text>
        </View>
      ) : null}
      <View style={{borderColor: 'red', borderWidth: 5}}>
        <View style={{flexDirection: 'row'}}>
          {iconList.map((e, idx) => {
            if (idx < 4) {
              if (e.image === 'elevator-passenger' || e.image === 'exit-run') {
                return (
                  <View style={styles.icon}>
                    <IconMaterial
                      key={idx}
                      name={e.image}
                      size={30}
                      color="#01a699"
                    />
                    <Text>{e.desc}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.icon}>
                    <IconAwesome
                      key={idx}
                      name={e.image}
                      size={30}
                      color="#01a699"
                    />
                    <Text>{e.desc}</Text>
                  </View>
                );
              }
            }
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          {iconList.map((e, idx) => {
            if (idx > 3) {
              if (e.image === 'elevator-passenger' || e.image === 'exit-run') {
                return (
                  <View style={styles.icon}>
                    <IconMaterial
                      key={idx}
                      name={e.image}
                      size={30}
                      color="#01a699"
                    />
                    <Text>{e.desc}</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.icon}>
                    <IconAwesome
                      key={idx}
                      name={e.image}
                      size={30}
                      color="#01a699"
                    />
                    <Text>{e.desc}</Text>
                  </View>
                );
              }
            }
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeName: {
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'gray',
  },
  change: {
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'gray',
  },
  icon: {
    margin: 15,
    alignItems: 'center',
  },
});

export default PlaceDetail;
