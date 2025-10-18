<template>
  <div class="category-filter">
    <div class="filter-header">
      <i class="fas fa-filter"></i>
      <span>分类筛选</span>
    </div>
    <div class="category-list">
      <!-- 全部分类 -->
      <div class="category-section">
        <button
          :class="['category-item', { active: expandedCategory === 'all' }]"
          @click="toggleCategory('all')"
        >
          <div class="category-icon">
            <i class="fas fa-list"></i>
          </div>
          <div class="category-info">
            <span class="category-name">全部</span>
            <span class="category-count">{{ totalCount }}</span>
          </div>
          <i :class="['fas', expandedCategory === 'all' ? 'fa-chevron-down' : 'fa-chevron-right', 'arrow']"></i>
        </button>

        <transition name="expand">
          <div v-if="expandedCategory === 'all'" class="property-items">
            <PropertyItem
              v-for="property in allProperties"
              :key="property.name"
              :property="property"
            />
            <div
              v-for="item in [...allSelectors, ...allAtRules, ...allUnits, ...allFunctions]"
              :key="item.name"
              class="selector-item-mini"
            >
              <i :class="['fas', item.category === 'selectors' ? 'fa-crosshairs' : item.category === 'at-rules' ? 'fa-at' : item.category === 'units' ? 'fa-ruler-combined' : 'fa-function']"></i>
              <span class="selector-name">{{ item.name }}</span>
              <a
                v-if="item.mdn"
                :href="item.mdn"
                target="_blank"
                class="mdn-link-mini"
                @click.stop
              >
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </transition>
      </div>

      <div class="divider"></div>

      <!-- 各个分类 -->
      <div
        v-for="(info, key) in categories"
        :key="key"
        class="category-section"
      >
        <button
          :class="['category-item', { active: expandedCategory === key }]"
          @click="toggleCategory(key)"
        >
          <div class="category-icon">
            <i :class="['fas', info.icon]"></i>
          </div>
          <div class="category-info">
            <span class="category-name">{{ info.label }}</span>
            <span class="category-count">{{ getCategoryCount(key) }}</span>
          </div>
          <i :class="['fas', expandedCategory === key ? 'fa-chevron-down' : 'fa-chevron-right', 'arrow']"></i>
        </button>

        <transition name="expand">
          <div v-if="expandedCategory === key" class="property-items">
            <!-- 显示属性 -->
            <PropertyItem
              v-for="property in getCategoryProperties(key)"
              :key="property.name"
              :property="property"
            />

            <!-- 显示特殊类别（选择器、规则、单位、函数） -->
            <div
              v-for="item in getCategoryItems(key)"
              :key="item.name"
              class="selector-item-mini"
            >
              <i :class="['fas', key === 'selectors' ? 'fa-crosshairs' : key === 'at-rules' ? 'fa-at' : key === 'units' ? 'fa-ruler-combined' : 'fa-function']"></i>
              <span class="selector-name">{{ item.name }}</span>
              <a
                v-if="item.mdn"
                :href="item.mdn"
                target="_blank"
                class="mdn-link-mini"
                @click.stop
              >
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { categories, cssProperties, cssSelectors, cssAtRules, cssUnits, cssFunctions, allCSSData } from '../../data/cssData';
import PropertyItem from './PropertyItem.vue';

// 改为单选模式：每次只能展开一个分类
const expandedCategory = ref<string | null>('all');

const allProperties = computed(() => cssProperties);
const allSelectors = computed(() => cssSelectors);
const allAtRules = computed(() => cssAtRules);
const allUnits = computed(() => cssUnits);
const allFunctions = computed(() => cssFunctions);

const totalCount = computed(() => {
  return allCSSData.length;
});

const getCategoryProperties = (category: string) => {
  if (category === 'selectors' || category === 'at-rules' || category === 'units' || category === 'functions') {
    return [];
  }
  return cssProperties.filter(p => p.category === category);
};

const getCategoryItems = (category: string) => {
  switch (category) {
    case 'selectors':
      return cssSelectors;
    case 'at-rules':
      return cssAtRules;
    case 'units':
      return cssUnits;
    case 'functions':
      return cssFunctions;
    default:
      return [];
  }
};

const getCategoryCount = (category: string) => {
  return categories[category]?.count || 0;
};

const toggleCategory = (category: string) => {
  // 如果点击的是当前展开的分类，则收起
  // 否则展开新的分类（自动关闭之前的）
  if (expandedCategory.value === category) {
    expandedCategory.value = null;
  } else {
    expandedCategory.value = category;
  }
};
</script>

<style scoped>
.category-filter {
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border-primary);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.filter-header i {
  font-size: 11px;
}

.category-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
  /* 隐藏滚动条但保留滚动功能 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.category-list::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.category-section {
  margin-bottom: 2px;
}

.category-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--color-bg-primary);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  position: sticky;
  top: 0;
  z-index: 10;
}

.category-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: transparent;
  transition: all 0.2s;
}

.category-item:hover {
  background: var(--color-bg-secondary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.category-item:hover::before {
  background: var(--color-primary);
}

.category-item.active {
  background: var(--color-primary-lighter);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-item.active::before {
  background: var(--color-primary);
}

.category-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: 8px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.category-item:hover .category-icon {
  background: var(--color-border-secondary);
  transform: scale(1.05);
}

.category-item.active .category-icon {
  background: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.category-icon i {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.category-item.active .category-icon i {
  color: white;
}

.category-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.category-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.category-item.active .category-name {
  color: var(--color-primary);
  font-weight: 600;
}

.category-count {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
  padding: 3px 10px;
  border-radius: 10px;
  min-width: 32px;
  text-align: center;
}

.category-item:hover .category-count {
  background: var(--color-border-secondary);
  color: var(--color-text-secondary);
}

.category-item.active .category-count {
  background: var(--color-primary);
  color: white;
}

.arrow {
  font-size: 10px;
  color: var(--color-border-secondary);
  transition: all 0.2s;
}

.category-item:hover .arrow {
  color: var(--color-text-muted);
}

.category-item.active .arrow {
  color: var(--color-primary);
}

.divider {
  height: 1px;
  background: var(--color-border-primary);
  margin: 8px 16px;
}

/* 属性列表区域 */
.property-items {
  background: var(--color-bg-secondary);
  border-left: 3px solid var(--color-border-primary);
  margin-left: 16px;
  padding: 4px 0;
}

/* 选择器迷你项 */
.selector-item-mini {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin: 4px 8px;
  background: var(--card-bg);
  border-radius: 6px;
  border: 1px solid var(--color-border-primary);
  font-size: 12px;
  transition: all 0.2s;
}

.selector-item-mini:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.selector-item-mini i:first-child {
  color: var(--color-primary);
  font-size: 11px;
}

.selector-name {
  flex: 1;
  color: var(--color-text-primary);
  font-weight: 500;
}

.mdn-link-mini {
  color: var(--color-info);
  text-decoration: none;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.mdn-link-mini:hover {
  background: var(--color-primary-lighter);
}

.mdn-link-mini i {
  font-size: 10px;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 2000px;
  opacity: 1;
}
</style>
