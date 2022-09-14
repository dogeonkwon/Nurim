// 플랫폼별로 폰트 가져오기
import {Platform} from 'react-native';

// level에 맞는 크기의 폰트를 가져옴.
// 1 ~ 5 크기
const getFont = (level: number): string => {
  switch (level) {
    case 1:
      return Platform.OS === 'ios' ? 'AppleSDGothicNeoL00' : '';
    case 2:
      return Platform.OS === 'ios' ? 'AppleSDGothicNeoM00' : '';
    case 3:
      return Platform.OS === 'ios' ? 'AppleSDGothicNeoB00' : '';
    case 4:
      return Platform.OS === 'ios' ? 'AppleSDGothicNeoEB00' : '';
    case 5:
      return Platform.OS === 'ios' ? 'AppleSDGothicNeoH00' : '';
    default:
      return '';
  }
};

export {getFont};
