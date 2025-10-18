import type { CSSPropertyDefinition, PreviewElement } from '../types';

export const cssProperties: CSSPropertyDefinition[] = [
  // 布局 Layout
  {
    name: 'display',
    category: 'layout',
    type: 'select',
    defaultValue: 'block',
    description: '设置元素的显示类型',
    possibleValues: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/display'
  },
  {
    name: 'position',
    category: 'layout',
    type: 'select',
    defaultValue: 'static',
    description: '设置元素的定位方式',
    possibleValues: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/position'
  },
  {
    name: 'flex-direction',
    category: 'layout',
    type: 'select',
    defaultValue: 'row',
    description: 'Flex容器主轴方向',
    possibleValues: ['row', 'row-reverse', 'column', 'column-reverse'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction'
  },
  {
    name: 'justify-content',
    category: 'layout',
    type: 'select',
    defaultValue: 'flex-start',
    description: '主轴上的对齐方式',
    possibleValues: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content'
  },
  {
    name: 'align-items',
    category: 'layout',
    type: 'select',
    defaultValue: 'stretch',
    description: '交叉轴上的对齐方式',
    possibleValues: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items'
  },
  {
    name: 'gap',
    category: 'layout',
    type: 'length',
    defaultValue: '0px',
    description: 'Flex/Grid项目之间的间距',
    unit: 'px',
    min: 0,
    max: 100,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap'
  },

  // 尺寸 Size
  {
    name: 'width',
    category: 'size',
    type: 'length',
    defaultValue: 'auto',
    description: '元素宽度',
    unit: 'px',
    min: 0,
    max: 1000,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/width'
  },
  {
    name: 'height',
    category: 'size',
    type: 'length',
    defaultValue: 'auto',
    description: '元素高度',
    unit: 'px',
    min: 0,
    max: 1000,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/height'
  },
  {
    name: 'max-width',
    category: 'size',
    type: 'length',
    defaultValue: 'none',
    description: '元素最大宽度',
    unit: 'px',
    min: 0,
    max: 1000,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width'
  },
  {
    name: 'min-height',
    category: 'size',
    type: 'length',
    defaultValue: '0px',
    description: '元素最小高度',
    unit: 'px',
    min: 0,
    max: 1000,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height'
  },

  // 字体 Typography
  {
    name: 'font-size',
    category: 'typography',
    type: 'length',
    defaultValue: '16px',
    description: '字体大小',
    unit: 'px',
    min: 8,
    max: 120,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size'
  },
  {
    name: 'font-weight',
    category: 'typography',
    type: 'select',
    defaultValue: '400',
    description: '字体粗细',
    possibleValues: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight'
  },
  {
    name: 'line-height',
    category: 'typography',
    type: 'number',
    defaultValue: '1.5',
    description: '行高',
    min: 1,
    max: 3,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height'
  },
  {
    name: 'text-align',
    category: 'typography',
    type: 'select',
    defaultValue: 'left',
    description: '文本对齐',
    possibleValues: ['left', 'center', 'right', 'justify'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align'
  },
  {
    name: 'letter-spacing',
    category: 'typography',
    type: 'length',
    defaultValue: '0px',
    description: '字间距',
    unit: 'px',
    min: -5,
    max: 10,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing'
  },

  // 颜色 Color
  {
    name: 'color',
    category: 'color',
    type: 'color',
    defaultValue: '#000000',
    description: '文字颜色',
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/color'
  },
  {
    name: 'opacity',
    category: 'color',
    type: 'number',
    defaultValue: '1',
    description: '不透明度',
    min: 0,
    max: 1,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity'
  },

  // 背景 Background
  {
    name: 'background-color',
    category: 'background',
    type: 'color',
    defaultValue: 'transparent',
    description: '背景颜色',
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color'
  },
  {
    name: 'background-size',
    category: 'background',
    type: 'select',
    defaultValue: 'auto',
    description: '背景图片尺寸',
    possibleValues: ['auto', 'cover', 'contain'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size'
  },

  // 边框 Border
  {
    name: 'border-width',
    category: 'border',
    type: 'length',
    defaultValue: '0px',
    description: '边框宽度',
    unit: 'px',
    min: 0,
    max: 20,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width'
  },
  {
    name: 'border-style',
    category: 'border',
    type: 'select',
    defaultValue: 'solid',
    description: '边框样式',
    possibleValues: ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style'
  },
  {
    name: 'border-color',
    category: 'border',
    type: 'color',
    defaultValue: '#000000',
    description: '边框颜色',
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color'
  },
  {
    name: 'border-radius',
    category: 'border',
    type: 'length',
    defaultValue: '0px',
    description: '圆角半径',
    unit: 'px',
    min: 0,
    max: 100,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius'
  },

  // 间距
  {
    name: 'padding',
    category: 'size',
    type: 'length',
    defaultValue: '0px',
    description: '内边距',
    unit: 'px',
    min: 0,
    max: 100,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding'
  },
  {
    name: 'margin',
    category: 'size',
    type: 'length',
    defaultValue: '0px',
    description: '外边距',
    unit: 'px',
    min: -50,
    max: 100,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin'
  },

  // 变换 Transform
  {
    name: 'transform: rotate',
    category: 'transform',
    type: 'angle',
    defaultValue: '0deg',
    description: '旋转角度',
    unit: 'deg',
    min: -180,
    max: 180,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform'
  },
  {
    name: 'transform: scale',
    category: 'transform',
    type: 'number',
    defaultValue: '1',
    description: '缩放比例',
    min: 0.1,
    max: 3,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform'
  },

  // 动画 Animation
  {
    name: 'transition-duration',
    category: 'animation',
    type: 'time',
    defaultValue: '0s',
    description: '过渡时长',
    unit: 's',
    min: 0,
    max: 5,
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration'
  },

  // 其他 Other
  {
    name: 'box-shadow',
    category: 'other',
    type: 'text',
    defaultValue: 'none',
    description: '盒阴影',
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow'
  },
  {
    name: 'cursor',
    category: 'other',
    type: 'select',
    defaultValue: 'default',
    description: '鼠标指针样式',
    possibleValues: ['default', 'pointer', 'grab', 'text', 'move', 'not-allowed'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor'
  },
  {
    name: 'overflow',
    category: 'other',
    type: 'select',
    defaultValue: 'visible',
    description: '内容溢出处理',
    possibleValues: ['visible', 'hidden', 'scroll', 'auto'],
    mdn: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow'
  },
];

export const previewElements: PreviewElement[] = [
  {
    type: 'box',
    label: '方块',
    defaultContent: '',
  },
  {
    type: 'text',
    label: '文本',
    defaultContent: 'Hello CSS!',
  },
  {
    type: 'button',
    label: '按钮',
    defaultContent: 'Click Me',
  },
  {
    type: 'card',
    label: '卡片',
    defaultContent: 'Card Title\nThis is a card description.',
  },
];

export const categoryLabels: Record<string, string> = {
  all: '全部',
  layout: '布局',
  size: '尺寸',
  typography: '字体',
  color: '颜色',
  background: '背景',
  border: '边框',
  transform: '变换',
  animation: '动画',
  other: '其他',
};
