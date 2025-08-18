import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BareboatCharterCalculator } from './BareboatCharterCalculator';

// Register the Bareboat Charter Calculator
calculatorRegistry.register(BareboatCharterCalculator);

console.log('✅ Bareboat Charter Calculator registered successfully');
