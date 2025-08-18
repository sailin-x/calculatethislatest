import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CashFlowCalculator } from './CashFlowCalculator';

// Register the Cash Flow Calculator
calculatorRegistry.register(CashFlowCalculator);

console.log('✅ Cash Flow Calculator registered successfully');
