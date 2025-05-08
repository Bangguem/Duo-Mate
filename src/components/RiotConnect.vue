<template>
    <div id="app">
      <div class="find-password-page">
        <!-- 상단 헤더 -->
        <header class="header">
          <div class="logo">
            <div class="circle">
              <img src="/favicon.ico" class="circle" @click="$router.push('/')" style="cursor: pointer;" alt="" />
            </div>
            <span>{{ userInfo.nickname }}</span>
          </div>
          <nav class="nav-links">
            <div class="nav-button" @click="$router.push('/')">홈</div>
            <div class="nav-button" @click="$router.push('/board')">게시판</div>
            <div class="nav-button" @click="$router.push('/patch-notes')">패치 노트</div>
          </nav>
        </header>
  
        <!-- 비밀번호 찾기 섹션 -->
        <main class="main-content">
          <h1 class="title">라이엇 계정 연동이 필요합니다.</h1>
          <form class="form">
            <div class="form-group">
              <label for="summoner" class="form-label">소환사 이름</label>
              <input type="text" id="summonerName" class="form-input" v-model="summonerName"
                placeholder="소환사 이름을 입력해주세요" />
            </div>
            <div class="form-group">
              <label for="tag" class="form-label">소환사 태그</label>
              <input type="text" id="tag" class="form-input" v-model="tag"
                placeholder="#을 제외한 소환사 태그를 입력해주세요" />
            </div>
            <p v-if="message" :class="success ? 'success' : 'error'">{{ message }}</p>
            <div class="button-group">
              <!-- <button type="button" class="cancel-button">취소</button> -->
              <button type="submit" class="submit-button" @click.prevent="linkRiotAccount()">연동하기</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        summonerName: '',
        tag: '',
        message: '',
        success: false,
        userInfo: {},
      };
    },
    methods: {
        async linkRiotAccount() {
      console.log("연동하기 버튼 클릭됨"); // 디버깅 로그

      if (!this.summonerName || !this.tag) {
        alert("소환사 이름과 태그를 입력해주세요.");
        return;
      }

      try {

        console.log("소환사 이름:", this.summonerName);
        console.log("태그:", this.tag);

        console.log("연동 요청 보냄:", this.summonerName, this.tag);  // 요청 전 콘솔 로그 추가
        const response = await fetch(`${process.env.VUE_APP_API_URL}/summonerInfo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userid: this.userInfo.userid,
            summonerName: this.summonerName,
            tag: this.tag,
          }),
        });
        console.log("서버 응답 상태 코드:", response.status); // 응답 상태 확인
        const result = await response.json();
        console.log("서버 응답 데이터:", result); // 응답 데이터 확인

        if (result.success) {
          alert("라이엇 연동 완료");
          this.showRiotModal = false; // 모달 닫기
          window.location.href = '/';
          // Riot API 데이터 업데이트
          this.riotInfo = {
            tier: result.tier || "정보 없음",
            summonerLevel: result.summonerLevel || "정보 없음",
            profileIconId: result.profileIconId || '',
            top5Champions: result.top5Champions || [],
          };

          this.showRiotModal = false;
        } else {
          alert("라이엇 연동 실패: " + result.message);
        }
      } catch (error) {
        console.error("Error linking Riot account:", error);
        alert("연동 중 오류가 발생했습니다.");
      }
    },
    async checkLoginStatus() {

        try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/check-login`, {
            method: 'GET',
            credentials: 'include', // 쿠키 포함
        });

        if (response.ok) {
            const data = await response.json();
            this.isLoggedIn = data.loggedIn;
            if (data.loggedIn) {
            console.log("받아온 유저 정보:", data.user);
            this.userInfo = data.user || {}; // 사용자 정보를 객체로 저장
            }
        } else {
            this.resetUserData();
        }
        } catch (error) {
        console.error('Error checking login status:', error);
        this.resetUserData();
        }
        },
        resetUserData() {
        this.isLoggedIn = false;
        this.userInfo = {}; // 사용자 정보 초기화
        },
    },
    mounted() {
    this.checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 확인
  },
  };
  </script>
  
  <style scoped>
  /* 전체 스타일 초기화 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
  }
  
  #app {
    width: 100%;
    height: 100%;
    background-color: #212121;
  }
  
  /* 전체 페이지 스타일 */
  .find-password-page {
    background-color: #212121;
    color: #fafafa;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Arial", sans-serif;
    justify-content: start;
  }
  
  /* 헤더 스타일 */
  .header {
    width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #424242;
  height: 50px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #15513775;
  }

  .nav-links {
  display: flex;
  gap: 4px;
  align-items: stretch;
}
  
  .nav-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 80px;
    padding: 0 16px;
    background-color: transparent;
    color: #FAFAFA;
    border-radius: 0;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .nav-button:hover {
    background-color: #212121;
  }
  
  .nav-links a{
    margin-left: 20px;
    color: #FAFAFA;
    text-decoration: none;
    font-size: 10px;
  }
  
  .nav-links a:hover,
  .nav-links router-link:hover {
    text-decoration: underline;
  }
  
  /* 메인 콘텐츠 */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 200vw;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  /* 폼 스타일 */
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .form-input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #555;
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #212121;
    ;
  }
  
  .form-input::placeholder {
    color: #888;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #15513775;
  }
  
  /* 버튼 그룹 */
  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .cancel-button {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    background-color: transparent;
    border: 1px solid #fafafa;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-button:hover {
    background-color: #444;
  }
  
  .submit-button {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    background-color: #15513775;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #15513775;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  