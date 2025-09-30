import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialSustainabilityCalculator } from './FinancialSustainabilityCalculator';

export function registerFinancialSustainabilityCalculator(): void {
  calculatorRegistry.register(FinancialSustainabilityCalculator);
}

export { FinancialSustainabilityCalculator };
