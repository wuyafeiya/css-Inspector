// CSS 属性类型定义
export type CSSPropertyType =
  | 'color'
  | 'length'
  | 'number'
  | 'keyword'
  | 'select'
  | 'text'
  | 'angle'
  | 'percentage'
  | 'time'
  | 'multi-value';

// CSS 数据项分类（属性 + 选择器 + 规则 + 单位 + 函数）
export type CSSCategory =
  | 'layout'
  | 'size'
  | 'typography'
  | 'color'
  | 'background'
  | 'border'
  | 'transform'
  | 'animation'
  | 'effects'
  | 'selectors'
  | 'at-rules'
  | 'units'
  | 'functions'
  | 'other';

// CSS 属性分类（向后兼容）
export type CSSPropertyCategory = Exclude<CSSCategory, 'selectors' | 'at-rules' | 'units' | 'functions'>;

// CSS 属性定义
export interface CSSPropertyDefinition {
  name: string;
  category: CSSPropertyCategory;
  type: CSSPropertyType;
  syntax?: string;
  initial?: string | string[];
  inherited?: boolean;
  defaultValue?: string; // 向后兼容
  description: string;
  possibleValues?: string[];
  min?: number;
  max?: number;
  unit?: string;
  mdn?: string;
}

// CSS 选择器定义
export interface CSSSelectorDefinition {
  name: string;
  syntax: string;
  description: string;
  category: 'selectors';
  mdn?: string;
}

// CSS At-Rule 定义
export interface CSSAtRuleDefinition {
  name: string;
  syntax: string;
  description: string;
  category: 'at-rules';
  mdn?: string;
}

// CSS 单位定义
export interface CSSUnitDefinition {
  name: string;
  type: 'length' | 'angle' | 'time' | 'frequency' | 'resolution' | 'percentage' | 'flex' | 'other';
  description: string;
  category: 'units';
  mdn?: string;
}

// CSS 函数定义
export interface CSSFunctionDefinition {
  name: string;
  syntax: string;
  description: string;
  category: 'functions';
  mdn?: string;
}

// CSS 数据项（属性、选择器、规则、单位、函数）
export type CSSDataItem =
  | CSSPropertyDefinition
  | CSSSelectorDefinition
  | CSSAtRuleDefinition
  | CSSUnitDefinition
  | CSSFunctionDefinition;

// 当前应用的CSS样式
export interface AppliedStyle {
  property: string;
  value: string;
  propertyDef: CSSPropertyDefinition;
}

// 预览元素类型
export type PreviewElementType = 'box' | 'text' | 'button' | 'card' | 'image';

// 预览元素定义
export interface PreviewElement {
  type: PreviewElementType;
  label: string;
  defaultContent?: string;
  icon?: string;
}

// CSS编辑器状态
export interface CSSEditorState {
  appliedStyles: AppliedStyle[];
  searchQuery: string;
  selectedCategory: CSSCategory | 'all';
  previewElement: PreviewElementType;
}
