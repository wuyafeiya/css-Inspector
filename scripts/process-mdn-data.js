// 处理 MDN CSS 数据的脚本 - 完整版
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取所有 MDN 数据
const propertiesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mdn-properties.json'), 'utf-8'));
const selectorsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mdn-selectors.json'), 'utf-8'));
const atRulesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mdn-at-rules.json'), 'utf-8'));
const functionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mdn-functions.json'), 'utf-8'));
const unitsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mdn-units.json'), 'utf-8'));

// 分类映射
const categoryMapping = {
  // 布局相关
  'CSS Box Model': 'layout',
  'CSS Flexible Box Layout': 'layout',
  'CSS Grid Layout': 'layout',
  'CSS Positioning': 'layout',
  'CSS Display': 'layout',
  'CSS Multi-column Layout': 'layout',
  'CSS Fragmentation': 'layout',

  // 尺寸相关
  'CSS Box Sizing': 'size',
  'CSS Logical Properties': 'size',

  // 字体排版
  'CSS Fonts': 'typography',
  'CSS Text': 'typography',
  'CSS Text Decoration': 'typography',
  'CSS Writing Modes': 'typography',

  // 颜色
  'CSS Colors': 'color',

  // 背景
  'CSS Backgrounds and Borders': 'background',
  'CSS Images': 'background',

  // 变换
  'CSS Transforms': 'transform',

  // 动画
  'CSS Animations': 'animation',
  'CSS Transitions': 'animation',

  // 滤镜和效果
  'CSS Filter Effects': 'effects',
  'CSS Masking': 'effects',
  'CSS Compositing and Blending': 'effects',

  // 其他
  'CSS Counter Styles': 'other',
  'CSS Lists and Counters': 'other',
  'CSS Table': 'other',
  'CSS Basic User Interface': 'other',
};

// 分类 CSS 属性
function categorizeProperty(propertyName, groups) {
  const lowerName = propertyName.toLowerCase();

  // 边框相关
  if (lowerName.includes('border') || lowerName.includes('outline')) {
    return 'border';
  }

  // 背景相关（排除 border 后）
  if (lowerName.includes('background')) {
    return 'background';
  }

  // 根据分组判断
  if (!groups || groups.length === 0) return 'other';

  for (const group of groups) {
    if (categoryMapping[group]) {
      return categoryMapping[group];
    }
  }

  return 'other';
}

// 推断属性类型
function inferPropertyType(property, data) {
  const { syntax, initial } = data;
  const lowerName = property.toLowerCase();

  // 颜色类型
  if (lowerName.includes('color') ||
      syntax?.includes('<color>') ||
      ['currentcolor', 'transparent'].some(v => initial?.includes(v))) {
    return 'color';
  }

  // 长度类型
  if (syntax?.includes('<length>') ||
      syntax?.includes('<length-percentage>')) {
    return 'length';
  }

  // 数字类型
  if (syntax?.includes('<number>')) {
    return 'number';
  }

  // 角度类型
  if (syntax?.includes('<angle>')) {
    return 'angle';
  }

  // 百分比
  if (syntax?.includes('<percentage>')) {
    return 'percentage';
  }

  // 时间
  if (syntax?.includes('<time>')) {
    return 'time';
  }

  // 选择值（如果语法中有 | 分隔的多个关键字）
  if (syntax && /^[\w-]+(\s*\|\s*[\w-]+)+$/.test(syntax)) {
    return 'select';
  }

  return 'keyword';
}

// 提取可能的值
function extractPossibleValues(syntax) {
  if (!syntax) return undefined;

  // 匹配形如 "value1 | value2 | value3" 的语法
  const match = syntax.match(/^([\w-]+)(\s*\|\s*[\w-]+)+$/);
  if (match) {
    return syntax.split('|').map(v => v.trim());
  }

  return undefined;
}

// 处理属性数据
function processProperties() {
  const processed = [];

  const standardProperties = Object.entries(propertiesData).filter(([name, data]) => {
    return data.status === 'standard' &&
           !name.startsWith('-') &&
           !name.startsWith('--') &&
           name !== 'all';
  });

  for (const [name, data] of standardProperties) {
    const category = categorizeProperty(name, data.groups);
    const type = inferPropertyType(name, data);
    const possibleValues = extractPossibleValues(data.syntax);

    processed.push({
      name,
      category,
      type,
      syntax: data.syntax,
      initial: data.initial || '',
      inherited: data.inherited,
      description: `${name} - ${data.groups?.[0] || 'CSS Property'}`,
      possibleValues,
      mdn: data.mdn_url,
    });
  }

  return processed;
}

