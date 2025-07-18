<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { userAuthStore } from '@/stores/user'

const userStore = userAuthStore();

const props = defineProps({
  postId: {  // 貼文的編號
    type: [String, Number],
    required: true
  }
})

// 如果不用mock data:
// const props = defineProps({
//   postId: {  // 貼文的編號
//     type: [String, Number],
//     required: true
//   }, 
//   post: {  // 貼文的內容
//     type: Object,
//     required: true
//   }
// })

// !!
// 這邊也要按讚邏輯！！！！！
const likePost = async () => {
  // TODO 
  // 更新貼文的按讚數

  await axios.post(`/api/posts/like?postId=${props.postId}&userId=${userStore.userData.userId}`)
  .then(() => {
    console.log('貼文按讚成功');
    alert('謝謝你的喜歡uwu！幫你把貼文存到按讚儲存區囉！');

    // 這裡可以更新 localPost 的 likeCount 或者其他相關資料
  })
  .catch((err) => {
    console.error(`按讚貼文前端錯誤: ${err}`);
    alert('按讚貼文失敗，請稍後再試');
  })
}

const post = reactive({
  postId: 'abc123',
  userId: 'user789',
  userEmail: 'user@example.com',
  caption: '這是一則測試貼文內容',
  likeCount: 3,
  likedBy: ['user123', 'user456', 'user999'],
  type: 'post',
  createdAt: '2025-07-17T10:23:00Z',
  updatedAt: '2025-07-18T08:45:00Z'
})

</script>

<template>
  <div class="post-card">
    <!-- 貼文標題區塊 -->
    <div class="post-header">
      <div class="post-author">{{ post.userEmail }}</div>
    </div>

    <!-- 貼文內容 -->
    <div class="post-content">
      {{ post.caption }}
    </div>

    <!-- 按讚數 -->
    <!-- TODO: 之後可以做，點擊之後顯示按讚的人有誰 -->
    <div>
      ❤ {{ post.likeCount }} 人說讚
    </div>

    <button @click="likePost">按讚</button>

    <!-- 貼文時間 -->
    <div class="post-timestamp">
      建立時間：{{ post.createdAt }}<br />
      更新時間：{{ post.updatedAt }}
    </div>

  </div>
</template>

<style scoped>
.post-card {
  background-color: #fafafa;
  border-left: 6px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  max-width: 800px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
}

/* 貼文標題區塊 */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

/* 作者資訊 */
.post-author {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

/* 貼文內容文字 */
.post-content {
  font-size: 16px;
  color: #000;
  margin-bottom: 0.75rem;
  white-space: pre-wrap;
}

/* 按讚數 */
.post-card > div:nth-child(3) {
  font-size: 14px;
  color: #000000;
  margin-bottom: 0.75rem;
}

/* 時間資訊 */
.post-timestamp {
  font-size: 12px;
  color: #999;
  text-align: right;
}

/* 動畫效果（可選） */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-card {
  animation: fadeInUp 0.5s ease-out;
}
</style>

