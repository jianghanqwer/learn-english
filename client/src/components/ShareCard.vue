<script setup lang="ts">
import { ref } from 'vue';
import html2canvas from 'html2canvas';
import type { Word } from '../types';
import { difficultyLabels, type DifficultyLevel } from '../types';

const props = defineProps<{
  words: Word[];
  level: DifficultyLevel;
}>();

const emit = defineEmits<{
  close: [];
}>();

const cardRef = ref<HTMLElement | null>(null);
const saving = ref(false);

function getDate(): string {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

async function saveImage() {
  if (!cardRef.value || saving.value) return;
  saving.value = true;

  try {
    const canvas = await html2canvas(cardRef.value, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.download = `英语单词_${getDate()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    console.error('生成图片失败:', e);
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="share-modal">
      <div ref="cardRef" class="share-card">
        <div class="card-header">
          <div class="card-title">📚 英语单词学习</div>
          <div class="card-date">{{ getDate() }} · {{ difficultyLabels[level] }}词汇</div>
        </div>

        <div class="card-body">
          <div
            v-for="(word, index) in words"
            :key="index"
            class="word-row"
          >
            <span class="word-index">{{ index + 1 }}.</span>
            <span class="word-en">{{ word.word }}</span>
            <span class="word-phonetic">{{ word.phonetic }}</span>
            <span class="word-zh">{{ word.meaning }}</span>
          </div>
        </div>

        <div class="card-footer">
          每天进步一点点 💪
        </div>
      </div>

      <div class="actions">
        <button class="btn-save" :disabled="saving" @click="saveImage">
          <span v-if="saving">生成中...</span>
          <span v-else>保存图片</span>
        </button>
        <button class="btn-close" @click="emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.share-modal {
  max-width: 420px;
  width: 100%;
}

.share-card {
  background: linear-gradient(135deg, #fdf6ee 0%, #f5e6d0 100%);
  border-radius: 20px;
  padding: 2rem 1.8rem;
  color: #4a3728;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card-header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px dashed #d4a574;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #c0763a;
  margin-bottom: 0.3rem;
}

.card-date {
  font-size: 0.85rem;
  color: #a0896e;
}

.card-body {
  max-height: 320px;
  overflow-y: auto;
}

.word-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(212, 165, 116, 0.3);
  font-size: 0.95rem;
}

.word-row:last-child {
  border-bottom: none;
}

.word-index {
  color: #c0763a;
  font-weight: 600;
  min-width: 1.5rem;
}

.word-en {
  font-weight: 700;
  color: #5a3e28;
  min-width: 5rem;
}

.word-phonetic {
  color: #a0896e;
  font-style: italic;
  font-size: 0.85rem;
  min-width: 5rem;
}

.word-zh {
  color: #7a6550;
}

.card-footer {
  text-align: center;
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 2px dashed #d4a574;
  font-size: 0.9rem;
  color: #a0896e;
}

.actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  justify-content: center;
}

.btn-save,
.btn-close {
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save {
  background: linear-gradient(135deg, #e8a87c 0%, #d4845a 100%);
  color: white;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(212, 132, 90, 0.4);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-close {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
