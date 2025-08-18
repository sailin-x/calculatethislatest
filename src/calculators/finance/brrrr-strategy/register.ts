import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BRRRRStrategyCalculator } from './BRRRRStrategyCalculator';

// Register the BRRRR Strategy Calculator
calculatorRegistry.register(BRRRRStrategyCalculator);

console.log('✅ BRRRR Strategy Calculator registered successfully');
