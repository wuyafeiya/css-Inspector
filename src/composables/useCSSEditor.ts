import { inject, provide, reactive, toRefs, type InjectionKey, type Ref } from 'vue';
import type { AppliedStyle, CSSCategory, PreviewElementType, CSSPropertyDefinition } from '../types';

// CSS编辑器状态
interface CSSEditorState {
  appliedStyles: AppliedStyle[];
  searchQuery: string;
  selectedCategory: CSSCategory | 'all';
  previewElement: PreviewElementType;
  selectedProperty: CSSPropertyDefinition | null;
}

// CSS编辑器状态（Ref 版本）
interface CSSEditorStateRefs {
  appliedStyles: Ref<AppliedStyle[]>;
  searchQuery: Ref<string>;
  selectedCategory: Ref<CSSCategory | 'all'>;
  previewElement: Ref<PreviewElementType>;
  selectedProperty: Ref<CSSPropertyDefinition | null>;
}

// CSS编辑器操作方法
interface CSSEditorActions {
  addStyle: (property: CSSPropertyDefinition, value: string) => void;
  updateStyle: (property: string, value: string) => void;
  removeStyle: (property: string) => void;
  resetStyles: () => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: CSSCategory | 'all') => void;
  setPreviewElement: (element: PreviewElementType) => void;
  selectProperty: (property: CSSPropertyDefinition | null) => void;
  getComputedStyles: () => Record<string, string>;
}

// CSS编辑器Context
interface CSSEditorContext extends CSSEditorStateRefs, CSSEditorActions {}

// Injection Key
const CSSEditorKey: InjectionKey<CSSEditorContext> = Symbol('CSSEditor');

export function useCSSEditorProvider() {
  const state = reactive<CSSEditorState>({
    appliedStyles: [],
    searchQuery: '',
    selectedCategory: 'all',
    previewElement: 'box',
    selectedProperty: null,
  });

  // 添加样式
  const addStyle = (property: CSSPropertyDefinition, value: string) => {
    const existing = state.appliedStyles.find(s => s.property === property.name);
    if (!existing) {
      state.appliedStyles.push({
        property: property.name,
        value,
        propertyDef: property,
      });
    }
  };

  // 更新样式值
  const updateStyle = (property: string, value: string) => {
    const style = state.appliedStyles.find(s => s.property === property);
    if (style) {
      style.value = value;
    }
  };

  // 删除样式
  const removeStyle = (property: string) => {
    const index = state.appliedStyles.findIndex(s => s.property === property);
    if (index !== -1) {
      state.appliedStyles.splice(index, 1);
    }
  };

  // 重置所有样式
  const resetStyles = () => {
    state.appliedStyles = [];
  };

  // 设置搜索关键词
  const setSearchQuery = (query: string) => {
    state.searchQuery = query;
  };

  // 设置分类过滤
  const setCategory = (category: CSSCategory | 'all') => {
    state.selectedCategory = category;
  };

  // 设置预览元素
  const setPreviewElement = (element: PreviewElementType) => {
    state.previewElement = element;
  };

  // 选择属性
  const selectProperty = (property: CSSPropertyDefinition | null) => {
    state.selectedProperty = property;
  };

  // 获取计算后的样式对象
  const getComputedStyles = (): Record<string, string> => {
    const styles: Record<string, string> = {};

    state.appliedStyles.forEach(({ property, value }) => {
      // 处理 transform 类型属性
      if (property && property.startsWith('transform:')) {
        const transformType = property.split(':')[1]?.trim();
        if (!styles.transform) {
          styles.transform = '';
        }

        if (transformType === 'rotate') {
          styles.transform += ` rotate(${value})`;
        } else if (transformType === 'scale') {
          styles.transform += ` scale(${value})`;
        }
      } else if (property) {
        styles[property] = value;
      }
    });

    return styles;
  };

  const context: CSSEditorContext = {
    ...toRefs(state),
    addStyle,
    updateStyle,
    removeStyle,
    resetStyles,
    setSearchQuery,
    setCategory,
    setPreviewElement,
    selectProperty,
    getComputedStyles,
  } as CSSEditorContext;

  provide(CSSEditorKey, context);

  return context;
}

// 使用Context的Hook
export function useCSSEditor(): CSSEditorContext {
  const context = inject(CSSEditorKey);
  if (!context) {
    throw new Error('useCSSEditor must be used within CSSEditorProvider');
  }
  return context;
}
