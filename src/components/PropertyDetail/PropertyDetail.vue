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
          <div class="syntax-wrapper">
            <pre class="syntax-code" v-html="formatSyntax(selectedProperty.syntax)"></pre>
          </div>
        </div>

        <!-- 初始值 -->
        <div v-if="selectedProperty.initial" class="property-section">
          <h4><i class="fas fa-play"></i> 初始值</h4>
          <!-- 如果是数组（简写属性的子属性列表） -->
          <div v-if="Array.isArray(selectedProperty.initial)" class="sub-properties">
            <div class="sub-properties-hint">此简写属性包含以下子属性：</div>
            <div class="sub-properties-list">
              <a
                v-for="subProp in selectedProperty.initial"
                :key="subProp"
                class="sub-property-chip"
                @click="searchSubProperty(subProp)"
                :title="`点击查看 ${subProp}`"
              >
                <i class="fas fa-link"></i>
                {{ subProp }}
              </a>
            </div>
          </div>
          <!-- 如果是字符串 -->
          <code v-else class="initial-value">{{ selectedProperty.initial }}</code>
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
              <code v-if="!Array.isArray(selectedProperty.initial)">
                {{ selectedProperty.name }}: {{ getExampleValue(selectedProperty) }};
              </code>
              <div v-else class="shorthand-example">
                <div class="example-hint">
                  <i class="fas fa-info-circle"></i>
                  这是一个简写属性，可以同时设置以下子属性：
                </div>
                <code class="shorthand-syntax">
                  {{ selectedProperty.name }}: {{ getShorthandExample(selectedProperty.initial) }};
                </code>
              </div>
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
import { useCSSEditor } from '../../composables/useCSSEditor';
import { categories } from '../../data/cssData';
import { cssProperties } from '../../data/cssData';
import type { CSSPropertyDefinition } from '../../types';

const { selectedProperty, selectProperty } = useCSSEditor();

const getCategoryLabel = (category: string) => {
  return categories[category as keyof typeof categories]?.label || category;
};

const getExampleValue = (property: CSSPropertyDefinition) => {
  // 如果 initial 是数组，不在这里处理
  if (Array.isArray(property.initial)) {
    return '';
  }

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

// 为简写属性生成示例
const getShorthandExample = (subProperties: string[]) => {
  // 根据子属性生成示例值
  const exampleMap: Record<string, string> = {
    'border-width': '2px',
    'border-style': 'solid',
    'border-color': '#3b82f6',
    'color': '#333',
    'background-color': '#f5f5f5',
    'background-image': 'url(image.jpg)',
    'background-position': 'center',
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    'background-origin': 'padding-box',
    'background-clip': 'border-box',
    'background-attachment': 'scroll',
    'margin-top': '10px',
    'margin-right': '10px',
    'margin-bottom': '10px',
    'margin-left': '10px',
    'padding-top': '10px',
    'padding-right': '10px',
    'padding-bottom': '10px',
    'padding-left': '10px',
  };

  // 生成示例值
  const values = subProperties.map(prop => {
    return exampleMap[prop] || '10px';
  });

  return values.join(' ');
};

// 点击子属性，查找并显示该属性
const searchSubProperty = (subPropName: string) => {
  const property = cssProperties.find(p => p.name === subPropName);
  if (property) {
    selectProperty(property);
  }
};

// 格式化和高亮 CSS 语法
const formatSyntax = (syntax: string) => {
  if (!syntax) return '';

  let formatted = syntax;

  // 在长语法中添加换行（在 | 或 || 前后）
  if (syntax.length > 80) {
    formatted = formatted
      .replace(/\s*\|\|\s*/g, ' <span class="syntax-or">||</span><br/>  ')
      .replace(/\s*\|\s*/g, ' <span class="syntax-or">|</span><br/>  ');
  } else {
    formatted = formatted
      .replace(/\s*\|\|\s*/g, ' <span class="syntax-or">||</span> ')
      .replace(/\s*\|\s*/g, ' <span class="syntax-or">|</span> ');
  }

  // 高亮不同的语法元素
  formatted = formatted
    // 引用的属性名 <'property'>
    .replace(/<'([^']+)'>/g, '<span class="syntax-property">&lt;\'$1\'&gt;</span>')
    // 类型引用 <type>
    .replace(/<([^>'\s]+)>/g, '<span class="syntax-type">&lt;$1&gt;</span>')
    // 量词 ?, +, *, #, {n}, {n,m}
    .replace(/([?+*#]|\{[^}]+\})/g, '<span class="syntax-quantifier">$1</span>')
    // 方括号（分组）
    .replace(/\[/g, '<span class="syntax-bracket">[</span>')
    .replace(/\]/g, '<span class="syntax-bracket">]</span>')
    // 关键字（用单引号包围的）
    .replace(/'([^']+)'/g, '<span class="syntax-keyword">\'$1\'</span>');

  return formatted;
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

.syntax-wrapper {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  border-left: 3px solid var(--color-primary);
}

.syntax-code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: var(--color-text-primary);
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 语法高亮样式 */
.syntax-code :deep(.syntax-property) {
  color: #10b981;
  font-weight: 600;
}

.syntax-code :deep(.syntax-type) {
  color: #3b82f6;
  font-weight: 500;
}

.syntax-code :deep(.syntax-or) {
  color: #f59e0b;
  font-weight: 700;
  padding: 0 4px;
}

.syntax-code :deep(.syntax-quantifier) {
  color: #8b5cf6;
  font-weight: 700;
}

.syntax-code :deep(.syntax-bracket) {
  color: #6b7280;
  font-weight: 600;
}

.syntax-code :deep(.syntax-keyword) {
  color: #ef4444;
  font-weight: 500;
}

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

/* 子属性展示 */
.sub-properties {
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  padding: 14px;
  border-left: 3px solid var(--color-primary);
}

.sub-properties-hint {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
  font-weight: 500;
}

.sub-properties-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sub-property-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
  color: var(--color-text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.sub-property-chip i {
  font-size: 11px;
  color: var(--color-primary);
  opacity: 0.6;
  transition: all 0.2s;
}

.sub-property-chip:hover {
  background: var(--color-primary-lighter);
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.sub-property-chip:hover i {
  opacity: 1;
  transform: translateX(2px);
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

/* 简写属性示例 */
.shorthand-example {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.example-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
  background: var(--color-bg-secondary);
  padding: 8px 12px;
  border-radius: 6px;
}

.example-hint i {
  color: var(--color-info);
  font-size: 13px;
}

.shorthand-syntax {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
  display: block;
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
