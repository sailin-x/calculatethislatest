import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CashOnCashReturnCalculator } from './CashOnCashReturnCalculator';

// Register the Cash-on-Cash Return Calculator
calculatorRegistry.register(CashOnCashReturnCalculator);

console.log('✅ Cash-on-Cash Return Calculator registered successfully');
