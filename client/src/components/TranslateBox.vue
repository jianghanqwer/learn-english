<script setup lang="ts">
import { ref } from 'vue';
import WordCard from './WordCard.vue';
import { translateWord } from '../api/words';
import type { Word } from '../types';

const query = ref('');
const results = ref<Word[]>([]);
const loading = ref(false);
const error = ref('');
const searched = ref(false);

async function search() {
  const q = query.value.trim();
  if (!q) return;

  loading.value = true;
  error.value = '';
  searched.value = true;
  try {
    results.value = await translateWord(q);
  } catch (e: any) {
    error.value = e.message || '翻译失败，请重试';
    results.value = [];
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="translate-box">
    <div class="search-bar">
      <input
        v-model="query"
        type="text"
        placeholder="输入中文查询英文，如：苹果"
        @keyup.enter="search"
      />
      <button :disabled="loading || !query.trim()" @click="search">
        <span v-if="loading">查询中...</span>
        <span v-else>查询</span>
      </button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results.length" class="results">
      <div class="results-label">找到 {{ results.length }} 个结果</div>
      <div class="results-grid">
        <WordCard v-for="(word, index) in results" :key="index" :word="word" />
      </div>
    </div>

    <div v-else-if="searched && !loading && !error" class="empty">
      未找到结果
    </div>
  </div>
</template>

<style scoped>
.translate-box {
  max-width: 600px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.search-bar input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: var(--card-bg);
  color: var(--text);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: var(--primary);
}

.search-bar input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.search-bar button {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.search-bar button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--btn-shadow);
}

.search-bar button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  text-align: center;
  color: var(--error);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.results-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
}

.empty {
  text-align: center;
  color: var(--text-secondary);
  padding: 2rem;
}

@media (max-width: 640px) {
  .search-bar {
    flex-direction: column;
  }

  .search-bar button {
    padding: 0.9rem;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
}

@media (max-width: 380px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
