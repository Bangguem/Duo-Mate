<template>
    <div class="contents">  <!-- 전체 콘텐츠를 감싸는 컨테이너 -->
        
        <!-- 자주 묻는 질문 섹션 -->
        <section class="contents-item">
            <p class="section-title">자주 묻는 질문</p>
            <div class="search-box">  <!-- 검색창 -->
                <input type="text" placeholder="자주 묻는 질문 검색..." class="search-input">
                <span class="search-icon">🔍</span>  <!-- 검색 아이콘 -->
            </div>
        </section>

        <!-- 1:1 문의 섹션 -->
        <section class="contents-item">
            <p class="section-title">1:1 문의</p>
            <p>내 답변 보기</p>  
        </section>

    </div>
</template>


<style scoped>
.contents {
    width: 80%;  /* 콘텐츠 영역의 너비 설정 */
    max-width: 1260px;  /* 최대 너비 제한 */
    display: flex;
    flex-direction: column;
    align-items: center;  /* 가로 중앙 정렬 */
    background-color: #212121;  /* 배경색 */
    gap: 20px;  /* 요소 간 간격 */
    padding: 40px 20px;  /* 패딩 설정 */
}

.contents-item {
    background-color: #424242;  /* 개별 섹션 배경색 */
    width: 60%;
    max-width: 800px;
    height: 200px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;  /* 세로 중앙 정렬 */
    align-items: center;  /* 가로 중앙 정렬 */
    margin: 0;
    gap: 50px;  /* 내부 요소 간 간격 */
    padding: 20px;
    border-radius: 40px;  /* 모서리 둥글게 */
}

.section-title {
    font-size: 40px;  /* 제목 폰트 크기 */
    font-weight: bold;
    color: white;
}

.search-box {
    display: flex;
    align-items: center;
    background-color: black;
    border-radius: 20px;
    padding: 5px 10px;
    width: 80%;
    max-width: 500px;
}

.search-input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
}

.search-icon {
    color: gray;
    cursor: pointer;
}

</style>