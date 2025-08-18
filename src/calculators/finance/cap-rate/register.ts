import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CapRateCalculator } from './CapRateCalculator';

// Register the Cap Rate Calculator
calculatorRegistry.register(CapRateCalculator);

console.log('✅ Cap Rate Calculator registered successfully');
