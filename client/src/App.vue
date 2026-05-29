<script setup lang="ts">
import { ref } from 'vue';
import DifficultySelector from './components/DifficultySelector.vue';
import WordCard from './components/WordCard.vue';
import { fetchWords } from './api/words';
import type { Word, DifficultyLevel } from './types';

const level = ref<DifficultyLevel>('cet4');
const words = ref<Word[]>([]);
const loading = ref(false);
const error = ref('');

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
      <h1>英语单词学习</h1>
      <p class="subtitle">每天学习 10 个新单词</p>
    </header>

    <main>
      <DifficultySelector :selected="level" @select="level = $event" />

      <button class="generate-btn" :disabled="loading" @click="generate">
        <span v-if="loading">生成中...</span>
        <span v-else>生成单词</span>
      </button>

      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="words.length" class="words-grid">
        <WordCard v-for="(word, index) in words" :key="index" :word="word" />
      </div>
    </main>
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
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2rem;
  color: #c0763a;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #a0896e;
  font-size: 1rem;
}

.generate-btn {
  display: block;
  margin: 1.5rem auto 2rem;
  padding: 0.8rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #e8a87c 0%, #d4845a 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 132, 90, 0.35);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  text-align: center;
  color: #c44;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.words-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
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
