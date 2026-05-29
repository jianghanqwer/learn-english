<script setup lang="ts">
import { ref } from 'vue';
import type { Word } from '../types';

defineProps<{
  word: Word;
}>();

const flipped = ref(false);
</script>

<template>
  <div class="word-card" :class="{ flipped }" @click="flipped = !flipped">
    <div class="card-inner">
      <div class="card-front">
        <div class="word">{{ word.word }}</div>
        <div class="phonetic">{{ word.phonetic }}</div>
        <div class="hint">点击翻转查看释义</div>
      </div>
      <div class="card-back">
        <div class="word">{{ word.word }}</div>
        <div class="meaning">{{ word.meaning }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.word-card {
  perspective: 1000px;
  cursor: pointer;
  height: 180px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
}

.card-front {
  background: linear-gradient(135deg, #f5d5b8 0%, #e8a87c 100%);
  color: #5a3e28;
  box-shadow: 0 8px 25px rgba(232, 168, 124, 0.3);
}

.card-back {
  background: linear-gradient(135deg, #c9b896 0%, #a08060 100%);
  color: #fff8f0;
  transform: rotateY(180deg);
  box-shadow: 0 8px 25px rgba(160, 128, 96, 0.3);
}

.word {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.phonetic {
  font-size: 1rem;
  opacity: 0.8;
  font-style: italic;
}

.meaning {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-align: center;
  line-height: 1.6;
}

.hint {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-top: 1rem;
}

.word-card:hover .card-inner {
  transform: scale(1.02);
}

.flipped:hover .card-inner {
  transform: rotateY(180deg) scale(1.02);
}

@media (max-width: 640px) {
  .word-card {
    height: 150px;
  }

  .card-front,
  .card-back {
    padding: 1rem;
    border-radius: 12px;
  }

  .word {
    font-size: 1.4rem;
  }

  .phonetic {
    font-size: 0.85rem;
  }

  .meaning {
    font-size: 1rem;
  }

  .hint {
    font-size: 0.7rem;
    margin-top: 0.6rem;
  }
}
</style>
