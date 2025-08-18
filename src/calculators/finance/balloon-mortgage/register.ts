import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BalloonMortgageCalculator } from './BalloonMortgageCalculator';

// Register the Balloon Mortgage Calculator
calculatorRegistry.register(BalloonMortgageCalculator);

console.log('✅ Balloon Mortgage Calculator registered successfully');
