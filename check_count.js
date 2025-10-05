const { calculatorRegistry } = require('./src/data/calculatorRegistry.ts');

console.log('Total registered calculators:', calculatorRegistry.getTotalCount());

const categories = ['finance', 'legal', 'business', 'health', 'construction', 'math', 'lifestyle'];
categories.forEach(cat => {
  console.log(`${cat}: ${calculatorRegistry.getCategoryCount(cat)}`);
});