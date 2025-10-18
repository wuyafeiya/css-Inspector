<template>
  <div class="property-search">
    <div class="search-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input
        type="text"
        :value="searchQuery"
        @input="handleSearch"
        placeholder="搜索属性或选择器..."
        class="search-input"
      />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="clear-btn"
        title="清除搜索"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCSSEditor } from '../../composables/useCSSEditor';

const { searchQuery, setSearchQuery } = useCSSEditor();

const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  setSearchQuery(target.value);
};

const clearSearch = () => {
  setSearchQuery('');
};
</script>

<style scoped>
.property-search {
  padding: 12px 12px 10px 12px;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--color-text-muted);
  font-size: 13px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 9px 36px 9px 36px;
  border: 2px solid var(--color-border-primary);
  border-radius: 8px;
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
  background: var(--input-bg);
  color: var(--color-text-primary);
}

.search-input:focus {
  border-color: var(--color-primary);
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-focus);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.clear-btn {
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-bg-tertiary);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.clear-btn:hover {
  background: var(--color-border-secondary);
}

.clear-btn i {
  font-size: 10px;
  color: var(--color-text-secondary);
}
</style>