// 处理选择器数据
function processSelectors() {
  const processed = [];

  for (const [name, data] of Object.entries(selectorsData)) {
    if (data.status === 'standard') {
      processed.push({
        name,
        syntax: data.syntax,
        description: name,
        category: 'selectors',
        mdn: data.mdn_url,
      });
    }
  }

  return processed;
}

// 处理 At-Rules 数据
function processAtRules() {
  const processed = [];

  for (const [name, data] of Object.entries(atRulesData)) {
    if (data.status === 'standard') {
      processed.push({
        name,
        syntax: data.syntax,
        description: `${name} - ${data.groups?.[0] || 'CSS At-Rule'}`,
        category: 'at-rules',
        mdn: data.mdn_url,
      });
    }
  }

  return processed;
}

// 处理单位数据
function processUnits() {
  const processed = [];

  // 单位分类
  const unitCategories = {
    // 长度单位
    'px': 'length', 'em': 'length', 'rem': 'length', 'ch': 'length', 'ex': 'length',
    'vw': 'length', 'vh': 'length', 'vmin': 'length', 'vmax': 'length',
    'cm': 'length', 'mm': 'length', 'in': 'length', 'pt': 'length', 'pc': 'length',
    'cap': 'length', 'ic': 'length', 'lh': 'length', 'rlh': 'length',
    'vi': 'length', 'vb': 'length', 'svw': 'length', 'svh': 'length',
    'lvw': 'length', 'lvh': 'length', 'dvw': 'length', 'dvh': 'length',

    // 角度单位
    'deg': 'angle', 'grad': 'angle', 'rad': 'angle', 'turn': 'angle',

    // 时间单位
    's': 'time', 'ms': 'time',

    // 频率单位
    'hz': 'frequency', 'khz': 'frequency',

    // 分辨率单位
    'dpi': 'resolution', 'dpcm': 'resolution', 'dppx': 'resolution',

    // 百分比
    '%': 'percentage',

    // 其他
    'fr': 'flex',
  };

  for (const [name, data] of Object.entries(unitsData)) {
    if (data.status === 'standard') {
      const unitType = unitCategories[name.toLowerCase()] || 'other';

      processed.push({
        name,
        type: unitType,
        description: `${name} - ${data.groups?.[0] || 'CSS Unit'}`,
        category: 'units',
        mdn: data.mdn_url,
      });
    }
  }

  return processed;
}

// 处理函数数据
function processFunctions() {
  const processed = [];

  for (const [name, data] of Object.entries(functionsData)) {
    if (data.status === 'standard') {
      processed.push({
        name,
        syntax: data.syntax,
        description: `${name} - ${data.groups?.[0] || 'CSS Function'}`,
        category: 'functions',
        mdn: data.mdn_url,
      });
    }
  }

  return processed;
}

// 生成输出
const properties = processProperties();
const selectors = processSelectors();
const atRules = processAtRules();
const functions = processFunctions();
const units = processUnits();

console.log('📊 处理完成:');
console.log(`  ✅ ${properties.length} 个 CSS 属性`);
console.log(`  ✅ ${selectors.length} 个 CSS 选择器`);
console.log(`  ✅ ${atRules.length} 个 At-Rules`);
console.log(`  ✅ ${functions.length} 个 CSS 函数`);
console.log(`  ✅ ${units.length} 个单位`);
console.log(`  📦 总计: ${properties.length + selectors.length + atRules.length + functions.length + units.length} 项`);

// 按分类统计属性
const categoryStats = {};
properties.forEach(prop => {
  categoryStats[prop.category] = (categoryStats[prop.category] || 0) + 1;
});

console.log('\n📁 属性分类统计:');
console.log(JSON.stringify(categoryStats, null, 2));

// 保存处理后的数据
const output = {
  properties,
  selectors,
  atRules,
  functions,
  units,
  metadata: {
    totalProperties: properties.length,
    totalSelectors: selectors.length,
    totalAtRules: atRules.length,
    totalFunctions: functions.length,
    totalUnits: units.length,
    total: properties.length + selectors.length + atRules.length + functions.length + units.length,
    categories: Object.keys(categoryStats),
    processedAt: new Date().toISOString(),
  }
};

fs.writeFileSync(
  path.join(__dirname, '../src/data/processed-css-data.json'),
  JSON.stringify(output, null, 2)
);

console.log('\n✅ 数据已保存到 src/data/processed-css-data.json');
