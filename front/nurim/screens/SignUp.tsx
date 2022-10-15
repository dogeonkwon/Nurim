import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Text, Button} from '@rneui/themed';
import {serverIP, apis} from '../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../slices';

const styles = StyleSheet.create({
  avatarSize: {
    width: 'auto',
    height: 'auto',
    minWidth: '40%',
    minHeight: '40%',
    maxWidth: '80%',
    maxHeight: '50%',
  },
  titleStyle: {
    flex: 0.5,
    hieght: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentStyle: {
    flex: 1,
  },
  buttonStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
});

const SignUp = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [nickname, setNickname] = useState<string>('김국진');
  const [phone, setPhone] = useState<string>('010-4853-5704');
  const [emergency, setEmergency] = useState<string>('010-4853-5704');
  // 등록하기 버튼 클릭
  const buttonClicked = (): void => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    //requestHeaders.set('jwt-token', user?.token);
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    //requestHeaders.set('Content-Type', 'multipart/form-data;charset=utf-8');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');

    fetch(serverIP + apis.wirteMoreInfo, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        phone,
        emergency,
      }),
    })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log('error:', e));
  };
  return (
    <>
      <View style={styles.titleStyle}>
        <Text h4>정상적인 이용을 위해</Text>
        <Text h4>추가 정보 입력이 필요합니다.</Text>
      </View>
      <View style={styles.contentStyle}>
        <View style={styles.textStyle}>
          <Text>닉네임</Text>
        </View>
        <Input
          value={nickname}
          placeholder="사용할 닉네임을 입력하세요"
          onChangeText={value => setNickname(value)}
        />
        <View style={styles.textStyle}>
          <Text>본인의 휴대번호</Text>
        </View>
        <Input
          value={phone}
          placeholder="010-1234-1234"
          onChangeText={value => setPhone(value)}
        />
        <View style={styles.textStyle}>
          <Text>비상 시 연락 휴대번호</Text>
        </View>
        <Input
          value={emergency}
          placeholder="010-1234-1234"
          onChangeText={value => setEmergency(value)}
        />
        <View style={styles.buttonStyle}>
          <Button title="등록하기" onPress={buttonClicked} />
        </View>
      </View>
    </>
  );
};

export default SignUp;
