import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { comprehensiveMortgageCalculator } from './MortgageCalculator';

export function registerComprehensiveMortgageCalculator(): void {
  calculatorRegistry.register(comprehensiveMortgageCalculator);
}