<template>
  <div class="about">
    <div class="content">
      <h1>關於 Toastmasters</h1>
      <p>
        Toastmasters 是一個全球性的非營利組織，致力於幫助個人提升公開演講、自信與領導能力。透過定期的聚會與練習，每位會員都能在友善的環境中不斷進步。
      </p>

      <h2>我們的宗旨</h2>
      <p>
        提供一個積極且支持的學習環境，讓會員有機會鍛鍊溝通與領導技能，進而建立自信與成就。
      </p>

      <h2>活動內容</h2>
      <ul>
        <li>公開演講練習</li>
        <li>即席演講訓練</li>
        <li>互評回饋技巧</li>
        <li>領導力角色實作</li>
      </ul>

      <h2>加入我們</h2>
      <p>
        無論你是想克服上台恐懼、還是想成為領袖，Toastmasters 都歡迎你的加入。我們鼓勵每一位成員勇於嘗試、持續成長。
      </p>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content {
  max-width: 800px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

h2 {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #34495e;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-top: 0.5rem;
}

ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

li {
  margin-bottom: 0.5rem;
  color: #333;
}

@media (min-width: 1024px) {
  .about {
    align-items: center;
  }
}
</style>
