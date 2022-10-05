import React, {useState, useEffect} from 'react';
import {Button, Dialog, ListItem, Avatar, Icon} from '@rneui/themed';
import {StyleSheet, Linking, View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

type DialogComponentProps = {};

const EmergencyList: React.FunctionComponent<DialogComponentProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [visible, setVisible] = useState(false);

  //dialog를 띄우는 arrow
  const toggleDialog = () => {
    setVisible(!visible);
  };

  //모달창에 띄울 리스트
  const emergencyCallList = [
    {
      name: '119',
      subTitle: '근처 소방서로 연락',
      phoneNumber: '119',
    },
    {
      name: '112',
      subTitle: '근처 경찰서로 연락',
      phoneNumber: '112',
    },
  ];

  //로그인시에 이하를 적용
  if (user?.emergency) {
    emergencyCallList.push({
      name: '비상연락처',
      subTitle: '미리 지정해 둔 번호로 연락',
      phoneNumber: user?.emergency,
    });
  }

  return (
    <>
      <SafeAreaProvider style={styles.iconContainer}>
        <View>
          <Icon
            raised
            name="alarm-light"
            type="material-community"
            color="#f50"
            onPress={toggleDialog}
          />
          {/* <Button
      title="비상 연락"
      onPress={toggleDialog}
      buttonStyle={styles.button}
<<<<<<< Updated upstream
    /> */}
          {/* <Button
            title={loginButton} //로그인상태에 따라 버튼타이틀이 변화
            onPress={buttonEvent} //로그인상태에 따라 클릭시 실행되는 함수가 변화
          /> */}
        </View>
        <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
          <Dialog.Title title="비상 연락" />
          {emergencyCallList.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={{
                marginHorizontal: -10,
                borderRadius: 8,
              }}
              onPress={() => {
                Linking.openURL(`tel:${l.phoneNumber}`);
              }} //리스트의 phoneNumber 연락
            >
              <ListItem.Content>
                <ListItem.Title
                  style={{color: 'red', fontSize: 25, fontWeight: 'bold'}}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle>{l.subTitle}</ListItem.Subtitle>
              </ListItem.Content>
              <Avatar source={require('../../assets/images/PHONE_CALL.png')} />

            </ListItem>
          ))}
        </Dialog>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
  },
  iconContainer: {
    marginRight : 140,
    marginTop: -10,
  },
  buttonContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmergencyList;
