import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { netUnrealizedAppreciationNUATaxCalculator } from './NetUnrealizedAppreciationNUATaxCalculator';

/**
 * Register the Net Unrealized Appreciation (NUA) Tax Calculator
 */
export function registerNetUnrealizedAppreciationNUATaxCalculator(): void {
  calculatorRegistry.register(netUnrealizedAppreciationNUATaxCalculator);
}