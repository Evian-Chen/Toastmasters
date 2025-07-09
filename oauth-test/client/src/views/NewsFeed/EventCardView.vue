<script setup>
import { reactive } from 'vue'

const event = reactive({
  title: 'NTUST x CTBC 聯合例會',
  date: '2025-08-15 19:00',
  location: 'CTBC 總部 6樓 A會議室',
  registerLink: 'https://forms.gle/sample',
  coverImageUrl: 'https://via.placeholder.com/800x300'
})
</script>

<template>
  <div class="event-post-card">
    <img :src="event.coverImageUrl" class="cover-image" alt="活動封面圖" />
    <div class="event-info">
      <h3 class="event-title">{{ event.title }}</h3>
      <p class="event-date">{{ event.date }}</p>
      <p class="event-location">{{ event.location }}</p>
      <a :href="event.registerLink" target="_blank" class="register-btn">立即報名 🔗</a>
    </div>
  </div>
</template>

<style scoped>
.event-post-card {
  border: 2px solid #42b983;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f0fdf4;
}

.cover-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-info {
  padding: 1rem;
}

.event-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.event-date,
.event-location {
  font-size: 14px;
  color: #555;
}

.register-btn {
  display: inline-block;
  margin-top: 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
}

.register-btn:hover {
  background-color: #369f6c;
}
</style>
