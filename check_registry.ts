import { calculatorRegistry } from './src/data/calculatorRegistry';
import { CalculatorCategory } from './src/types/calculator';

console.log('Total registered calculators:', calculatorRegistry.getTotalCount());

const categories: CalculatorCategory[] = ['finance', 'legal', 'business', 'health', 'construction', 'math', 'lifestyle'];
categories.forEach(cat => {
  console.log(`${cat}: ${calculatorRegistry.getCategoryCount(cat)}`);
});