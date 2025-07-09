<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    _id: 'event-1',
    type: 'event',
    eventDetails: {
      title: 'NTUST x CTBC 聯合例會',
      date: '2025-08-15 19:00',
      location: 'CTBC 總部 6樓 A會議室',
      registerLink: 'https://forms.gle/sample',
      coverImageUrl: 'https://via.placeholder.com/800x300'
    }
  },
  {
    _id: 'normal-1',
    type: 'normal',
    authorName: 'Evian',
    content: '這是一篇一般貼文，可以自由分享想法！',
    imageUrl: 'https://via.placeholder.com/600x300',
    createdAt: '2025-07-09 15:30'
  }
])
</script>

<template>
  <div class="post-feed">
    <h2 class="feed-title">📰 Toastmasters 最新貼文</h2>

    <div v-for="post in posts" :key="post._id" class="post-wrapper">
      <div v-if="post.type === 'event'" class="mock-card event">
        <img :src="post.eventDetails.coverImageUrl" alt="封面圖" class="mock-img" />
        <h3>{{ post.eventDetails.title }}</h3>
        <p>{{ post.eventDetails.date }} - {{ post.eventDetails.location }}</p>
        <a :href="post.eventDetails.registerLink" target="_blank">前往報名</a>
      </div>

      <div v-else class="mock-card normal">
        <p class="author">{{ post.authorName }}</p>
        <p class="content">{{ post.content }}</p>
        <img v-if="post.imageUrl" :src="post.imageUrl" alt="貼文圖片" class="mock-img" />
        <p class="timestamp">{{ post.createdAt }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-feed {
  max-width: 800px;
  margin: 0 auto;
}

.feed-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.post-wrapper {
  margin-bottom: 2rem;
}

.mock-card {
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.mock-card.event {
  border-left: 6px solid #42b983;
  background-color: #f0fdf4;
}

.mock-card.normal {
  border-left: 6px solid #ccc;
}

.mock-img {
  width: 100%;
  border-radius: 6px;
  margin-top: 0.5rem;
}

.author {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.timestamp {
  font-size: 12px;
  color: #888;
  text-align: right;
}
</style>
