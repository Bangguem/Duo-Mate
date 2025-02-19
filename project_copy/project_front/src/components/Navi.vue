<template>
    <nav class="nav-container">  <!-- 내비게이션 바 컨테이너 -->
        <div class="nav-title">  <!-- 내비게이션 타이틀 영역 -->
            <img src="@/assets/icon_game.png" alt="게임 아이콘" class="w-6 h-6" />
            <h1>{{ pageTitle }}</h1>  <!-- 현재 페이지 제목 -->
        </div>
        <div class="nav-components">  <!-- 내비게이션 메뉴 -->
            <router-link to="/notices">공지사항</router-link>
            <router-link to="/patch-notes">패치노트</router-link>
            <router-link to="/updates">업데이트</router-link>
            <router-link to="/inquiries">문의내역</router-link>
            
            <!-- 공지사항 페이지에서만 검색창 표시 -->
            <div v-if="route.path == '/notices'" class="search-box">
                <input type="text" placeholder="공지사항 검색..." class="search-input">
                <span class="search-icon">🔍</span>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 현재 경로에 따라 내비게이션 제목 변경
const pageTitle = computed(() => {
    switch (route.path) {
        case "/notices":
            return "공지사항";
        case "/patch-notes":
            return "패치노트";
        case "/updates":
            return "업데이트";
        case "/inquiries":
            return "문의내역";
        default:
            return "공지사항";  // 기본값
    }
});
</script>

<style scoped>

nav a {
  text-decoration: none;  /* 밑줄 제거 */
  color: hsla(160, 100%, 37%, 1);  /* 기본 글자색 */
  transition: 0.4s;
  padding: 3px;
}

/* 현재 활성화된 페이지 스타일 */
nav a.router-link-exact-active {
    color: #42b983;
}

/* 마우스 호버 시 스타일 */
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    border-radius: 0.8rem;
  }
}

/* 내비게이션 컨테이너 */
.nav-container {
    @apply w-full bg-[#424242] text-white p-4 flex items-center justify-between;
}

/* 내비게이션 타이틀 */
.nav-title {
    @apply flex gap-6 text-lg font-bold items-center;
}

/* 내비게이션 메뉴 */
.nav-components {
    @apply flex items-center justify-between gap-6 font-bold;
}

/* 검색창 스타일 */
.search-box {
    display: flex;
    align-items: center;
    background-color: #424242;
    border-radius: 20px;
    border: 0.5px solid gray;
    padding: 5px 10px;
}

.search-input {
    background: none;
    border: none;
    color: white;
    outline: none;
}

.search-icon {
    color: gray;
    cursor: pointer;
}

</style>