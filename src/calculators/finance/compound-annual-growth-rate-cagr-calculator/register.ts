import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CompoundAnnualGrowthRateCagrCalculator } from './CompoundAnnualGrowthRateCagrCalculator';

export function registerCompoundAnnualGrowthRateCagrCalculator(): void {
  calculatorRegistry.register(CompoundAnnualGrowthRateCagrCalculator);
}

export { CompoundAnnualGrowthRateCagrCalculator };
