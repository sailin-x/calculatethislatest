import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MortgageRateLockCalculator } from './MortgageRateLockCalculator';

export function registerMortgageRateLockCalculator(): void {
  calculatorRegistry.register(MortgageRateLockCalculator);
}