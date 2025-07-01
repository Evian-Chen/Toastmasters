<script setup>
import axios from 'axios';
import { watch } from 'vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { userAuthStore } from '@/stores/user';

const userStore = userAuthStore();

// 個人資料
const profile = reactive({
  avatar: '',
  displayName: '',
  realName: '',
  email: '',
  phone: '',
  birthday: '',
  bio: '',
  location: '',
  clubs: []
});

// 新增分會
const addClub = () => {
  if (profile.clubs.length < 5) {
    profile.clubs.push({
      clubName: '',
      role: 'member',
      memberSince: '',
      pathwayLevel: 'Level 1'
    });
  } else {
    alert('最多只能添加5個分會');
  }
};

// 刪除分會
const removeClub = (index) => {
  if (profile.clubs.length > 1) {
    profile.clubs.splice(index, 1);
  } else {
    alert('至少需要保留一個分會');
  }
};

// 初始化時添加一個分會
onMounted(() => {
  if (profile.clubs.length === 0) {
    addClub();
  }

  // 當進入設定頁面時，為 #app 添加 settings-page 類別
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.add('settings-page');
  }
});

// 密碼設定
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 隱私設定
const privacySettings = reactive({
  showEmail: false,
  showPhone: false,
  showBirthday: false,
  allowMessages: true,
  showOnlineStatus: true,
  publicProfile: true
});

// 通知設定
const notificationSettings = reactive({
  emailNotifications: true,
  messageNotifications: true,
  postLikes: true,
  postComments: true,
  clubAnnouncements: true,
  systemUpdates: false
});

// 當前選中的設定分頁
const activeTab = ref('profile');

const saveHint = ref('資料已是最新！');

const warning = reactive({
  profileWarning: '',
  pwWarning: ''
})

const updateProfile = () => {
  // 驗證必填欄位
  if (!profile.displayName.trim()) {
    alert('請填寫顯示名稱');
    return;
  }
  if (!profile.email.trim()) {
    alert('請填寫電子郵件');
    return;
  }

  // 驗證分會資料
  for (let i = 0; i < profile.clubs.length; i++) {
    if (!profile.clubs[i].clubName.trim()) {
      alert(`請填寫第 ${i + 1} 個分會名稱`);
      return;
    }
  }

  console.log("更新個人資料：", {
    profile
  });
  alert('個人資料已更新！');

  saveHint.value = "資料已儲存！";
};

const updatePassword = async () => {
  if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    warning.pwWarning = '請填寫所有密碼欄位';
    return;
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    warning.pwWarning = '新密碼與確認密碼不符';
    return;
  }

  if (passwordForm.newPassword === passwordForm.currentPassword) {
    warning.pwWarning = '新密碼不能與舊密碼相同';
    return;
  }

  // 檢查舊密碼是否正確
  await axios.post("/api/account/password/new", {
    currentPassword: passwordForm.currentPassword,
    newPassword: passwordForm.newPassword,
    email: userStore.userData.email
  })
  .then((res) => {
    if (res.status === 201) {
      console.log("201");
      warning.pwWarning = '舊密碼輸入錯誤';
      return;
    }

    alert('密碼已更新！');

    // 成功後清空表單
    warning.pwWarning = '';
    passwordForm.currentPassword = '';
    passwordForm.newPassword = '';
    passwordForm.confirmPassword = '';
  })
  .catch((err) => {
    console.log(err);
  })
};

const forgetPassword = () => {
  // TODO
  return;
}

const updatePrivacy = () => {
  console.log("更新隱私設定：", privacySettings);
  alert('隱私設定已更新！');
};

const updateNotifications = () => {
  console.log("更新通知設定：", notificationSettings);
  alert('通知設定已更新！');
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 檢查檔案大小 (限制 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('檔案大小不能超過 5MB');
      return;
    }

    // 檢查檔案類型
    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片檔案');
      return;
    }

    // 建立預覽
    const reader = new FileReader();
    reader.onload = (e) => {
      profile.avatar = e.target.result;
    };
    reader.readAsDataURL(file);

    console.log("上傳頭像：", file);
  }
};

