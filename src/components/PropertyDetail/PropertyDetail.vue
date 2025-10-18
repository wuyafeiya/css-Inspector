<template>
  <div class="property-detail">
    <div class="panel-header">
      <h2>属性详情</h2>
    </div>

    <div class="detail-content">
      <div v-if="selectedProperty" class="property-info">
        <!-- 属性名称 -->
        <div class="property-title">
          <h3>{{ selectedProperty.name }}</h3>
          <a
            v-if="selectedProperty.mdn"
            :href="selectedProperty.mdn"
            target="_blank"
            class="mdn-link"
            title="在 MDN 上查看"
          >
            <i class="fas fa-external-link-alt"></i>
            MDN 文档
          </a>
        </div>

        <!-- 属性描述 -->
        <div class="property-section">
          <h4><i class="fas fa-info-circle"></i> 描述</h4>
          <p class="description">{{ selectedProperty.description }}</p>
        </div>

        <!-- 语法 -->
        <div v-if="selectedProperty.syntax" class="property-section">
          <h4><i class="fas fa-code"></i> 语法</h4>
          <code class="syntax-code">{{ selectedProperty.syntax }}</code>
        </div>

        <!-- 初始值 -->
        <div v-if="selectedProperty.initial" class="property-section">
          <h4><i class="fas fa-play"></i> 初始值</h4>
          <code class="initial-value">{{ selectedProperty.initial }}</code>
        </div>

        <!-- 继承性 -->
        <div class="property-section">
          <h4><i class="fas fa-sitemap"></i> 继承</h4>
          <span class="badge" :class="selectedProperty.inherited ? 'badge-yes' : 'badge-no'">
            {{ selectedProperty.inherited ? '是' : '否' }}
          </span>
        </div>

        <!-- 分类 -->
        <div class="property-section">
          <h4><i class="fas fa-tag"></i> 分类</h4>
          <span class="category-badge">{{ getCategoryLabel(selectedProperty.category) }}</span>
        </div>

        <!-- 类型 -->
        <div class="property-section">
          <h4><i class="fas fa-shapes"></i> 值类型</h4>
          <span class="type-badge">{{ selectedProperty.type }}</span>
        </div>

        <!-- 可能的值 -->
        <div v-if="selectedProperty.possibleValues && selectedProperty.possibleValues.length > 0" class="property-section">
          <h4><i class="fas fa-list"></i> 可选值</h4>
          <div class="possible-values">
            <span
              v-for="value in selectedProperty.possibleValues"
              :key="value"
              class="value-chip"
            >
              {{ value }}
            </span>
          </div>
        </div>

        <!-- 示例 -->
        <div class="property-section">
          <h4><i class="fas fa-lightbulb"></i> 示例</h4>
          <div class="examples">
            <div class="example-item">
              <code>{{ selectedProperty.name }}: {{ getExampleValue(selectedProperty) }};</code>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <i class="fas fa-hand-pointer"></i>
        <p>选择一个属性</p>
        <p class="hint">从左侧属性库中点击任意属性查看详情</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCSSEditor } from '../../composables/useCSSEditor';
import { categories } from '../../data/cssData';
import type { CSSPropertyDefinition } from '../../types';

const { selectedProperty } = useCSSEditor();

const getCategoryLabel = (category: string) => {
  return categories[category]?.label || category;
};

const getExampleValue = (property: CSSPropertyDefinition) => {
  if (property.possibleValues && property.possibleValues.length > 0) {
    return property.possibleValues[0];
  }
  if (property.initial) {
    return property.initial;
  }

  // 根据类型提供示例
  switch (property.type) {
    case 'color':
      return '#3b82f6';
    case 'length':
      return '16px';
    case 'number':
      return '1';
    case 'percentage':
      return '100%';
    case 'angle':
      return '45deg';
    case 'time':
      return '0.3s';
    default:
      return 'auto';
  }
};
</script>

<style scoped>
.property-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-primary);
  border-right: 1px solid var(--color-border-primary);
}

.panel-header {
  padding: 14px 16px;
  background: var(--header-gradient);
  border-bottom: 1px solid var(--color-border-primary);
  flex-shrink: 0;
}

.panel-header h2 {
  font-size: 15px;
  font-weight: 600;
  color: var(--header-text);
  margin: 0;
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  /* 隐藏滚动条但保留滚动功能 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.detail-content::-webkit-scrollbar {
  display: none;
}

.property-info {
  max-width: 600px;
}

.property-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-border-primary);
}

.property-title h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0;
  font-family: 'Courier New', monospace;
}

.mdn-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-info);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.mdn-link:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.property-section {
  margin-bottom: 20px;
}

.property-section h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.property-section h4 i {
  font-size: 11px;
  color: var(--color-primary);
}

.description {
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.6;
  margin: 0;
}

.syntax-code,
.initial-value {
  display: block;
  padding: 12px;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: var(--color-text-primary);
  overflow-x: auto;
  font-weight: 500;
}

.badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.badge-yes {
  background: rgba(16, 185, 129, 0.15);
  color: var(--color-success);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-no {
  background: rgba(239, 68, 68, 0.15);
  color: var(--color-error);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.category-badge,
.type-badge {
  display: inline-block;
  padding: 6px 14px;
  background: var(--color-primary-lighter);
  color: var(--color-primary);
  border: 1px solid var(--color-primary-alpha);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.possible-values {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.value-chip {
  padding: 6px 12px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  color: var(--color-text-primary);
  transition: all 0.2s;
  cursor: pointer;
  font-weight: 500;
}

.value-chip:hover {
  background: var(--color-primary-lighter);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-item {
  padding: 12px;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  border-left: 3px solid var(--color-primary);
}

.example-item code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--color-text-muted);
  padding: 40px 20px;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.empty-state p {
  margin: 8px 0;
  font-size: 15px;
  font-weight: 500;
}

.empty-state .hint {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 400;
}
</style>
