<template>
  <div class="property-search">
    <div class="search-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input
        type="text"
        :value="searchQuery"
        @input="handleSearch"
        @focus="showResults = true"
        @blur="hideResults"
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

    <!-- 搜索结果下拉列表 -->
    <transition name="dropdown">
      <div v-if="showResults && searchQuery && searchResults.length > 0" class="search-results">
        <div class="results-header">
          <span>找到 {{ searchResults.length }} 个结果</span>
        </div>
        <div class="results-list">
          <div
            v-for="result in searchResults.slice(0, 10)"
            :key="result.name"
            class="result-item"
            @mousedown="selectResult(result)"
          >
            <div class="result-icon">
              <i :class="['fas', getResultIcon(result.category)]"></i>
            </div>
            <div class="result-info">
              <div class="result-name">{{ result.name }}</div>
              <div class="result-description">{{ result.description || getCategoryLabel(result.category) }}</div>
            </div>
            <div class="result-category">
              {{ getCategoryLabel(result.category) }}
            </div>
          </div>
        </div>
        <div v-if="searchResults.length > 10" class="results-footer">
          还有 {{ searchResults.length - 10 }} 个结果...
        </div>
      </div>
    </transition>

    <!-- 无结果提示 -->
    <transition name="dropdown">
      <div v-if="showResults && searchQuery && searchResults.length === 0" class="search-results no-results">
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <p>未找到匹配的结果</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCSSEditor } from '../../composables/useCSSEditor';
import { cssProperties, cssSelectors, cssAtRules, cssUnits, cssFunctions } from '../../data/cssData';
import { categories } from '../../data/cssData';

const { searchQuery, setSearchQuery, selectProperty } = useCSSEditor();

const showResults = ref(false);

const searchResults = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  const results: any[] = [];

  // 搜索属性
  cssProperties.forEach(prop => {
    if (prop.name.toLowerCase().includes(query) ||
        (prop.description && prop.description.toLowerCase().includes(query))) {
      results.push(prop);
    }
  });

  // 搜索选择器
  cssSelectors.forEach(sel => {
    if (sel.name.toLowerCase().includes(query) ||
        (sel.description && sel.description.toLowerCase().includes(query))) {
      results.push({ ...sel, category: 'selectors' });
    }
  });

  // 搜索 At-rules
  cssAtRules.forEach(rule => {
    if (rule.name.toLowerCase().includes(query) ||
        (rule.description && rule.description.toLowerCase().includes(query))) {
      results.push({ ...rule, category: 'at-rules' });
    }
  });

  // 搜索单位
  cssUnits.forEach(unit => {
    if (unit.name.toLowerCase().includes(query) ||
        (unit.description && unit.description.toLowerCase().includes(query))) {
      results.push({ ...unit, category: 'units' });
    }
  });

  // 搜索函数
  cssFunctions.forEach(func => {
    if (func.name.toLowerCase().includes(query) ||
        (func.description && func.description.toLowerCase().includes(query))) {
      results.push({ ...func, category: 'functions' });
    }
  });

  return results;
});

const handleSearch = (e: Event) => {
  const target = e.target as HTMLInputElement;
  setSearchQuery(target.value);
  showResults.value = true;
};

const clearSearch = () => {
  setSearchQuery('');
  showResults.value = false;
};

const hideResults = () => {
  // 延迟隐藏，以便点击事件能够触发
  setTimeout(() => {
    showResults.value = false;
  }, 200);
};

const selectResult = (result: any) => {
  if (result.category && (result.category === 'selectors' || result.category === 'at-rules' || result.category === 'units' || result.category === 'functions')) {
    // 对于非属性项，打开 MDN 链接
    if (result.mdn) {
      window.open(result.mdn, '_blank');
    }
  } else {
    // 对于属性，选择该属性
    selectProperty(result);
  }
  showResults.value = false;
};

const getResultIcon = (category: string) => {
  const iconMap: Record<string, string> = {
    'layout': 'fa-th-large',
    'typography': 'fa-font',
    'color': 'fa-palette',
    'background': 'fa-image',
    'border': 'fa-border-style',
    'spacing': 'fa-arrows-alt',
    'sizing': 'fa-expand-arrows-alt',
    'transform': 'fa-sync-alt',
    'animation': 'fa-film',
    'transition': 'fa-exchange-alt',
    'grid': 'fa-th',
    'flexbox': 'fa-columns',
    'position': 'fa-map-marker-alt',
    'display': 'fa-eye',
    'overflow': 'fa-level-down-alt',
    'selectors': 'fa-crosshairs',
    'at-rules': 'fa-at',
    'units': 'fa-ruler-combined',
    'functions': 'fa-code',
  };
  return iconMap[category] || 'fa-css3-alt';
};

const getCategoryLabel = (category: string) => {
  return categories[category as keyof typeof categories]?.label || category;
};
</script>

<style scoped>
.property-search {
  padding: 12px 12px 10px 12px;
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
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

/* 搜索结果下拉列表 */
.search-results {
  position: absolute;
  top: calc(100% - 2px);
  left: 12px;
  right: 12px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  max-height: 400px;
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.results-header {
  padding: 10px 12px;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-primary);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.results-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.result-item:hover {
  background: var(--color-primary-lighter);
}

.result-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: 6px;
  flex-shrink: 0;
}

.result-item:hover .result-icon {
  background: var(--color-primary);
}

.result-icon i {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.result-item:hover .result-icon i {
  color: white;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: 'Courier New', monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-description {
  font-size: 11px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.result-category {
  font-size: 10px;
  padding: 3px 8px;
  background: var(--color-bg-tertiary);
  color: var(--color-text-muted);
  border-radius: 10px;
  font-weight: 600;
  flex-shrink: 0;
}

.result-item:hover .result-category {
  background: var(--color-primary);
  color: white;
}

.results-footer {
  padding: 8px 12px;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
}

/* 无结果状态 */
.no-results {
  max-height: 150px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  color: var(--color-text-muted);
}

.empty-state i {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.3;
}

.empty-state p {
  margin: 0;
  font-size: 13px;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
