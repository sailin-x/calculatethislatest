import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BridgeLoanCalculator } from './BridgeLoanCalculator';

// Register the Bridge Loan Calculator
calculatorRegistry.register(BridgeLoanCalculator);

console.log('✅ Bridge Loan Calculator registered successfully');
