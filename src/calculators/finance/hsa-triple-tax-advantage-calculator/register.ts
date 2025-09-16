import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { hsaTripleTaxAdvantageCalculator } from './HSATripleTaxAdvantageCalculator';

/**
 * Register the HSA Triple Tax Advantage Calculator
 */
export function registerHSATripleTaxAdvantageCalculator(): void {
  calculatorRegistry.register(hsaTripleTaxAdvantageCalculator);
}