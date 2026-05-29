<script setup lang="ts">
export interface Tab {
  key: string;
  label: string;
}

defineProps<{
  tabs: Tab[];
  active: string;
}>();

const emit = defineEmits<{
  change: [key: string];
}>();
</script>

<template>
  <nav class="tab-nav">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="['tab-btn', { active: active === tab.key }]"
      @click="emit('change', tab.key)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<style scoped>
.tab-nav {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--border);
  margin-bottom: 1.5rem;
}

.tab-btn {
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  background: none;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: var(--primary);
}

.tab-btn.active {
  color: var(--primary);
  font-weight: 600;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary);
  border-radius: 1px;
}

@media (max-width: 640px) {
  .tab-btn {
    padding: 0.6rem 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
