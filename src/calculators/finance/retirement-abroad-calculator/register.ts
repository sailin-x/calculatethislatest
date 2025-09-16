import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { retirementAbroadCalculator } from './RetirementAbroadCalculator';

/**
 * Register the Retirement Abroad Calculator
 */
export function registerRetirementAbroadCalculator(): void {
  calculatorRegistry.register(retirementAbroadCalculator);
}