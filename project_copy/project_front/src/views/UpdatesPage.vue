<template>
    <div class="contents">  <!-- 전체 콘텐츠 컨테이너 -->

        <!-- 필터 및 검색 기능을 포함한 헤더 섹션 -->
        <section class="contents-header">
            <div class="header-left">
                <button class="filter-button">최신순</button>  <!-- 최신순 정렬 버튼 -->
                <button class="filter-button">인기순</button>  <!-- 인기순 정렬 버튼 -->
            </div>
            <div class="header-right">
                <div class="search-box">  <!-- 검색창 -->
                    <input type="text" placeholder="검색" class="search-input">
                    <span class="search-icon">🔍</span>  <!-- 검색 아이콘 -->
                </div>
            </div>
        </section>

        <!-- 업데이트 공지 리스트 -->
        <section class="patch-list">
            <div class="patch-item" v-for="(patch, index) in patches" :key="index">
                <img src="@/assets/icon_setting.png" alt="업데이트 아이콘" class="update-icon" />
                <div class="patch-info">
                    <p class="patch-title">{{ patch.month }} 월 {{ patch.day }}일 업데이트 공지</p>
                    <p class="patch-date">{{ patch.date }}</p>
                </div>
            </div>
        </section>

    </div>
</template>


<script>
export default {
    data() {
        return {
            // 업데이트 공지 데이터
            patches: [
                { month: '1',  day: '14', date: '3일 전' },
                { month: '1',  day: '1',  date: '2주 전' },
                { month: '12', day: '17', date: '1달 전' },
                { month: '11', day: '3',  date: '2달 전' },
                { month: '10', day: '9',  date: '3달 전' },
            ]
        };
    }
};
</script>


<style scoped>

.contents {
    width: 100%;  /* 전체 콘텐츠의 최대 너비 설정 */
    max-width: 1260px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 50px;
    border-radius: 0.5rem;
}

.contents-header {
    display: flex;
    justify-content: space-between;  /* 좌우 정렬 */
    align-items: center;
    background-color: #424242;
    padding: 15px;
    border-radius: 10px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.update-icon {
    width: 40px;
    height: 40px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-button {
    background-color: #333;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-box {
    display: flex;
    align-items: center;
    background-color: black;
    border-radius: 20px;
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

.patch-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.patch-item {
    display: flex;
    align-items: center;
    background-color: #333;
    padding: 15px;
    border-radius: 8px;
    gap: 15px;
}

.patch-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: white;
}

.patch-title {
    font-size: 16px;
    font-weight: bold;
}

.patch-date {
    font-size: 14px;
    color: gray;
}
</style>
