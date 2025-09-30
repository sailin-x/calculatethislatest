import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BalancedScorecardCalculator } from './BalancedScorecardCalculator';

export function registerBalancedScorecardCalculator(): void {
  calculatorRegistry.register(BalancedScorecardCalculator);
}

export { BalancedScorecardCalculator };
