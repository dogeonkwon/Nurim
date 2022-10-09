- # ***\*🛣 누림(Nurim)\****

  ![image](https://user-images.githubusercontent.com/99178653/194759272-818b1096-1b89-43ab-b0dc-a8ae94219c77.png)

  

  ## **💜 프로젝트 진행 기간**

  2022.08.22(월) ~ 2022.10.07(금)

  SSAFY 7기 2학기 특화프로젝트 - 누림(Nurim)

  ------

  ## **🎵** 누림(Nurim)**- 배경**

  - 국내 교통 약자들이 이용하기 편한 시설에 대한 데이터가 공개되고 있으나, 접근성이 낮다는 것을 파악했습니다.
  - 글로벌 플랫폼 휠맵(Wheel Map)에서 제공되는 한국의 장소 정보가 현저하게 적었습니다.
    - 휠맵 : 무료로 전세계에서 휠체어 접근 가능 장소를 찾아주는 어플

  ------

  ## **💜** 누림(Nurim)**- 개요**

  - 이동이 불편한 교통 약자들을 위해 이동 혹은 방문이 편한 장소를 제공하는 애플리케이션을 개발하게 되었습니다.

  ------

  ## **💜** 누림(Nurim)**- 기대효과**

  - 교통 약자들이 고려할 만한 정보를 특정 장소를 기준으로 제공하여 목적지 선정을 쉽게 도와줍니다.
  - 방문자가 작성한 리뷰를 통해 보다 정확하고 최신화된 정보를 제공합니다.
  - 사용자 위치 기반으로 이용할 수 있는 콜택시의 정보를 확인 및 호출 할 수 있습니다.

  ------

  ## **💜 주요 기능**

  ------

  - 주변상가/장애인 편의시설이 갖추어진 장소에 대한 표시
    - 검색과 시설 카테고리 분류 기능으로 장소를 손쉽게 찾을 수 있습니다.
    - 해당 시설에 대한 위치, 이용시간, 전화번호 등을 간략하게 볼 수 있습니다.
    - 해당 시설에 대한 장애인 이용 난이도(신호등 지수 + 한줄평)가 가능합니다.
  - 교통약자 이용 난이도(신호등 + 한줄평) 등록
    - 해당 장소의 교통약자 이용 난이도를 등록할 수 있습니다.
    - 난이도 등록 방법
      1. 신호등 지수 선택
      2. 지수에 따른 한줄평 작성
      3. 등록
  - 리뷰 분석 워드클라우드
    - 방문자가 작성한 리뷰를 자연어 처리 후 분산처리를 통해 핵심키워드의 횟수를 기준으로 원형그래프로 제공하였습니다.
  - 현재 위치 기반으로 장애인 콜택시와의 연락 서비스
    - 콜택시 버튼 클릭 시, 해당 위치를 기반으로 대표 장애인콜택시 번호로 전화걸기가 가능합니다.
  - 비상 호출 (비상연락처, 경찰서, 소방서)
    - 주변이 사람이 없는 상황에서 응급상황, 위급상황에 처한경우 도움을 받을 수 있는 비상 호출 버튼
      - ex) 휠체어가 고장나거나 넘어진 경우 등

  ## **✔ 주요 기술**

  ------

  **Backend - SpringBoot**

  - Express.js 4.18.1
  - Bcrypt 5.0.1
  - JWT 8.5.1
  - Swagger-jsdoc 6.2.3
  - Swagger-ui-express 4.5.0
  - Sequelize 6.21.3
  - MySQL 2.3.3
  - Multer 1.4.5

  **Backend - DB**

  - MySQL 8.0.29

  **Frontend**

  - Visual Studio Code IDE
  - Android Studio
  - TypeScript 4.8.2
  - React Native 18.2
  - React Native Elements 4.0.0-rc.6
  - Redux 4.2.0
  - axios 0.27.2
  - react-navigation drawer 6.4.4
  - react-navigation native-stack 6.8.0
  - react-native nmap 0.0.66

  **CI/CD**

  - AWS EC2 Ubuntu 20.04 LTS
  - K8S 1.25.1
  - Jenkins 2.361.1
  - NGINX

  ## **✔ 프로젝트 파일 구조**

  ------

  ### **Back**

  ```
  i_link/back/app
    ├── config
    │   ├── db
    │   ├── redis
    │   └── swagger
    ├── controller
    │   ├── center
    │   ├── group
    │   ├── memos
    │   └── user
    ├── model
    │   ├── centers
    │   ├── files
    │   ├── groups
    │   ├── index
    │   ├── init-moodels
    │   ├── kids
    │   ├── meals
    │   ├── memos
    │   ├── notices
    │   ├── quiz_images
    │   ├── quiz_results
    │   ├── quiz
    │   ├── report_types
    │   ├── reports
    │   ├── surveys
    │   ├── user_types
    │   └── users
    ├── routes
    │   ├── centers
    │   ├── groups
    │   ├── index
    │   ├── kids
    │   ├── meals
    │   ├── members
    │   ├── memos
    │   ├── notices
    │   ├── quiz
    │   ├── reports
    │   ├── stamps
    │   ├── surveys
    │   └── users
    ├── utils
    │   └── attachment
    │   └── auth
    │   └── meals
    │   └── profile
    │   └── quiz
    └── app.js
  ```

  ### **Front**

  ```
  nurim/front
    ├── config
    ├── node_modules
    ├── android
    ├── assets
    ├── common
  	  ├── colors
        ├── font
        ├── urls
    ├── components
        ├── AdditionalButton
        ├── CustomDrawer
        ├── EmergencyList
        ├── FilterBar
        ├── LogInSideBar
        ├── LogOutSideBar
        ├── LogoTitle
        ├── MainWidget
        ├── Map
        ├── MoveBack
        ├── MyFavor
        ├── MyFavorContent
        ├── MyPageContent
        ├── MyPageHeader
        ├── MyReview
        ├── MyReviewContent
        ├── MyReviewHeader
        ├── PlaceDetailChart
        ├── PlaceDetailTab
        ├── PlaceFuncBox
        ├── PlaceInfo
        ├── PlacePreview
        ├── PlaceReview
        ├── PlaceReviewDetail
        ├── PlaceTag
        ├── PopTab
        ├── ProfilePicture
        ├── SearchBar
        ├── SideBar
        ├── SideBarLogo
        ├── SideBarMenu
        ├── TaxiInfo
        ├── TaxiInfoContent
        ├── TaxiPreview
        ├── UpdateProfile
        └── WriteReview
    ├── ios
    ├── modules
    ├── screens	
        ├── DrawerNavigator
        ├── EmailConfirm
        ├── FindPassword
        ├── LogIn
        ├── Main
        ├── MyFavor
        ├── MyPage
        ├── MyReviewFavor
        ├── PlaceDetail
        ├── RootStack
        ├── SignUp
        ├── SplashImage
        └── TaxiDetail
    ├── App.tsx
    ├── package.json
    └── index
  ```

  ## **✔ 협업 툴**

  ------

  - Gitlab
  - Notion
  - Jira
  - Discord

  ## **✔ 협업 환경**

  ------

  - Gitlab
    - 코드의 버전을 관리
    - 이슈 발행, 해결을 위한 토론
    - MR시, 팀원이 코드 리뷰를 진행하고 피드백 게시
  - Notion
    - 회의가 있을 때마다 회의록을 기록하여 보관
    - 회의가 길어지지 않도록 다음날 제시할 안건을 미리 기록
    - 기술 확보 시, 다른 팀원들도 추후 따라할 수 있도록 보기 쉽게 작업 순서대로 정리
    - 컨벤션 정리
    - 규칙, 기능 명세서 등 모두가 공유해야 하는 문서 관리
  - JIRA
    - 매주 목표량을 설정하여 Sprint 진행
    - 업무의 할당량을 정하여 Story Point를 설정하고, In-Progress -> Done 순으로 작업
  - Discord
    - Discord 스탠드업 회의 진행, 당일 할 업무 브리핑
    - Discord 마무리 회의 진행, 당일 업무 진행 브리핑, 다음 날 진행할 업무 브리핑
    - 빠른 소통과 신속한 대응이 가능

  ## **✔ 팀원 역할 분배**

  | 이름   | 직책 | 역할 | 비고                                           |
  | ------ | ---- | ---- | ---------------------------------------------- |
  | 송형근 | 팀장 | BE   | 배포, 컨벤션 관리                              |
  | 공지훈 | 팀원 | BE   | 서비스 API, 데이터 수집                        |
  | 정찬우 | 팀원 | BE   | 분산 처리, 노션 관리                           |
  | 김국진 | 팀원 | FE   | Navigation 설정, Redux, 회원 관리, 소셜 로그인 |
  | 권도건 | 팀원 | FE   | Map API, 검색 및 필터 관리                     |
  | 이태엽 | 팀원 | FE   | 비상호출, 콜택시 기능                          |

  ## **✔ 프로젝트 산출물**

  ------

  - [컨셉 기획](https://www.notion.so/f48e16ca91874f179b3b652f6fcd9ab1)
  - [기능명세서](https://www.notion.so/f8c99068c03a4343908ea6b8a76becc0)
  - [플로우 차트](https://www.figma.com/file/k7FklDQJV225J3iNcDchqZ/Flow-Chart?node-id=0%3A1)
  - [와이어프레임](https://www.figma.com/file/19hHX1UOI0EzpO1DY68dmk/와이어프레임?node-id=0%3A1)
  - [아키텍처](https://www.figma.com/file/cGF65x7oj2Qfl7DCUCe779/아키텍쳐?node-id=0%3A1)
  - [API 명세서](https://www.notion.so/005f0bbb2a1346fcbc7a5753ebfb64d1)
  - ERD

  ## **✔ 프로젝트 결과물**

  - [포팅매뉴얼](https://docs.google.com/document/d/10wzDPg273BWjJ4XT2zUsOyBnLvHKEcepQAMAQublV6M/edit)
  - [중간발표자료](https://docs.google.com/presentation/d/1Y4_q0CCgUuazctQpNe05ElO9uyQC1ZUVeFi5aFJRKts/edit?usp=sharing)
  - [최종발표자료](https://docs.google.com/presentation/d/1K73Tov3w2SGgzI4UegFxY3Pcn0sXxdvchDKJ4jDMYB0/edit)

  ------

## 	✔ 기능 GIF

- 시작

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761451-48004c40-ed14-4493-a3ee-78cbdeb448fb.gif">
 </div>

- 필터바

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761669-8fe283b8-000e-4149-b156-96918397f8cb.gif">
 </div>

- 검색

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761687-166cf2b2-60a1-41ff-befa-58ae4b8af78d.gif">
 </div>

- 미리보기

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761693-4182cd3d-f9ba-4ce8-b3a7-cc965430d7cf.gif">
 </div>

- 상세정보

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761698-42618b83-771f-41cc-a732-8da385f72c07.gif">
 </div>

- 리뷰등록

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761700-986922d9-9f84-4260-b408-49c7d523e936.gif">
 </div>

- 통계

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194761702-467f55be-a5b3-4c08-8540-8b92e5d6df39.gif">
 </div>

- 마이 리뷰 및 즐겨찾기

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194762051-8b3cc2bc-57c8-465a-83f6-14cefef82d9a.gif">
 </div>

- 비상호출

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194762164-b70fef5b-0240-4506-a0d0-757c000ded11.gif">
 </div>

- 콜택시

<div style="text-align: flex-start;">
  <img style="max-height:90%; max-width:90%;"
  src="https://user-images.githubusercontent.com/99178653/194762402-2fd3c37a-9d6a-486e-818a-4afee16975a9.gif">
 </div>



