import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialGrowthCalculator } from './FinancialGrowthCalculator';

export function registerFinancialGrowthCalculator(): void {
  calculatorRegistry.register(FinancialGrowthCalculator);
}

export { FinancialGrowthCalculator };
