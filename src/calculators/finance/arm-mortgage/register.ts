import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ARMMortgageCalculator } from './ARMMortgageCalculator';

// Register the ARM Mortgage Calculator
calculatorRegistry.register(ARMMortgageCalculator);

console.log('✅ ARM Mortgage Calculator registered successfully');