// pathways的處理要另外做，因為官網的分級比較複雜
const pathwayLevels = [
  'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'
];

const memberRoles = [
  'member', 'VPE', 'VPM', 'VPPR', 'Secretary', 'Treasurer', 'Sergeant at Arms', 'President'
];

onUnmounted(() => {
  if (saveHint.value === '儲存個人資料') {
    alert('請先儲存個人資料變更！');
  }
  // 當離開設定頁面時，移除 settings-page 類別
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.remove('settings-page');
  }
});

watch(() => profile, () => {
  saveHint.value = '儲存個人資料';
}, { deep: true });
</script>

<template>
  <div class="settings-container">
    <!-- 側邊導航 -->
    <nav class="settings-nav">
      <h2 class="nav-title">個人設定</h2>
      <ul class="nav-list">
        <li>
          <button :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">
            📝 個人資料
          </button>
        </li>
        <li>
          <button :class="{ active: activeTab === 'security' }" @click="activeTab = 'security'">
            🔒 帳號安全
          </button>
        </li>
        <li>
          <button :class="{ active: activeTab === 'privacy' }" @click="activeTab = 'privacy'">
            🛡️ 隱私設定
          </button>
        </li>
        <li>
          <button :class="{ active: activeTab === 'notifications' }" @click="activeTab = 'notifications'">
            🔔 通知設定
          </button>
        </li>
      </ul>
    </nav>

    <!-- 主要內容區域 -->
    <main class="settings-content">
      <!-- 個人資料頁面 -->
      <div v-if="activeTab === 'profile'" class="settings-panel">
        <h1 class="panel-title">個人資料</h1>

        <!-- 頭像上傳 -->
        <div class="avatar-section">
          <div class="avatar-container">
            <img :src="profile.avatar || '/default-avatar.png'" alt="個人頭像" class="avatar" />
            <label for="avatar-upload" class="avatar-upload-btn">
              📷 更換頭像
            </label>
            <input id="avatar-upload" type="file" accept="image/*" @change="handleAvatarUpload"
              style="display: none;" />
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="displayName">顯示名稱 *</label>
            <input id="displayName" v-model="profile.displayName" type="text" placeholder="其他人看到的名稱" required />
          </div>

          <div class="form-group">
            <label for="realName">真實姓名</label>
            <input id="realName" v-model="profile.realName" type="text" placeholder="你的真實姓名" />
          </div>

          <div class="form-group">
            <label for="email">電子郵件 *</label>
            <input id="email" v-model="profile.email" type="email" placeholder="your@email.com" required />
          </div>

          <div class="form-group">
            <label for="phone">聯絡電話</label>
            <input id="phone" v-model="profile.phone" type="tel" placeholder="09XX-XXX-XXX" />
          </div>

          <div class="form-group">
            <label for="birthday">生日</label>
            <input id="birthday" v-model="profile.birthday" type="date" />
          </div>

          <div class="form-group">
            <label for="location">所在地區</label>
            <input id="location" v-model="profile.location" type="text" placeholder="台北市, 台灣" />
          </div>
        </div>

        <!-- 分會資訊區域 -->
        <div class="clubs-section">
          <div class="section-header">
            <h3>分會資訊</h3>
            <button class="btn secondary" @click="addClub" :disabled="profile.clubs.length >= 5">
              ➕ 新增分會
            </button>
          </div>

          <div class="clubs-list">
            <div v-for="(club, index) in profile.clubs" :key="index" class="club-card">
              <div class="club-header">
                <h4>分會 {{ index + 1 }}</h4>
                <button
                  v-if="profile.clubs.length > 1"
                  class="btn danger small"
                  @click="removeClub(index)"
                  title="刪除分會"
                >
                  🗑️
                </button>
              </div>

              <div class="club-form-grid">
                <div class="form-group">
                  <label :for="`clubName-${index}`">分會名稱 *</label>
                  <input
                    :id="`clubName-${index}`"
                    v-model="club.clubName"
                    type="text"
                    placeholder="Toastmasters分會名稱"
                    required
                  />
                </div>

                <div class="form-group">
                  <label :for="`memberSince-${index}`">入會時間</label>
                  <input
                    :id="`memberSince-${index}`"
                    v-model="club.memberSince"
                    type="date"
                  />
                </div>

                <div class="form-group">
                  <label :for="`pathwayLevel-${index}`">Pathways等級</label>
                  <select :id="`pathwayLevel-${index}`" v-model="club.pathwayLevel">
                    <option v-for="level in pathwayLevels" :key="level" :value="level">
                      {{ level }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label :for="`role-${index}`">分會職務</label>
                  <select :id="`role-${index}`" v-model="club.role">
                    <option v-for="role in memberRoles" :key="role" :value="role">
                      {{ role }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group full-width">
          <label for="bio">個人簡介</label>
          <textarea id="bio" v-model="profile.bio" rows="4" placeholder="分享一些關於你的演講經驗、興趣或目標..."></textarea>
        </div>

        <button class="submit-btn primary" @click="updateProfile">
          💾 {{ saveHint }}
        </button>
      </div>

      <!-- 帳號安全頁面 -->
      <div v-if="activeTab === 'security'" class="settings-panel">
        <h1 class="panel-title">帳號安全</h1>

        <div class="security-section">
          <h3>修改密碼</h3>
          <div class="form-group">
            <label for="currentPassword">目前密碼</label>
            <input id="currentPassword" v-model="passwordForm.currentPassword" type="password" />
          </div>

          <div class="form-group">
            <label for="newPassword">新密碼</label>
            <input id="newPassword" v-model="passwordForm.newPassword" type="password" />
          </div>

          <div class="form-group">
            <label for="confirmPassword">確認新密碼</label>
            <input id="confirmPassword" v-model="passwordForm.confirmPassword" type="password" />
          </div>

          <div v-if="warning.pwWarning">
            <p class="error">{{ warning.pwWarning }}</p>
          </div>

          <button class="submit-btn primary" @click="updatePassword">
            🔐 更新密碼
          </button>

          <button v-if="warning.pwWarning === '舊密碼輸入錯誤'" class="submit-btn primary" @click="forgetPassword">
            忘記密碼
          </button>
        </div>

        <div class="security-section">
          <h3>帳號操作</h3>
          <div class="danger-zone">
            <button class="btn danger">🗑️ 刪除帳號</button>
            <p class="warning-text">此操作無法復原，請謹慎考慮</p>
          </div>
        </div>
      </div>

      <!-- 隱私設定頁面 -->
      <div v-if="activeTab === 'privacy'" class="settings-panel">
        <h1 class="panel-title">隱私設定</h1>

        <div class="privacy-section">
          <h3>個人資料可見性</h3>

          <div class="toggle-group">
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="privacySettings.showEmail" />
                <span class="toggle-switch"></span>
                顯示電子郵件
              </label>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="privacySettings.showPhone" />
                <span class="toggle-switch"></span>
                顯示聯絡電話
              </label>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="privacySettings.showBirthday" />
                <span class="toggle-switch"></span>
                顯示生日
              </label>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="privacySettings.allowMessages" />
                <span class="toggle-switch"></span>
                允許其他會員傳送訊息
              </label>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="privacySettings.showOnlineStatus" />
                <span class="toggle-switch"></span>
                顯示線上狀態
              </label>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="privacySettings.publicProfile" />
                <span class="toggle-switch"></span>
                公開個人檔案
              </label>
            </div>
          </div>
        </div>

        <button class="submit-btn primary" @click="updatePrivacy">
          🛡️ 儲存隱私設定
        </button>
      </div>

      <!-- 通知設定頁面 -->
      <div v-if="activeTab === 'notifications'" class="settings-panel">
        <h1 class="panel-title">通知設定</h1>

        <div class="notification-section">
          <h3>通知類型</h3>

          <div class="toggle-group">
            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="notificationSettings.emailNotifications" />
                <span class="toggle-switch"></span>
                電子郵件通知
              </label>
              <p class="toggle-description">接收重要訊息的電子郵件通知</p>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="notificationSettings.messageNotifications" />
                <span class="toggle-switch"></span>
                私人訊息通知
              </label>
              <p class="toggle-description">當收到新的私人訊息時通知</p>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="notificationSettings.postLikes" />
                <span class="toggle-switch"></span>
                貼文按讚通知
              </label>
              <p class="toggle-description">當有人對你的貼文按讚時通知</p>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="notificationSettings.postComments" />
                <span class="toggle-switch"></span>
                貼文留言通知
              </label>
              <p class="toggle-description">當有人留言你的貼文時通知</p>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="notificationSettings.clubAnnouncements" />
                <span class="toggle-switch"></span>
                分會公告通知
              </label>
              <p class="toggle-description">接收分會重要公告與活動資訊</p>
            </div>

            <div class="toggle-item">
              <label class="toggle-label">
                <input type="checkbox" v-model="notificationSettings.systemUpdates" />
                <span class="toggle-switch"></span>
                系統更新通知
              </label>
              <p class="toggle-description">接收網站功能更新與維護資訊</p>
            </div>
          </div>
        </div>

        <button class="submit-btn primary" @click="updateNotifications">
          🔔 儲存通知設定
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.settings-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* 側邊導航 */
.settings-nav {
  width: 280px;
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 2rem 0;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2rem;
  padding: 0 2rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list button {
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  background: none;
  text-align: left;
  font-size: 1rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-list button:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.nav-list button.active {
  background-color: #dbeafe;
  color: #1d4ed8;
  border-left-color: #1d4ed8;
  font-weight: 500;
}

/* 主要內容區域 */
.settings-content {
  flex: 1;
  padding: 2rem;
  max-width: 800px;
}

.settings-panel {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.panel-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1rem;
}

/* 頭像區域 */
.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.avatar-container {
  position: relative;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e5e7eb;
  margin-bottom: 1rem;
}

.avatar-upload-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.avatar-upload-btn:hover {
  background-color: #4b5563;
}

/* 表單樣式 */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 分會區域樣式 */
.clubs-section {
  margin: 2rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.clubs-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.club-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f9fafb;
}

.club-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.club-header h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.club-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* 按鈕樣式 */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.small {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn.secondary {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn.secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.btn.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.danger {
  background-color: #ef4444;
  color: white;
}

.btn.danger:hover {
  background-color: #dc2626;
}

.submit-btn {
  padding: 1rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
}

.submit-btn.primary {
  background-color: #3b82f6;
  color: white;
}

.submit-btn.primary:hover {
  background-color: #2563eb;
}

/* 安全區域 */
.security-section {
  margin-bottom: 3rem;
}

.security-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.danger-zone {
  padding: 1.5rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  text-align: center;
}

.warning-text {
  color: #991b1b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* 切換開關樣式 */
.privacy-section,
.notification-section {
  margin-bottom: 2rem;
}

.privacy-section h3,
.notification-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-item {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.toggle-item:last-child {
  border-bottom: none;
}

.toggle-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
}

.toggle-label input[type="checkbox"] {
  display: none;
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: #d1d5db;
  border-radius: 12px;
  margin-right: 0.75rem;
  transition: background-color 0.2s;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.toggle-label input[type="checkbox"]:checked + .toggle-switch {
  background-color: #3b82f6;
}

.toggle-label input[type="checkbox"]:checked + .toggle-switch::after {
  transform: translateX(20px);
}

.toggle-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-left: 3.25rem;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .settings-container {
    flex-direction: column;
  }

  .settings-nav {
    width: 100%;
  }

  .nav-list {
    display: flex;
    overflow-x: auto;
    padding: 0 1rem;
  }

  .nav-list button {
    white-space: nowrap;
    padding: 1rem;
    border-left: none;
    border-bottom: 3px solid transparent;
  }

  .nav-list button.active {
    border-bottom-color: #1d4ed8;
    border-left-color: transparent;
  }

  .form-grid,
  .club-form-grid {
    grid-template-columns: 1fr;
  }

  .settings-content {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
}

.error {
  color: red;
  font-size: 17px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
</style>
