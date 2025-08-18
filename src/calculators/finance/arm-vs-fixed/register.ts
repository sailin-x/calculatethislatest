import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ARMvsFixedCalculator } from './ARMvsFixedCalculator';

// Register the ARM vs Fixed Calculator
calculatorRegistry.register(ARMvsFixedCalculator);

console.log('✅ ARM vs Fixed Calculator registered successfully');