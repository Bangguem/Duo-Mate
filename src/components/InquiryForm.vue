<template>
  <div id="app">
    <div class="inquiry-form">
      <h2>문의 등록</h2>
      <form @submit.prevent="submitInquiry">
        <div>
          <label for="title">제목</label>
          <input v-model="title" id="title" required />
        </div>
        <div>
          <label for="content">내용</label>
          <textarea v-model="content" id="content" rows="6" required></textarea>
        </div>
        <div class="form-buttons">
          <button type="submit" class="submit-btn">등록</button>
          <button type="button" @click="cancel" class="cancel-btn">취소</button>
        </div>
      </form>

      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InquiryForm',
  data() {
    return {
      title: '',
      content: '',
      message: '',
    };
  },
  methods: {
    async submitInquiry() {
      try {
        await axios.post(
          `${process.env.VUE_APP_API_URL}/api/inquiries`,
          {
            title: this.title,
            content: this.content,
          },
          { withCredentials: true }
        );
        this.message = '문의가 성공적으로 등록되었습니다!';
        this.title = '';
        this.content = '';
        this.$router.push('/inquiries');
      } catch (error) {
        console.error('문의 등록 실패:', error);
        this.message = '문의 등록 중 오류가 발생했습니다.';
      }
    },
    cancel() {
      this.$router.push('/inquiries');
    }
  },
};
</script>

<style scoped>
/* 화면 전체 배경 & 중앙 정렬 */
#app {
  display: flex;
  justify-content: center;   /* 가로 중앙 */
  align-items: center;       /* 세로 중앙 */
  width: 100%;
  min-height: 100vh;
  background-color: rgb(33, 33, 33);
}

/* 카드 디자인 */
.inquiry-form {
  background: #333;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  color: white;
}

label {
  display: block;
  margin-top: 1rem;
  color: white;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 0.5rem;
  background: #222;
  border: none;
  border-radius: 8px;
  color: white;
}

textarea {
  min-height: 120px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1rem;
}

.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-btn:hover {
  background: #36a372;
}

.cancel-btn {
  background: gray;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.cancel-btn:hover {
  background: #555;
}

.message {
  margin-top: 1rem;
  color: #42b983;
}
</style>