import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialIndependenceCalculator } from './FinancialIndependenceCalculator';

export function registerFinancialIndependenceCalculator(): void {
  calculatorRegistry.register(FinancialIndependenceCalculator);
}

export { FinancialIndependenceCalculator };
