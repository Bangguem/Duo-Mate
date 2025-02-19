import './assets/base.css'  // 전역 CSS 파일 불러오기 (전체 스타일 적용)

import { createApp } from 'vue'  // Vue 애플리케이션을 생성하는 함수 가져오기
import App from './App.vue'  // 최상위 컴포넌트(App.vue) 불러오기
import router from './router/index.js';  // Vue Router 설정 파일 불러오기

const app = createApp(App);  // Vue 애플리케이션 인스턴스 생성
app.use(router);  // 라우터 사용 (페이지 간 네비게이션 활성화)
app.mount('#app');  // 애플리케이션을 index.html의 `#app` 요소에 마운트 (렌더링 시작)
