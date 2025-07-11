<script setup>
// 如果使用者選擇要發布「活動資訊」的貼文，進入這邊
// 這邊可以一鍵報名

import { ref, reactive } from 'vue';
import { userAuthStore } from '@/stores/user';

const userStore = userAuthStore();

// const content = ref('');
// const image = ref(null);

const eventContent = reactive({
  userId: "",
  userEmail: userStore.userData.email,
  title: "",
  caption: "",
  registerLink: "",
  agendaLink: "",
  coverImageFile: "",
  likeCount: 0
})

const event = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  registerLink: '',
  coverImageFile: null,
});

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    event.value.coverImageFile = file;
  }
}
</script>

<template>
  <div class="new-event-form">
    <h2 class="form-title">📢 發布 Toastmasters 活動貼文</h2>

    <form @submit.prevent>
      <!-- 活動標題 -->
      <div class="form-group">
        <label for="title">活動標題 *</label>
        <input id="title" v-model="event.title" type="text" placeholder="例如：NTUST x CTBC 聯合例會" required />
      </div>

      <!-- 活動說明文字 -->
      <div class="form-group">
        <label for="description">活動介紹文字 *</label>
        <textarea
          id="description"
          v-model="event.description"
          rows="4"
          placeholder="簡單說明活動內容、對象與特色"
          required
        ></textarea>
      </div>

      <!-- 活動日期時間 -->
      <div class="form-group">
        <label for="date">活動時間 *</label>
        <input id="date" v-model="event.date" type="datetime-local" required />
      </div>

      <!-- 活動地點 -->
      <div class="form-group">
        <label for="location">地點 *</label>
        <input id="location" v-model="event.location" type="text" placeholder="例如：CTBC 總部 6 樓 A 會議室" required />
      </div>

      <!-- 報名連結 -->
      <div class="form-group">
        <label for="registerLink">報名連結 *</label>
        <input
          id="registerLink"
          v-model="event.registerLink"
          type="url"
          placeholder="https://forms.gle/..."
          required
        />
      </div>

      <!-- 活動封面圖 -->
      <div class="form-group">
        <label for="coverImage">上傳封面圖片</label>
        <input id="coverImage" type="file" accept="image/*" @change="handleImageUpload" />
      </div>

      <!-- 發布按鈕 -->
      <button type="submit" class="submit-btn">✅ 發布活動</button>
    </form>
  </div>
</template>

<style scoped>
.new-event-form {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

input[type='text'],
input[type='url'],
input[type='datetime-local'],
textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

input[type='file'] {
  margin-top: 0.5rem;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #369f6c;
}
</style>
