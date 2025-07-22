<script setup>
import { onActivated, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import PostCardView from './PostCardView.vue';
import EventCardView from './EventCardView.vue';
import axios from 'axios'

// 資料格式必須再次檢查資料庫的資料格式，避免顯示錯誤或找不到

const posts = ref([
  {
    _id: '1',
    type: 'event',
    eventDetails: {
      title: 'NTUST 聯合例會',
      date: '2025-08-10 19:00',
      location: '南港經貿中心',
      registerLink: 'https://forms.gle/example1',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '2',
    type: 'normal',
    authorName: 'Alice',
    content: '昨天參加了一場超棒的演講比賽，收穫良多！',
    imageUrl: 'https://via.placeholder.com/600x300',
    createdAt: '2025-07-08 15:10'
  },
  {
    _id: '3',
    type: 'event',
    eventDetails: {
      title: 'CTBC 說故事工作坊',
      date: '2025-08-15 19:30',
      location: '信義區 CTBC 總部',
      registerLink: 'https://forms.gle/example2',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '4',
    type: 'normal',
    authorName: 'Brian',
    content: '誰說 Toastmasters 只能練英文？我們也能玩創意！',
    imageUrl: '',
    createdAt: '2025-07-09 11:00'
  },
  {
    _id: '5',
    type: 'event',
    eventDetails: {
      title: '新竹雙語演講交流會',
      date: '2025-08-20 18:30',
      location: '新竹市文化中心',
      registerLink: 'https://forms.gle/example3',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '6',
    type: 'normal',
    authorName: 'Chloe',
    content: '今天分享了我第一篇 Pathways 演講！超緊張但完成了～',
    imageUrl: '',
    createdAt: '2025-07-08 19:10'
  },
  {
    _id: '7',
    type: 'event',
    eventDetails: {
      title: 'TM 嘉義茶會例會',
      date: '2025-08-18 14:00',
      location: '嘉義公園管理處',
      registerLink: 'https://forms.gle/example4',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '8',
    type: 'normal',
    authorName: 'Daniel',
    content: '感謝 mentor 一直支持我，每一次演講都進步一點點 ✨',
    imageUrl: '',
    createdAt: '2025-07-06 10:50'
  },
  {
    _id: '9',
    type: 'event',
    eventDetails: {
      title: 'Toastmasters 新人訓練',
      date: '2025-08-25 10:00',
      location: '線上 Zoom 會議室',
      registerLink: 'https://forms.gle/example5',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '10',
    type: 'normal',
    authorName: 'Emma',
    content: '分享一句最喜歡的演講結尾：「If not now, then when?」',
    imageUrl: '',
    createdAt: '2025-07-07 22:00'
  }
])

// 包含 post, event 的所有資料
const feeds = ref([
  {
    _id: '1',
    type: 'event',
    eventDetails: {
      title: 'NTUST 聯合例會',
      date: '2025-08-10 19:00',
      location: '南港經貿中心',
      registerLink: 'https://forms.gle/example1',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '2',
    type: 'post',
    authorName: 'Alice',
    content: '昨天參加了一場超棒的演講比賽，收穫良多！',
    imageUrl: 'https://via.placeholder.com/600x300',
    createdAt: '2025-07-08 15:10'
  },
  {
    _id: '3',
    type: 'event',
    eventDetails: {
      title: 'CTBC 說故事工作坊',
      date: '2025-08-15 19:30',
      location: '信義區 CTBC 總部',
      registerLink: 'https://forms.gle/example2',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '4',
    type: 'post',
    authorName: 'Brian',
    content: '誰說 Toastmasters 只能練英文？我們也能玩創意！',
    imageUrl: '',
    createdAt: '2025-07-09 11:00'
  },
  {
    _id: '5',
    type: 'event',
    eventDetails: {
      title: '新竹雙語演講交流會',
      date: '2025-08-20 18:30',
      location: '新竹市文化中心',
      registerLink: 'https://forms.gle/example3',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '6',
    type: 'post',
    authorName: 'Chloe',
    content: '今天分享了我第一篇 Pathways 演講！超緊張但完成了～',
    imageUrl: '',
    createdAt: '2025-07-08 19:10'
  },
  {
    _id: '7',
    type: 'event',
    eventDetails: {
      title: 'TM 嘉義茶會例會',
      date: '2025-08-18 14:00',
      location: '嘉義公園管理處',
      registerLink: 'https://forms.gle/example4',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '8',
    type: 'post',
    authorName: 'Daniel',
    content: '感謝 mentor 一直支持我，每一次演講都進步一點點 ✨',
    imageUrl: '',
    createdAt: '2025-07-06 10:50'
  },
  {
    _id: '9',
    type: 'event',
    eventDetails: {
      title: 'Toastmasters 新人訓練',
      date: '2025-08-25 10:00',
      location: '線上 Zoom 會議室',
      registerLink: 'https://forms.gle/example5',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: '10',
    type: 'post',
    authorName: 'Emma',
    content: '分享一句最喜歡的演講結尾：「If not now, then when?」',
    imageUrl: '',
    createdAt: '2025-07-07 22:00'
  }
]);
const router = useRouter();

const showOptions = ref(false);

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}

// 建立一般貼文
const createNormalPost = () => {
  showOptions.value = false
  console.log("create normal post");
  alert('📝 準備新增一般貼文...')
  router.push("/newPost");
}

// 建立活動貼文
const createEventPost = () => {
  showOptions.value = false
  console.log("create new event");
  alert('📅 準備新增活動貼文...')
  router.push("/newEvent");
}

const feedLimit = ref(3); // 限制載入的貼文數量
const loadingFeeds = ref(false);

// TODO 檢查載入的資料都是對的，limit先限制三筆
// 之後也可以改說讓使用者選擇一次要看多少筆
// post, event 都需要進來
const loadFeeds = async () => {
  try {
    loadingFeeds.value = true;
    await axios.get(`/api/feeds?limit=${feedLimit.value}`)
      .then((res) => {
        console.log('載入貼文成功', res.data.allFeed);
        feeds.value = res.data.allFeed;
      })
      .catch((err) => {
      console.error(`載入貼文前端錯誤: ${err}`);
    });
  } catch (error) {
    console.error('載入貼文時發生錯誤:', error);
  } finally {
    loadingFeeds.value = false;
  }
}

const goToDetail = (postId) => {
  // 進入到詳細資訊的頁面
  console.log(`前往貼文 ${postId} 的詳細內容`);
  router.push(`/post/${postId}`);
}

// 處理貼文刪除事件
const handlePostDeleted = (postId) => {
  // 從 feeds 中移除被刪除的貼文
  feeds.value = feeds.value.filter(feed => feed._id !== postId);
  console.log(`貼文 ${postId} 已從列表中移除`);
}

// 處理貼文更新事件
const handlePostUpdated = (updatedPost) => {
  // 找到對應的貼文並更新
  const index = feeds.value.findIndex(feed => feed._id === updatedPost._id);
  if (index !== -1) {
    feeds.value[index] = { ...feeds.value[index], ...updatedPost };
    console.log(`貼文 ${updatedPost._id} 已更新`);
  }
}

// 第一次掛載時，請求後端載入
onMounted(() => {
  loadFeeds();
})

// 透過pinia store檢查，是否需要refresh post
onActivated(() => {
  //
})
</script>

<template>
  <div class="post-feed">
    <h2 class="feed-title">🎯 Toastmasters 最新貼文</h2>

    <div v-if="posts.length === 0" class="empty-msg">目前尚無貼文。</div>

    <!-- 貼文顯示處 -->
    <!-- 使用keepalive保存上一次進來的post內容，避免多次請求 -->
    <keep-alive>
      <div v-for="(feed, index) in feeds" :key="index" class="post-wrapper">
        <div v-if="feed.type === 'post'">
          <PostCardView 
            :post="feed"
            @click="goToDetail(feed._id)"
            @postDeleted="handlePostDeleted"
            @postUpdated="handlePostUpdated"
          />
        </div>
        <div v-else-if="feed.type === 'event'">
          <EventCardView 
            :event="feed"
          />
        </div>
      </div>
    </keep-alive>


    <!-- 新增按鈕 + 選項 -->
    <div class="fab-container">
      <transition name="fade">
        <div v-if="showOptions" class="fab-options">
          <button class="fab-option" @click="createNormalPost">📝 新增一般貼文</button>
          <button class="fab-option" @click="createEventPost">📅 新增活動貼文</button>
        </div>
      </transition>

      <button class="fab-main" @click="toggleOptions">
        {{ showOptions ? '✖️' : '➕' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.post-feed {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.feed-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #42b983;
  text-align: center;
}

.empty-msg {
  text-align: center;
  color: #000000;
  margin-top: 2rem;
}

.post-wrapper {
  margin-bottom: 2rem;
}

/* 共用卡片樣式 */
.card {
  color: #000000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* 活動卡片背景 */
.event-card {
  border-left: 6px solid #42b983;
  background-color: #f0fdf4;
}

/* 一般卡片背景 */
.normal-card {
  border-left: 6px solid #ccc;
  background-color: #fafafa;
}

.card-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.card-sub {
  font-size: 14px;
  color: #000000;
  margin-bottom: 0.5rem;
}

.card-author {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-content {
  font-size: 16px;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

.card-time {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.card-link {
  display: inline-block;
  margin-top: 0.5rem;
  text-decoration: none;
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  margin: 0.2rem;
}

.card-link:hover {
  background-color: #369f6c;
}

.label {
  padding: 0.3rem 0.75rem;
  background-color: #42b983;
  color: white;
  font-size: 12px;
  font-weight: bold;
  align-self: flex-start;
  border-bottom-right-radius: 8px;
}

.label.gray {
  background-color: #bbb;
}

/* FAB 主按鈕 */
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  /* 提高到最上層 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fab-main {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 24px;
  /* 從 20px 增加到 24px */
  border: none;
  border-radius: 50%;
  width: 72px;
  /* 從 64px 增加到 72px */
  height: 72px;
  /* 從 64px 增加到 72px */
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-main:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.fab-main:active {
  transform: scale(0.95);
}

/* 主按鈕圖標 */
.fab-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-icon.rotated {
  transform: rotate(45deg);
}

/* 選項圖標 */
.fab-option-icon {
  margin-right: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
}

/* 遮罩背景 */
.fab-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fab-overlay.active {
  pointer-events: all;
  opacity: 1;
}

/* 子選項容器 */
.fab-options {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.fab-option {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #333;
  padding: 14px 24px;
  /* 從 12px 20px 增加到 14px 24px */
  margin-bottom: 12px;
  border-radius: 28px;
  border: none;
  font-size: 15px;
  /* 從 14px 增加到 15px */
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 200px;
  /* 從 180px 增加到 200px */
  text-align: left;
  display: flex;
  align-items: center;
}

.fab-option:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateX(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.fab-option:active {
  transform: translateX(-2px) scale(0.98);
}

/* 選項圖標 */
.fab-option-icon {
  margin-right: 12px;
  font-size: 18px;
  display: flex;
  align-items: center;
}

/* 漣漪效果 */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 改進的動畫 */
.option-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.option-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.option-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.option-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 錯開動畫 */
.fab-option:nth-child(1) {
  transition-delay: 0.1s;
}

.fab-option:nth-child(2) {
  transition-delay: 0.2s;
}

/* 遮罩背景 */
.fab-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fab-overlay.active {
  pointer-events: all;
  opacity: 1;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .fab-container {
    bottom: 20px;
    right: 20px;
  }

  .fab-main {
    width: 64px;
    /* 手機上從 56px 增加到 64px */
    height: 64px;
    /* 手機上從 56px 增加到 64px */
    font-size: 20px;
    /* 手機上從 18px 增加到 20px */
  }

  .fab-option {
    padding: 12px 18px;
    /* 手機上從 10px 16px 增加到 12px 18px */
    min-width: 180px;
    /* 手機上從 160px 增加到 180px */
    font-size: 14px;
    /* 手機上保持 14px */
  }

  .card-title {
    font-size: 18px;
  }

  .feed-title {
    font-size: 20px;
  }

  .card-link {
    font-size: 14px;
    padding: 0.4rem 0.8rem;
  }
}

/* 文字動畫 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.demo-text {
  animation: fadeInUp 0.8s ease-out;
}
</style>
