import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { iraCalculator } from './IRACalculator';

/**
 * Register the IRA Calculator
 */
export function registerIRACalculator(): void {
  calculatorRegistry.register(iraCalculator);
}