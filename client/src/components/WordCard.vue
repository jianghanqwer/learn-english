<script setup lang="ts">
import { ref } from 'vue';
import type { Word } from '../types';

const props = defineProps<{
  word: Word;
}>();

const flipped = ref(false);
const speaking = ref(false);

function playPronunciation(e: Event) {
  e.stopPropagation();
  if (speaking.value) return;

  const utterance = new SpeechSynthesisUtterance(props.word.word);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;

  utterance.onstart = () => { speaking.value = true; };
  utterance.onend = () => { speaking.value = false; };
  utterance.onerror = () => { speaking.value = false; };

  speechSynthesis.speak(utterance);
}
</script>

<template>
  <div class="word-card" :class="{ flipped }" @click="flipped = !flipped">
    <div class="card-inner">
      <div class="card-front">
        <div class="word-row">
          <span class="word">{{ word.word }}</span>
          <button
            class="speak-btn"
            :class="{ active: speaking }"
            @click="playPronunciation"
            title="播放发音"
          >🔊</button>
        </div>
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
  background: linear-gradient(135deg, var(--card-front-from) 0%, var(--card-front-to) 100%);
  color: var(--card-front-text);
  box-shadow: 0 8px 25px var(--card-shadow);
}

.card-back {
  background: linear-gradient(135deg, var(--card-back-from) 0%, var(--card-back-to) 100%);
  color: var(--card-back-text);
  transform: rotateY(180deg);
  box-shadow: 0 8px 25px var(--card-back-shadow);
}

.word-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.word {
  font-size: 1.8rem;
  font-weight: 700;
}

.speak-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  transition: transform 0.2s;
  filter: var(--icon-filter);
}

.speak-btn:hover {
  transform: scale(1.2);
}

.speak-btn.active {
  animation: pulse 0.6s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
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

  .speak-btn {
    font-size: 1rem;
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
