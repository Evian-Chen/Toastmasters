<script setup>
// 如果使用者選擇要發布「一般」的貼文，進入這邊
// 例如一些活動回顧等等

import { reactive, ref } from 'vue'
import axios from 'axios'

// 假設你需要傳入 postId 作為 props
const props = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
})

const post = reactive({
  authorName: 'Evian',
  content: '這是一般貼文的內容，可以包含文字和圖片。',
  imageUrl: 'https://via.placeholder.com/600x300',
  createdAt: '2025-07-09 15:30'
})

// 控制刪除確認對話框的顯示
const showDeleteConfirm = ref(false)
// 控制刪除狀態
const isDeleting = ref(false)

// 刪除貼文的函數
const deletePost = async () => {
  if (isDeleting.value) return // 防止重複點擊

  isDeleting.value = true

  try {
    await axios.delete("/api/posts/delete", {
      //
    })
    .then((res) => {
      //
    })
    .catch((err) => {
      console.log(`刪除貼文前端錯誤: ${err}`);
    })
  } catch (error) {
    console.error('刪除貼文時發生錯誤:', error)
    alert('刪除失敗，請稍後再試')
  } finally {
    isDeleting.value = false
    showDeleteConfirm.value = false
  }
}

// 顯示刪除確認對話框
const confirmDelete = () => {
  showDeleteConfirm.value = true
}

// 取消刪除
const cancelDelete = () => {
  showDeleteConfirm.value = false
}

// 定義 emit 事件
const emit = defineEmits(['postDeleted'])
</script>

<template>
  <div class="post-card">
    <div class="post-header">
      <div class="post-author">{{ post.authorName }}</div>
      <button
        @click="confirmDelete"
        class="delete-btn"
        :disabled="isDeleting"
        title="刪除貼文"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
        </svg>
      </button>
    </div>

    <div class="post-content">{{ post.content }}</div>
    <img v-if="post.imageUrl" :src="post.imageUrl" alt="貼文圖片" class="post-image" />
    <div class="post-timestamp">{{ post.createdAt }}</div>

    <!-- 刪除確認對話框 -->
    <div v-if="showDeleteConfirm" class="delete-confirm-overlay">
      <div class="delete-confirm-modal">
        <h3>確認刪除</h3>
        <p>確定要刪除這篇貼文嗎？此操作無法復原。</p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="cancel-btn">取消</button>
          <button
            @click="deletePost"
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
