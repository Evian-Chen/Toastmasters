import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'

export const userAuthStore = defineStore('auth', () => {
  // 一些高頻使用的設定先儲存在pinia
  // 但是個人設定只有在設定頁面才會看到，所以不需要放在pinia
  const userData = ref({
    userId: "",
    avatar: "",
    displayName: "",
    email: "",
    emailVerified: false,
    clubs: [],
    postIds: [],
    likePostIds: [],

    privacy: {
      allowMessages: true,
      showOnlineStatus: true,
      publicProfile: true
    },

    notifications: {
      emailNotifications: true,
      messageNotifications: true,
      postLikes: true,
    }
  });

  const isLoggedIn = ref(false)

  const setData = async (data) => {
    // 這邊應該改成跟資料庫請求這個人的存在Pinia的資料，而不是靠前端去取得
    // 如果呼叫了這個函式，基本上就代表一定有這個人的資料
    await axios.get(`/api/data/info`, {
      params: data
    })
    .then((res) => {
      const info = res.data.info;

      userData.value = {
        userId: info._id.toString() || "user id not found",
        avatar: info.avatar || "",
        displayName: info.displayName || "",
        email: info.email || "",
        emailVerified: info.email_verified || false,
        clubs: info.clubs || [],
        postIds: info.postIds || [],
        likePostIds: info.likePostIds || [],


        privacy: {
          allowMessages: info.privacy?.allowMessages || true,
          publicProfile: info.privacy?.publicProfile || true
        },

        notifications: {
          emailNotifications: info.notifications?.emailNotifications || true,
          messageNotifications: info.notifications?.messageNotifications || true,
          postLikes: info.notifications?.postLikes || true,
        }
      }

      // 只有在email是驗證的情況下才會允許登入
      if (!userData.value.emailVerified) {
        isLoggedIn.value = true
      }
      console.log(`in pinia isLoggedIn: ${isLoggedIn.value}`);
      console.log(`in pinia setData user info: ${JSON.stringify(userData.value)}`);
    })
    .catch((err) => {
      console.log(`in setData, get data/info error: ${err}`);
    })
  };

  // 更新使用者的喜歡的貼文ID
  const toggleLikePost = (postId) => {
    if (!postId) {
      console.warn("toggleLikePost: postId is required");
      return;
    }

    const index = userData.value.likePostIds.indexOf(postId);
    if (index === -1){
      userData.value.likePostIds.push(postId);
      return true; // 新增成功
    } else {
      userData.value.likePostIds.splice(index, 1);
      return false; // 刪除成功
    }
  }

  // 更新使用者的貼文ID
  const updatePostId = (mode="add", postId) => {
    if (mode === "add") {
      if (!userData.value.postIds.includes(postId)) {
        userData.value.postIds.push(postId);
      }
    } else if (mode === "remove") {
      userData.value.postIds = userData.value.postIds.filter(id => id !== postId);
    }
  }

  const logOut = () => {
    userData.value = {
      name: "",
      email: "",
      bio: "",
      emailVerified: "",
    }
    isLoggedIn.value = false
    console.log("pinia user.js log out")
  }

  return { userData, setData, toggleLikePost, updatePostId, logOut, isLoggedIn }
})

