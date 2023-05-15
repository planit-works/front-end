# Plan-it 클라이언트 
## 📚 기술 스택
<h2>Front-End</h2>
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white">
</div>

<h2>Cloud</h2>
<div>
<img src="https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
<img src="https://img.shields.io/badge/rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
<img src="https://img.shields.io/badge/cloudwatch-FF4F8B?style=for-the-badge&logo=amazoncloudwatch&logoColor=white">
<img src="https://img.shields.io/badge/s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/api%20gateway-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white">
<img src="https://img.shields.io/badge/lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
</div>
<hr>

## 서비스 소개
일정을 관리하는 것은 번거로운 일입니다.  
하나의 일정을 등록할 때도 날짜나 시간, 이전 일정들과 겹치는 부분은 없는 지 고려해야할 것들이 많습니다.  

본 서비스는 일정을 관리하는 데 필요한 도구들을 지원하고자 합니다.  
또한, 다른 유저들과 관계를 맺음으로써 동기 부여의 역할도 수행할 수 있습니다.

1. 비회원, 회원 모두 서비스를 이용할 수 있습니다.
2. 비회원, 회원 모두 일정 관리에 필요한 도구를 사용할 수 있습니다.
3. 회원은 자신의 프로필을 꾸미고 다른 유저와 관계를 맺을 수 있습니다.  


## 기능 명세서
#### ✅: 완료
#### ❌: 개발 예정
#### <details><summary>: 데모영상</summary></details>

### 1. Welcome Page
- ✅ 랜덤으로 환영 문구가 등장한다.
- ✅ 로그인,회원가입 페이지 / 메인 페이지로 이동할 수 있다.

<details><summary>Welcome Page</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/c19d09a8-9fec-4178-9ae3-033c6d970ba0">
</details>  
  
### 2. Auth
#### 1) Local
- ✅ Email & PW로 회원가입을 진행할 수 있다.
- ✅ 회원가입 후 최초 프로필 수정이 가능하다. 혹은 변경하지 않아도 메인 페이지 진입이 가능하다.
- ✅ Form 수정 시 슬라이더가 동작한다.
- ❌ 비밀번호가 3개월 동안 변경되지 않았을 경우 변경 요청을 할 수 있다.

### 2) Social
- ❌ 구글 계정으로 회원가입할 수 있다.

<details><summary>회원가입</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/64e3afe0-215a-4185-ba00-92155f637c64">
</details>
<details><summary>로그인/ 로그아웃</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/aaf70faf-d5bf-4641-abdf-b27a284c789f">
</details>

### 3. User
#### 1) 프로필
- ✅ 프로필 사진과 닉네임, 자기소개를 변경할 수 있다.
- ✅ 자기소개를 마크다운 형식으로도 등록 및 변경할 수 있다.
- ✅ Form 수정 시 슬라이더가 동작한다.
- ✅ 다른 유저의 프로필을 조회할 수 있다.

#### 2) 검색
- ✅ 닉네임으로 다른 유저를 검색할 수 있다.
- ✅ 유저 검색 결과에서 팔로우 여부를 확인할 수 있다.

#### 3) 그래프
- ❌ 등록한 일정 달성율을 그래프로 확인할 수 있다.

### 4. Follow
- ✅ 다른 유저를 팔로우할 수 있다.
- ✅ 다른 유저를 언팔로우할 수 있다.
- ❌ 내가/나를 팔로우 중인 유저를 조회할 수 있다.
- ❌ 다른 유저를 차단할 수 있다.
- ❌ 팔로우한 유저와 채팅을 할 수 있다.

<details><summary>마이 페이지 프로필 수정</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/8554d591-1bb3-49fd-aa0f-7c7e96476351">
</details>
<details><summary>유저 검색/ 팔로우</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/85683c2f-6bf7-4065-b43c-73e42420cf0b">
</details>

### 5. Schedule
- ✅ 일정을 등록할 수 있다.
- ❌ 날짜 별 일정을 등록할 수 있다.
- ❌ 일정에 다른 유저를 추가하여 일정을 공유할 수 있다.

### 6. Clock
- ✅ 현재 시간을 확인할 수 있다.
- ✅ 타이머를 사용할 수 있다.
- ✅ 스톱워치를 사용할 수 있다.
  - ✅ 목표 시간 도달 시 알람이 울린다.

<details><summary>일정 관리</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/7920cd5a-a992-4a87-bd94-72509ba42233">
</details>
<details><summary>타이머, 스톱워치</summary>
<img src="https://github.com/HYK424/Elice-SW3-Schedule_Monster/assets/88307030/7a708710-a557-49f6-a63f-c37c820518e7">
</details>

## 
<hr>
<br>
