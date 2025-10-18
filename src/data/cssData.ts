// CSS 数据（从 MDN 导入）
import type {
  CSSPropertyDefinition,
  CSSSelectorDefinition,
  CSSAtRuleDefinition,
  CSSUnitDefinition,
  CSSFunctionDefinition,
  CSSDataItem
} from '../types';
import processedData from './processed-css-data.json';

// 类型转换和过滤
export const cssProperties: CSSPropertyDefinition[] = processedData.properties
  .filter(prop => prop.category !== 'selectors' && prop.category !== 'at-rules' && prop.category !== 'units' && prop.category !== 'functions')
  .map(prop => ({
    ...prop,
    defaultValue: typeof prop.initial === 'string' ? prop.initial : prop.initial?.[0] || '',
  })) as CSSPropertyDefinition[];

export const cssSelectors: CSSSelectorDefinition[] = processedData.selectors as CSSSelectorDefinition[];
export const cssAtRules: CSSAtRuleDefinition[] = processedData.atRules as CSSAtRuleDefinition[];
export const cssUnits: CSSUnitDefinition[] = processedData.units as CSSUnitDefinition[];
export const cssFunctions: CSSFunctionDefinition[] = processedData.functions as CSSFunctionDefinition[];

export const allCSSData: CSSDataItem[] = [
  ...cssProperties,
  ...cssSelectors,
  ...cssAtRules,
  ...cssUnits,
  ...cssFunctions
];

// 分类信息
export const categories = {
  layout: { label: '布局', icon: 'fa-th-large', count: 0 },
  size: { label: '尺寸', icon: 'fa-ruler', count: 0 },
  typography: { label: '字体', icon: 'fa-font', count: 0 },
  color: { label: '颜色', icon: 'fa-palette', count: 0 },
  background: { label: '背景', icon: 'fa-image', count: 0 },
  border: { label: '边框', icon: 'fa-border-all', count: 0 },
  transform: { label: '变换', icon: 'fa-sync', count: 0 },
  animation: { label: '动画', icon: 'fa-play', count: 0 },
  effects: { label: '效果', icon: 'fa-magic', count: 0 },
  selectors: { label: '选择器', icon: 'fa-crosshairs', count: 0 },
  'at-rules': { label: 'At-Rules', icon: 'fa-at', count: 0 },
  units: { label: '单位', icon: 'fa-ruler-combined', count: 0 },
  functions: { label: '函数', icon: 'fa-code', count: 0 },
  other: { label: '其他', icon: 'fa-ellipsis-h', count: 0 },
};

// 计算每个分类的数量
cssProperties.forEach(prop => {
  if (categories[prop.category]) {
    categories[prop.category].count++;
  }
});

cssSelectors.forEach(() => {
  categories.selectors.count++;
});

cssAtRules.forEach(() => {
  categories['at-rules'].count++;
});

cssUnits.forEach(() => {
  categories.units.count++;
});

cssFunctions.forEach(() => {
  categories.functions.count++;
});

// 元数据
export const metadata = processedData.metadata;

console.log('✅ 加载了', cssProperties.length, '个 CSS 属性');
console.log('✅ 加载了', cssSelectors.length, '个 CSS 选择器');
console.log('✅ 加载了', cssAtRules.length, '个 At-Rules');
console.log('✅ 加载了', cssFunctions.length, '个 CSS 函数');
console.log('✅ 加载了', cssUnits.length, '个单位');
console.log('📦 总计:', metadata.total, '项');

