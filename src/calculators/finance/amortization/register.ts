import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AmortizationCalculator } from './AmortizationCalculator';

// Register the Amortization Calculator
calculatorRegistry.register(AmortizationCalculator);

console.log('✅ Amortization Calculator registered successfully');