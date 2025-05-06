<template>
  <div id="app">
    <div class="inquiry-detail" v-if="inquiry">
      <h2>{{ inquiry.title }}</h2>
      <p><strong>작성자:</strong> {{ inquiry.name }}</p>
      <p><strong>작성일:</strong> {{ formatDate(inquiry.createdAt) }}</p>
      <p><strong>내용:</strong></p>
      <p class="preserve-newlines">{{ inquiry.content }}</p>

      <div v-if="inquiry.answer">
        <hr />
        <h3>💬 관리자 답변</h3>
        <p class="preserve-newlines">{{ inquiry.answer }}</p>
      </div>

      <div v-else-if="isAdmin">
        <hr />
        <h3>🛠 답변 작성</h3>
        <textarea v-model="answer" rows="5" style="width: 100%;"></textarea>
        <button @click="submitAnswer">답변 등록</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InquiryDetail',
  props: ['id'],
  data() {
    return {
      inquiry: null,
      answer: '',
      user: null,
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.userid === 'Admin';
    },
  },
  async created() {
    await this.fetchUser();
    await this.fetchInquiry();
  },
  methods: {
    async fetchUser() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/auth/check-login`, {
          withCredentials: true,
        });
        this.user = res.data.user;
      } catch (error) {
        console.error('유저 정보 불러오기 실패:', error);
      }
    },
    async fetchInquiry() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/api/inquiries/${this.id}`, {
          withCredentials: true,
        });
        this.inquiry = res.data.inquiry;
      } catch (error) {
        console.error('문의 불러오기 실패:', error);
      }
    },
    async submitAnswer() {
      try {
        await axios.put(
          `${process.env.VUE_APP_API_URL}/api/inquiries/${this.id}/answer`,
          { answer: this.answer },
          { withCredentials: true }
        );
        this.inquiry.answer = this.answer;
        this.inquiry.status = 'answered';
        this.answer = '';
        alert('답변이 등록되었습니다!');
      } catch (error) {
        console.error('답변 등록 실패:', error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;   /* 가로 중앙 */
  align-items: center;       /* 세로 중앙 */
  width: 100%;
  min-height: 100vh;
  background-color: rgb(33, 33, 33);
}
.preserve-newlines {
  white-space: pre-wrap;
}

.inquiry-detail {
  background: #333;                              /* 카드 배경 */
  padding: 24px;                                 /* 내부 여백 */
  border-radius: 12px;                           /* 둥근 모서리 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);      /* 그림자 */
  max-width: 700px;                              /* 너비 제한 */
  width: 100%;                                   /* 반응형 */
  color: white;                                  /* 텍스트 흰색 */
}

textarea {
  width: 100%;
  padding: 10px;
  background: #444;                              /* 짙은 배경 */
  border: none;
  border-radius: 6px;
  color: white;
  margin-bottom: 16px;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: #36a372;
}
</style>