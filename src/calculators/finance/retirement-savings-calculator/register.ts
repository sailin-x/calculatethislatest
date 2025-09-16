import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { retirementSavingsCalculator } from './RetirementSavingsCalculator';

/**
 * Register the Retirement Savings Calculator
 */
export function registerRetirementSavingsCalculator(): void {
  calculatorRegistry.register(retirementSavingsCalculator);
}