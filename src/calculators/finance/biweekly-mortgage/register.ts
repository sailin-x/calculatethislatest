import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BiweeklyMortgageCalculator } from './BiweeklyMortgageCalculator';

// Register the Biweekly Mortgage Calculator
calculatorRegistry.register(BiweeklyMortgageCalculator);

console.log('✅ Biweekly Mortgage Calculator registered successfully');
