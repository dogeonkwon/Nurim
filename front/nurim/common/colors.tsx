// 공통 사용 색상

const getColor = (name: string): string => {
  switch (name) {
    case 'KAKAO':
      return '#E7E600';
    case 'NAVER':
      return '#2D8400';
    default:
      return '';
  }
};

export {getColor};
