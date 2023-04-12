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

<h2>Cloud(AWS)</h2>
<div>
<img src="https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> 
<img src="https://img.shields.io/badge/rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
<img src="https://img.shields.io/badge/cloudwatch-FF4F8B?style=for-the-badge&logo=amazoncloudwatch&logoColor=white">
<img src="https://img.shields.io/badge/s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/api%20gateway-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white">
<img src="https://img.shields.io/badge/lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white">
</div>
<hr>

## 기능 명세서
#### ✅: 완료
#### 🔜: 개발 중
#### ❌: 개발 예정
### 1. Auth
#### 1) Local
- ✅ Email & PW로 회원가입을 진행할 수 있다.
- ✅ 회원가입 후 최초 프로필 수정이 가능하다. 혹은 변경하지 않아도 메인 페이지 진입이 가능하다.
- ✅ Form 수정 시 슬라이더가 동작한다.
- ❌ 비밀번호가 3개월 동안 변경되지 않았을 경우 변경 요청을 할 수 있다.

#### 2) Social
- ❌ 구글 계정으로 로그인할 수 있다.
  - ✅ 서버단 구현 완료
- ❌ 카카오톡 계정으로 로그인할 수 있다.

### 2. User
#### 1) 프로필
- ✅ 프로필 사진과 닉네임, 자기소개를 변경할 수 있다.
- ✅ 자기소개를 마크다운 형식으로도 등록 및 변경할 수 있다.
- ✅ Form 수정 시 슬라이더가 동작한다.
- ✅ 다른 유저의 프로필을 조회할 수 있다.

#### 2) 검색
- ✅ 닉네임으로 다른 유저를 검색할 수 있다.
- ✅ 유저 검색 결과에서 팔로우 여부를 확인할 수 있다.
- 🔜 무한 스크롤로 검색 결과를 확인할 수 있다.

#### 3) 그래프
- ❌ 등록한 일정 달성율을 그래프로 확인할 수 있다.

### 3. Follow
- ✅ 다른 유저를 팔로우할 수 있다.
- ✅ 다른 유저를 언팔로우할 수 있다.
- ❌ 내가 팔로우 중인 유저를 조회할 수 있다.
- ❌ 나를 팔로우 중인 유저를 조회할 수 있다.
- ❌ 다른 유저를 차단할 수 있다.
- ❌ 팔로우한 유저와 채팅을 할 수 있다.

### 4. Background
- ❌ 자신만의 배경화면을 최대 10장까지 등록할 수 있다.

### 5. Schedule
- 🔜 특정 일자와 시간으로 스케쥴을 등록할 수 있다.
  - 현재 localStorage에서만 CRUD 가능. API 통신 미구현
- 🔜 특정 월의 전체 일정을 확인할 수 있다.
  - 날짜별 공휴일 렌더링 구현 중
- ❌ 일정에 다른 유저를 추가하여 일정을 공유할 수 있다.

### 6. Routine
- ❌ 시간대별 루틴을 등록할 수 있다.
- ❌ 프로필 화면에서 일자별 루틴 달성 성과를 확인할 수 있다.
- ❌ 루틴을 수정할 수 있다.
- ❌ 루틴을 삭제할 수 있다.

### 7. Clock
- ✅ 현재 시간을 확인할 수 있다.
- ✅ 타이머를 사용할 수 있다.
- ✅ 스톱워치를 사용할 수 있다.
  - 목표 시간 도달 시 알람이 울린다.

## 
<hr>
<br>
