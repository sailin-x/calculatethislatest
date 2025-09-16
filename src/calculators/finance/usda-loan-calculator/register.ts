import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { usdaLoanCalculator } from './USDALoanCalculator';

/**
 * Register the USDA Loan Calculator
 */
export function registerUSDALoanCalculator(): void {
  calculatorRegistry.register(usdaLoanCalculator);
}