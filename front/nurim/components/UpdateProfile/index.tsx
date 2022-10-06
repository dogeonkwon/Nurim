// 내정보변경 컴포넌트
// 2022-09-26 김국진

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MainStackNavigationProp} from '../../screens/RootStack';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {serverIP, apis} from '../../common/urls';
import {useSelector} from 'react-redux';
import {RootState} from '../../slices';
import {useDispatch} from 'react-redux';
import {authorize} from '../../slices/auth';
import Toast from 'react-native-simple-toast';
import {logout} from '@react-native-seoul/kakao-login';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: '15%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  viewButton: {marginLeft: '3%', marginRight: '3%'},
  messageContainer: {
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
  messageText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 15,
  },
  viewOut: {
    width: '100%',
    height: '20%',
    marginTop: '3%',
    alignItems: 'center',
  },
  outText: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: 'darkgray',
  },
});

type UpdateProfileProps = {
  setSelectedMenu: (selectedMenu: number) => void;
};

const UpdateProfile = (props: UpdateProfileProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<MainStackNavigationProp>();

  const [errMsg, setErrMsg] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [emergency, setEmergency] = useState<string>('');
  const [checkNick, setCheckNick] = useState<boolean>(false);

  const nicknameCheck = (): void => {
    if (nickname.length === 0) {
      return;
    }
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
          setMessage('');
        } else {
          setErrMsg(2);
          setCheckNick(false);
        }
      })
      .catch(e => console.log(e));
  };

  // 회원 탈퇴 클릭
  const outClicked = () => {
    Alert.alert('회원 탈퇴하시겠습니까?', '', [
      {
        text: '확인',
        onPress: () => signDelete(),
        style: 'cancel',
      },
      {text: '취소'},
    ]);
  };

  const signDelete = () => {
    // 통신 헤더 정의
    const requestHeaders = new Headers();
    requestHeaders.set('jwt-token', user?.token ? user.token : '');
    requestHeaders.set('Content-Type', 'application/json;charset=utf-8');
    fetch(serverIP + apis.userDelete, {
      method: 'DELETE',
      headers: requestHeaders,
    })
      //.then(response => response.json())
      .then(response => {
        Toast.show('회원탈퇴하였습니다.');
        // 로그아웃
        logout().then(() => {
          dispatch(authorize(null));
          navigation.navigate('Main');
        });
      })
      .catch(e => console.log(e));
  };

  const saveButtonClicked = (): void => {
    if (!checkNick) {
      setMessage('닉네임 중복체크가 필요합니다.');
      return;
    }

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
        dispatch(
          authorize({
            nickname: response.nickname, // 닉네임
            phone: response.phone, // 휴대폰번호
            emergency: response.emergency, // 비상연락번호
            token: response.token, // 액세스토큰
            profile: response.imgUrl,
          }),
        );
        Toast.show('회원 정보 수정이 완료되었습니다.');
        props.setSelectedMenu(0);
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.viewContainer}>
      <View>
        <View style={styles.messageContainer}>
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
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View style={styles.viewButton}>
        <Button size="md" onPress={() => saveButtonClicked()}>
          저장하기
        </Button>
      </View>
      <View style={styles.viewOut}>
        <Text style={styles.outText} onPress={() => outClicked()}>
          회원탈퇴
        </Text>
      </View>
    </View>
  );
};

export default UpdateProfile;
