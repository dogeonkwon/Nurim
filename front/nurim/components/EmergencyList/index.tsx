import React, {useState} from 'react';
import {Button, Dialog, ListItem, Avatar, Icon} from '@rneui/themed';
import {View, StyleSheet, Linking} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type DialogComponentProps = {};

const EmergencyList: React.FunctionComponent<DialogComponentProps> = () => {
  //버튼을 눌러야만 보이도록 false
  const [visible, setVisible] = useState(false);
  //로그인 상태변화, 기본값은 false
  const [login, setLogin] = useState(false);

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
  //상태변화에 따라 재할당이 필요하기에 재할당이 가능한 let 사용
  let loginButton = '로그인하기';
  let buttonEvent = () => {
    setLogin(true);
  };

  //로그인시에 이하를 적용
  if (login == true) {
    //버튼의 기능을 로그아웃으로 변경
    buttonEvent = () => {
      setLogin(false);
    };
    //버튼 타이틀 변경
    loginButton = '로그아웃하기';
    //재할당이 불가능한 const이기에 .push로 이하를 리스트 마지막에 추가
    emergencyCallList.push({
      name: '비상연락처',
      subTitle: '미리 지정해 둔 번호로 연락',
      phoneNumber: '01092403692',
    });
  }

  return (
    <>
      <SafeAreaProvider style={styles.iconContainer}>
        <SafeAreaProvider>
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
          <Button
            title={loginButton} //로그인상태에 따라 버튼타이틀이 변화
            onPress={buttonEvent} //로그인상태에 따라 클릭시 실행되는 함수가 변화
          />
        </SafeAreaProvider>
        <Dialog isVisible={visible} onBackdropPress={toggleDialog} />
        <Button
          title={loginButton} //로그인상태에 따라 버튼타이틀이 변화
          onPress={buttonEvent} //로그인상태에 따라 클릭시 실행되는 함수가 변화
        />
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
              <Avatar source={require('../../assets/images/PHONE_CALL.png')} />
              <ListItem.Content>
                <ListItem.Title
                  style={{color: 'red', fontSize: 25, fontWeight: 'bold'}}>
                  {l.name}
                </ListItem.Title>
                <ListItem.Subtitle>{l.subTitle}</ListItem.Subtitle>
              </ListItem.Content>
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
    marginTop: -305,
  },
  buttonContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmergencyList;
