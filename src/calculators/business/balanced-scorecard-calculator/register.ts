import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BalancedScorecardCalculator } from './BalancedScorecardCalculator';

export function registerBalancedScorecardCalculator() {
  calculatorRegistry.register(BalancedScorecardCalculator);
}
