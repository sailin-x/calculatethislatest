import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialWellnessCalculator } from './FinancialWellnessCalculator';

export function registerFinancialWellnessCalculator(): void {
  calculatorRegistry.register(FinancialWellnessCalculator);
}

export { FinancialWellnessCalculator };
