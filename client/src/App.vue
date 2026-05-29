<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TabNav from './components/TabNav.vue';
import DifficultySelector from './components/DifficultySelector.vue';
import WordCard from './components/WordCard.vue';
import TranslateBox from './components/TranslateBox.vue';
import ShareCard from './components/ShareCard.vue';
import { fetchWords } from './api/words';
import type { Word, DifficultyLevel } from './types';

const tabs = [
  { key: 'learn', label: '学单词' },
  { key: 'translate', label: '查翻译' },
];

const activeTab = ref('learn');
const level = ref<DifficultyLevel>('cet4');
const words = ref<Word[]>([]);
const loading = ref(false);
const error = ref('');
const isDark = ref(false);
const showShareCard = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
}

onMounted(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

async function generate() {
  loading.value = true;
  error.value = '';
  try {
    words.value = await fetchWords(level.value);
  } catch (e: any) {
    error.value = e.message || '生成失败，请重试';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="app">
    <header>
      <div class="header-top">
        <h1>英语单词学习</h1>
        <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换浅色' : '切换深色'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </header>

    <TabNav :tabs="tabs" :active="activeTab" @change="activeTab = $event" />

    <main>
      <div v-if="activeTab === 'learn'">
        <p class="subtitle">每天学习 10 个新单词</p>
        <DifficultySelector :selected="level" @select="level = $event" />

        <button class="generate-btn" :disabled="loading" @click="generate">
          <span v-if="loading">生成中...</span>
          <span v-else>生成单词</span>
        </button>

        <div v-if="error" class="error">{{ error }}</div>

        <div v-if="words.length" class="words-grid">
          <WordCard v-for="(word, index) in words" :key="index" :word="word" />
        </div>

        <button v-if="words.length" class="share-btn" @click="showShareCard = true">
          生成分享卡片
        </button>
      </div>

      <div v-if="activeTab === 'translate'">
        <p class="subtitle">输入中文，查询英文单词</p>
        <TranslateBox />
      </div>
    </main>

    <ShareCard
      v-if="showShareCard"
      :words="words"
      :level="level"
      @close="showShareCard = false"
    />
  </div>
</template>

<style scoped>
.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

header h1 {
  font-size: 2rem;
  color: var(--primary);
  margin: 0;
}

.theme-toggle {
  background: none;
  border: 2px solid var(--border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-toggle:hover {
  border-color: var(--primary);
  transform: scale(1.1);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.generate-btn {
  display: block;
  margin: 1.5rem auto 2rem;
  padding: 0.8rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--btn-shadow);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  text-align: center;
  color: var(--error);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.words-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
}

.share-btn {
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.6rem 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--primary);
  background: none;
  border: 2px solid var(--primary);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  background: var(--primary);
  color: white;
}

@media (max-width: 640px) {
  .app {
    padding: 1.2rem 1rem;
  }

  header h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .generate-btn {
    width: 100%;
    padding: 0.9rem 2rem;
  }

  .words-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
}

@media (max-width: 380px) {
  .words-grid {
    grid-template-columns: 1fr;
  }
}
</style>
