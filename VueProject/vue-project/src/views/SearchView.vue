<script setup>
import { ref, onMounted } from 'vue'

const cities = ref([])
const filters = ref({
  city: '全',
  type: '全',
  lang: '全'
})
const results = ref([])

const fetchCities = async () => {
  try {
    const res = await fetch('/api/club/cities')
    console.log(res)
    cities.value = await res.json()
  } catch (err) {
    console.error('取得城市失敗', err)
  }
}

const searchClubs = async () => {
  try {
    const query = new URLSearchParams(filters.value).toString()
    const res = await fetch(`/api/club/list?${query}`)
    results.value = await res.json()
  } catch (err) {
    console.error('查詢錯誤', err)
  }
}

onMounted(() => {
  fetchCities()
})
</script>

<template>
  <div class="search-club-container">
    <div class="search-box shadow">
      <h2><i class="fas fa-search-location text-primary me-2"></i>查詢附近分會</h2>

      <div class="filters">
        <div class="form-group">
          <label><i class="fas fa-city me-1 text-secondary"></i>城市</label>
          <select v-model="filters.city" class="form-control">
            <option value="全">全</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>

        <div class="form-group">
          <label><i class="fas fa-building me-1 text-secondary"></i>類型</label>
          <select v-model="filters.type" class="form-control">
            <option value="全">全</option>
            <option value="社區">社區</option>
            <option value="校園">校園</option>
            <option value="公司">公司</option>
          </select>
        </div>

        <div class="form-group">
          <label><i class="fas fa-language me-1 text-secondary"></i>語言</label>
          <select v-model="filters.lang" class="form-control">
            <option value="全">全</option>
            <option value="英語">英語</option>
            <option value="華語">華語</option>
            <option value="國語">國語</option>
            <option value="台語">台語</option>
            <option value="日語">日語</option>
            <option value="客家">客家</option>
          </select>
        </div>

        <div class="form-group search-button">
          <label class="invisible">查詢</label>
          <button @click="searchClubs" class="btn btn-success w-100">
            <i class="fas fa-search me-1"></i> 查詢
          </button>
        </div>
      </div>

      <table class="club-table" v-if="results.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>分會名稱</th>
            <th>城市</th>
            <th>類型</th>
            <th>語言</th>
            <th>開會時間</th>
            <th>地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(club, index) in results" :key="club.clubId">
            <td>{{ index + 1 }}</td>
            <td>{{ club.name }}</td>
            <td>{{ club.city }}</td>
            <td>{{ club.type }}</td>
            <td>{{ club.languages.join(', ') }}</td>
            <td>{{ club.meetingTime }}</td>
            <td>{{ club.address }}</td>
          </tr>
        </tbody>
      </table>

      <div v-else class="no-result">
        <i class="far fa-frown me-2"></i>尚無查詢結果，請調整篩選條件。
      </div>

    </div>
  </div>
</template>

<style scoped>
.search-club-container {
  padding: 3rem;
  min-height: 100vh;
}

.search-box {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}

h2 {
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1 1 220px;
  min-width: 200px;
}

.search-button {
  display: flex;
  align-items: flex-end;
}

.no-result {
  color: #888;
  font-size: 1rem;
  display: flex;
  align-items: center;
}

.club-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.club-table thead {
  background-color: #f7f7f7;
  color: #333;
  font-weight: bold;
  text-align: left;
}

.club-table th,
.club-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eaeaea;
}

.club-table tbody tr:hover {
  background-color: #f1f5ff;
  transition: background-color 0.2s ease-in-out;
}

.club-table tbody tr:last-child td {
  border-bottom: none;
}

.no-result {
  margin-top: 2rem;
  color: #888;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

</style>

<!-- 引入 font awesome（建議放在 index.html 全域載入） -->
