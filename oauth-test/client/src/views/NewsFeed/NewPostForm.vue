<script setup>
// 如果使用者選擇要發布「一般」的貼文，進入這邊
// 例如一些活動回顧等等

import { reactive } from 'vue';
import { userAuthStore } from '@/stores/user';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userStore = userAuthStore();
const router = useRouter();

// const content = ref('');
// const image = ref(null);

const postContent = reactive({
  userId: userStore.userId,
  userEmail: userStore.userData.email,
  caption: "",
  likeCount: 0
})

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) postContent.coverImageFile.value = file;
}

// 把發布的貼文存回資料庫
const submit = async () => {
  await axios.post("/api/posts/create", {
    content: postContent
  })
  .then(() => {
    alert("貼文發布成功！");
    router.push("/"); // 回到首頁
  })
  .catch((err) => {
    console.log(`前端新增貼文submit error: ${err}`);
  })
}
</script>

<template>
  <div class="new-post-form">
    <h2 class="form-title">✍️ 發布新貼文</h2>
    <form @submit.prevent>

      <textarea
        v-model="postContent.caption"
        placeholder="說點什麼吧..."
        class="post-textarea"
        rows="4"
      ></textarea>

      <input type="file" @change="handleImageUpload" class="file-input" />
      <button type="submit" class="submit-btn" @click="submit">發布</button>
    </form>
  </div>
</template>

<style scoped>
.new-post-form {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.post-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 1rem;
}

.file-input {
  margin-bottom: 1rem;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #369f6c;
}
</style>
