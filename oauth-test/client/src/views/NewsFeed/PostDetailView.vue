<script setup>
// 要先檢查這個人的id是不是這篇貼文的發文者，如果是的話可以觸發編輯，當然也包含刪除
// 不是的話就是一般的顯示
// post details
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { userAuthStore } from '@/stores/user'

// postId 使用路由參數，post Object 使用 props 傳入
const userStore = userAuthStore();
const route = useRoute();

const isAuthor = ref(postId in userStore.userData.postIds ? true : false); // 判斷當前用戶是否為貼文作者
const editMode = ref(false); // 編輯模式開關
const isLiked = ref(postId in userStore.userData.lickedPostIds ? true : false); // 判斷當前用戶是否已經按讚

const postId = route.params.postId;  // 從路由參數中獲取 postId
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// 所有修改都先對 localPost 綁定，確認修改才對父子件 emit
const localPost = Object.assign({}, props.post)

// !!!!
// 這裡的 post 資料應該是從feed那邊傳進來獲取的，應該使用 props
// 這裡先用靜態資料模擬
// const post = reactive({
//   authorName: 'Evian',
//   content: '這是一般貼文的內容，可以包含文字和圖片。',
//   imageUrl: 'https://via.placeholder.com/600x300',
//   createdAt: '2025-07-09 15:30'
// })

const toggleEdit = () => {
  editMode.value = !editMode.value;
}

// 把更新的貼文內容儲存起來
const saveEditedPost = async () => {
  editMode.value = false;

  await axios.post(`/api/posts/update?postId=${postId}`, {
    post: localPost
  })
  .then(() => {
    console.log('貼文更新成功');
    alert('貼文已成功更新');
    editMode.value = false; 
  })
  .catch((err) => {
    console.error(`更新貼文前端錯誤: ${err}`);
    alert('更新貼文失敗，請稍後再試');
  })
}

const likePost = async () => {
  // TODO 
  // 更新貼文的按讚數

  await axios.post(`/api/posts/like?postId=${postId}&userId=${userStore.userData.userId}`)
  .then(() => {
    console.log('貼文按讚成功');
    localPost.likeCount += 1; // 更新本地貼文的按讚數
    isLiked.value = true; 

    // TODO: 更新 pinia (likedPostIds) 的狀態

    alert('謝謝你的喜歡uwu！幫你把貼文存到按讚儲存區囉！');

    // 這裡可以更新 localPost 的 likeCount 或者其他相關資料
  })
  .catch((err) => {
    console.error(`按讚貼文前端錯誤: ${err}`);
    alert('按讚貼文失敗，請稍後再試');
  })
}

// 把跟刪除有關的東西彙整在一起
const deleteHandler = {
  showDeleteConfirm: ref(false),

  isDeleting: ref(false),
  
  confirmDelete: () => {
    deleteHandler.showDeleteConfirm.value = true
  },
  
  cancelDelete: () => {
    deleteHandler.showDeleteConfirm.value = false
  },
  
  deletePost: async (postId) => {
    if (deleteHandler.isDeleting.value) return // 防止重複點擊

    deleteHandler.isDeleting.value = true

    try {
      await axios.delete(`/api/posts/${postId}`)
      .then(() => {
        console.log('貼文刪除成功')
        alert('貼文已成功刪除')

        // 觸發父組件的事件，通知貼文已被刪除
        emit('postDeleted', postId);
      })
      .catch((err) => {
        console.log(`刪除貼文前端錯誤: ${err}`);
      })
    } catch (error) {
      console.error('刪除貼文時發生錯誤:', error)
      alert('刪除失敗，請稍後再試')
    } finally {
      deleteHandler.isDeleting.value = false
      deleteHandler.showDeleteConfirm.value = false
    }
  }
}

// 定義 emit 事件
const emit = defineEmits(['postDeleted', 'postUpdated'])

onMounted(async () => {
  //
})
</script>

<template>
  <div class="post-card">
    <div class="post-header">
      <div class="post-author">{{ post.authorName }}</div>
      <!-- 如果是作者，顯示刪除和編輯 -->
      <div v-if="isAuthor">
        <button
          @click="deleteHandler.confirmDelete"
          class="delete-btn"
          :disabled="deleteHandler.isDeleting"
          title="刪除貼文"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
          </svg>
        </button>
        <!-- 編輯與儲存 -->
        <div v-if="!editMode">
          <button @click="toggleEdit" title="編輯貼文"></button>
        </div>
        <div v-else>
          <button @click="toggleEdit" title="取消編輯"></button>
          <button @click="saveEditedPost" title="儲存編輯"></button>
        </div>
      </div>

      <!-- 按讚功能 -> 這邊要配合 post 的資料庫設計 -->
      <!-- feed（postcardView） 頁面應該也要有按讚功能 -->
      <button @click="likePost" class="like-btn" title="按讚">
        <span>{{ isLiked ? '♡' : "❤" }} {{ localPost.likeCount }}</span>
      </button>
    </div>

    <div class="post-content">{{ post.content }}</div>
    <img v-if="post.imageUrl" :src="post.imageUrl" alt="貼文圖片" class="post-image" />
    <div class="post-timestamp">{{ post.createdAt }}</div>

    <!-- 刪除確認對話框 -->
    <div v-if="deleteHandler.showDeleteConfirm" class="delete-confirm-overlay">
      <div class="delete-confirm-modal">
        <h3>確認刪除</h3>
        <p>確定要刪除這篇貼文嗎？此操作無法復原。</p>
        <div class="modal-actions">
          <button @click="deleteHandler.cancelDelete" class="cancel-btn">取消</button>
          <button
            @click="deleteHandler.deletePost(postId)"
            class="confirm-delete-btn"
            :disabled="isDeleting"
          >
            {{ isDeleting ? '刪除中...' : '確認刪除' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.post-author {
  font-weight: 600;
  color: #2c3e50;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #f8d7da;
}

.delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

/* 刪除確認對話框樣式 */
.delete-confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.delete-confirm-modal {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 400px;
  width: 90%;
}

.delete-confirm-modal h3 {
  margin: 0 0 1rem 0;
  color: #dc3545;
}

.delete-confirm-modal p {
  margin: 0 0 1.5rem 0;
  color: #666;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.cancel-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #6c757d;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #e9ecef;
}

.confirm-delete-btn {
  background: #dc3545;
  border: 1px solid #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-delete-btn:hover {
  background-color: #c82333;
}

.confirm-delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
