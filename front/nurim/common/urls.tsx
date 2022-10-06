// 서버 API 통신용 url

export const serverIP = 'https://j7e105.p.ssafy.io/';

export const apis = {
  userInfo: 'api/user/', // 회원정보 조회
  userUpdate: 'api/user', // 회원정보 수정
  nicknameCheck: 'api/user/nickname-check', // 닉네임 중복 확인
  kakaoLogin: 'api/user/kakao-login', // 카카오 로그인
  naverLogin: 'api/user/naver-login', // 네이버 로그인
  userDelete: 'api/user', // 회원 탈퇴
  wirteMoreInfo: 'api/user/write-moreInfo', // 초기 정보
  reviewWrite: 'api/review/write', // 리뷰 작성
  reviewUpdate: 'api/review/', // 리뷰 수정
  reviewDelete: 'api/review/', // 리뷰 삭제
  myReviewInfo: 'api/review/reviews', // 본인이 작성한 리뷰 조회
  placeReview: 'api/review/', // 해당 장소에 대한 리뷰 조회
  favorInsert: 'api/favorite/', // 즐겨찾기 추가
  favorDelete: 'api/favorite/', // 즐겨찾기 삭제
  favorInfo: 'api/favorite', // 즐겨찾기 조회
  placeAllInfo: 'api/location', // 장소 전체 조회
  placeInfo: 'api/location', // 장소 검색
  taxiInfo: 'api/taxi', // 콜택시 조회
  slope: 'api/slope', // 급경사 조회
  wordCount: 'api/word/',
};
