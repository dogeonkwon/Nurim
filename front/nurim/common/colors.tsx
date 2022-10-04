// 공통 사용 색상

const getColor = (name: string): string => {
  switch (name) {
    case 'KAKAO':
      return '#FAE100';
    case 'NAVER':
      return '#1EC800';
    case 'HEADER':
      return '#36BC9B';
    default:
      return '';
  }
};

export {getColor};
