<template>
    <div id="app">  <!-- 애플리케이션의 최상위 컨테이너 -->
        <Navi :currentRoute="$route.path" />  <!-- 네비게이션 바 컴포넌트, 현재 라우트 경로를 전달 -->
        <div class="contents-wrapper">  <!-- 페이지 콘텐츠를 감싸는 컨테이너 -->
            <router-view />  <!-- 현재 라우트에 맞는 페이지 컴포넌트가 여기에 렌더링됨 -->
        </div>
    </div>
</template>

<script>
import Navi from './components/Navi.vue';  // 네비게이션 바 컴포넌트 불러오기

export default {
  name: "App",  // 최상위 Vue 컴포넌트
  components: {
      Navi,  // Navi 컴포넌트를 등록
  }
};
</script>
  
<style>
#app {
  width: 100%;  /* 전체 화면 너비 사용 */
  height: 100vh;  /* 전체 화면 높이 사용 */
  display: flex;  /* flexbox 사용 */
  flex-direction: column;  /* 세로 방향 배치 */
  margin: 0;
  padding: 0;
  font-weight: normal;
}

.contents-wrapper {
    flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
    width: 100%;
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    padding: 0 20px;  /* 좌우 여백 추가 */
    background: #212121;  /* 배경색 설정 */
}

</style>
