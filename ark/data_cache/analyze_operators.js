const fs = require('fs');

// 读取 JSON 文件（假设文件名为 origin_ops.json）
const raw = fs.readFileSync('./origin_ops.json', 'utf8');
const data = JSON.parse(raw);

// 获取所有干员 key
const keys = Object.keys(data);
console.log(`📊 总干员条目数: ${keys.length}`);

// 统计各类干员
let totalOperators = 0;
let totalSpChars = 0;
let notObtainable = 0;
let isSpChar = 0;

keys.forEach(key => {
  const op = data[key];
  totalOperators++;
  if (op.isSpChar) isSpChar++;
  if (op.isNotObtainable) notObtainable++;
});

console.log(`\n🔍 统计数据:`);
console.log(`   - 总条目: ${totalOperators}`);
console.log(`   - isSpChar = true: ${isSpChar}`);
console.log(`   - isNotObtainable = true: ${notObtainable}`);
console.log(`   - 可获取干员 (isNotObtainable === false): ${totalOperators - notObtainable}`);

// 列出 isSpChar 或 isNotObtainable 的干员
console.log(`\n📋 特殊标记干员:`);
keys.forEach(key => {
  const op = data[key];
  const flags = [];
  if (op.isSpChar) flags.push('SP');
  if (op.isNotObtainable) flags.push('不可获取');
  if (flags.length > 0) {
    console.log(`   ${key} (${op.name || op.appellation || '未命名'}) -> ${flags.join(', ')}`);
  }
});

// 检查是否有 isSpChar 且 isNotObtainable 同时为 true 的
console.log(`\n⚠️ 特殊检查:`);
let spAndNotObtainable = 0;
keys.forEach(key => {
  const op = data[key];
  if (op.isSpChar && op.isNotObtainable) {
    spAndNotObtainable++;
    console.log(`   ${key} 同时是 SP 且不可获取`);
  }
});
console.log(`   同时标记 SP + 不可获取: ${spAndNotObtainable}`);

// 计算最终筛选结果（假设你的筛选逻辑是：只取 isNotObtainable === false 且 isSpChar === false）
console.log(`\n🎯 可能的筛选逻辑分析:`);
console.log(`   如果只取 isNotObtainable === false: ${totalOperators - notObtainable}`);
console.log(`   如果只取 isSpChar === false: ${totalOperators - isSpChar}`);
console.log(`   如果两个条件都排除: ${totalOperators - isSpChar - notObtainable + spAndNotObtainable}`);

// 列出所有 isSpChar 的干员
console.log(`\n📌 所有 isSpChar = true 的干员:`);
keys.forEach(key => {
  const op = data[key];
  if (op.isSpChar) {
    console.log(`   ${key} - ${op.name || op.appellation || '未命名'}`);
  }
});

// 列出所有 isNotObtainable = true 的干员
console.log(`\n📌 所有 isNotObtainable = true 的干员:`);
keys.forEach(key => {
  const op = data[key];
  if (op.isNotObtainable) {
    console.log(`   ${key} - ${op.name || op.appellation || '未命名'}`);
  }
});

// 检查是否有重复 key 或缺失字段
console.log(`\n✅ 数据完整性检查:`);
let missingName = 0;
let missingAppellation = 0;
keys.forEach(key => {
  const op = data[key];
  if (!op.name && !op.appellation) missingName++;
  if (!op.profession) missingAppellation++;
});
console.log(`   - 没有名字的条目: ${missingName}`);
console.log(`   - 没有职业的条目: ${missingAppellation}`);
