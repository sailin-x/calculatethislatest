import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CashOnCashReturnCalculator } from './CashOnCashReturnCalculator';

// Register the CashOnCash Return Calculator
calculatorRegistry.register(CashOnCashReturnCalculator);

console.log('✅ CashOnCash Return Calculator registered successfully');
