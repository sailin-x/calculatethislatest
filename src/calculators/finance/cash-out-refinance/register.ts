import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CashOutRefinanceCalculator } from './CashOutRefinanceCalculator';

// Register the Cash-Out Refinance Calculator
calculatorRegistry.register(CashOutRefinanceCalculator);

console.log('✅ Cash-Out Refinance Calculator registered successfully');
