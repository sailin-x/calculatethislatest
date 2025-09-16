import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { realEstateTaxDeductionsCalculator } from './RealEstateTaxDeductionsCalculator';

/**
 * Register the Real Estate Tax Deductions Calculator
 */
export function registerRealEstateTaxDeductionsCalculator(): void {
  calculatorRegistry.register(realEstateTaxDeductionsCalculator);
}