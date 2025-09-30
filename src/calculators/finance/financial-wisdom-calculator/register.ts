import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialWisdomCalculator } from './FinancialWisdomCalculator';

export function registerFinancialWisdomCalculator(): void {
  calculatorRegistry.register(FinancialWisdomCalculator);
}

export { FinancialWisdomCalculator };
