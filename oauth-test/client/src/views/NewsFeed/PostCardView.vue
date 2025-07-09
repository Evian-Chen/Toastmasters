<script setup>
// 如果使用者選擇要發布「一般」的貼文，進入這邊
// 例如一些活動回顧等等

import { reactive } from 'vue'

const post = reactive({
  authorName: 'Evian',
  content: '這是一般貼文的內容，可以包含文字和圖片。',
  imageUrl: 'https://via.placeholder.com/600x300',
  createdAt: '2025-07-09 15:30'
})
</script>

<template>
  <div class="post-card">
    <div class="post-author">{{ post.authorName }}</div>
    <div class="post-content">{{ post.content }}</div>
    <img v-if="post.imageUrl" :src="post.imageUrl" alt="貼文圖片" class="post-image" />
    <div class="post-timestamp">{{ post.createdAt }}</div>
  </div>
</template>

<style scoped>
.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.post-author {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.post-content {
  font-size: 16px;
  margin-bottom: 0.5rem;
}

.post-image {
  max-width: 100%;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.post-timestamp {
  font-size: 12px;
  color: #888;
  text-align: right;
}
</style>
