// 내정보변경 컴포넌트
// 2022-09-26 김국진

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: '5%',
  },
  viewButton: {marginLeft: '3%', marginRight: '3%'},
  viewNickname: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nicknameInput: {width: '70%'},
  nicknameButton: {width: '30%', marginTop: '2%'},

  textMargin: {
    marginLeft: '4%',
    fontSize: 16,
  },
  errText: {
    marginLeft: '4%',
    top: -20,
    fontSize: 16,
  },
  errTextPossible: {
    color: 'blue',
  },
  errTextImpossible: {
    color: 'red',
  },
});

const UpdateProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [errMsg, setErrMsg] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('김국진');
  const [phone, setPhone] = useState<string>('');
  const [emergency, setEmergency] = useState<string>('');
  const [checkNick, setCheckNick] = useState<boolean>(false);

  const nicknameCheck = (): void => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    //requestHeaders.set('jwt-token', user?.token);
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    //requestHeaders.set('Content-Type', 'multipart/form-data;charset=utf-8');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    fetch(serverIP + apis.nicknameCheck, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        nickname,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.availability) {
          setErrMsg(1);
          setCheckNick(true);
        } else {
          setErrMsg(2);
          setCheckNick(false);
        }
      })
      .catch(e => console.log(e));
  };

  const updateProfile = (): void => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    fetch(serverIP + apis.userUpdate, {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify({
        nickname,
        phone,
        emergency,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.viewContainer}>
      <View>
        <View style={styles.viewNickname}>
          <View style={styles.nicknameInput}>
            <Input
              placeholder="새 닉네임을 입력하세요."
              value={nickname}
              onChangeText={value => setNickname(value)}
            />
          </View>
          <View style={styles.nicknameButton}>
            <Button type="outline" size="md" onPress={() => nicknameCheck()}>
              중복확인
            </Button>
          </View>
        </View>
        {errMsg === 1 && (
          <Text style={[styles.errText, styles.errTextPossible]}>
            닉네임을 사용하실 수 있습니다.
          </Text>
        )}

        {errMsg === 2 && (
          <Text style={[styles.errText, styles.errTextImpossible]}>
            닉네임을 사용하실 수 없습니다.
          </Text>
        )}
        <Input
          placeholder="교체할 휴대폰 번호. (010-xxxx-xxxx)"
          value={phone}
          onChangeText={value => setPhone(value)}
        />
        <Input
          placeholder="교체할 비상연락 번호. (010-xxxx-xxxx)"
          value={emergency}
          onChangeText={value => setEmergency(value)}
        />
      </View>
      <View style={styles.viewButton}>
        <Button size="md" onPress={() => updateProfile()}>
          저장하기
        </Button>
      </View>
    </View>
  );
};

export default UpdateProfile;
