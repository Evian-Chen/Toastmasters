<script setup>
import { reactive } from 'vue'

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

const post = reactive({
  authorName: 'Evian',
  content: '這是一般貼文的內容，可以包含文字和圖片。',
  imageUrl: 'https://via.placeholder.com/600x300',
  createdAt: '2025-07-09 15:30'
})

</script>

<template>
  post card view {{ props.postId }}
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
