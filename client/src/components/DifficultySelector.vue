<script setup lang="ts">
import { difficultyOptions, type DifficultyLevel } from '../types';

const props = defineProps<{
  selected: DifficultyLevel;
}>();

const emit = defineEmits<{
  select: [level: DifficultyLevel];
}>();
</script>

<template>
  <div class="difficulty-selector">
    <h2>选择难度</h2>
    <div class="options">
      <button
        v-for="option in difficultyOptions"
        :key="option.value"
        :class="['option-btn', { active: props.selected === option.value }]"
        @click="emit('select', option.value)"
      >
        <span class="label">{{ option.label }}</span>
        <span class="desc">{{ option.description }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.difficulty-selector {
  text-align: center;
  margin-bottom: 2rem;
}

.difficulty-selector h2 {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
}

.options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: var(--card-bg);
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
}

.option-btn:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--card-shadow);
}

.option-btn.active {
  border-color: var(--primary);
  background: var(--primary);
  color: white;
}

.option-btn .label {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.option-btn .desc {
  font-size: 0.8rem;
  opacity: 0.7;
}

@media (max-width: 640px) {
  .options {
    gap: 0.6rem;
  }

  .option-btn {
    padding: 0.8rem 1rem;
    min-width: 0;
    flex: 1;
  }

  .option-btn .label {
    font-size: 1.1rem;
  }

  .option-btn .desc {
    font-size: 0.7rem;
  }
}
</style>
