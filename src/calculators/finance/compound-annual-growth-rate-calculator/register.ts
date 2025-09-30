import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { compoundAnnualGrowthRateCalculator } from './CompoundAnnualGrowthRateCalculator';

/**
 * Register the Compound Annual Growth Rate Calculator
 */
export function registerCompoundAnnualGrowthRateCalculator(): void {
  calculatorRegistry.register(compoundAnnualGrowthRateCalculator);
}