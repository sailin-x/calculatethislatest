import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialAdvisoryCalculator } from './FinancialAdvisoryCalculator';

export function registerFinancialAdvisoryCalculator(): void {
  calculatorRegistry.register(FinancialAdvisoryCalculator);
}

export { FinancialAdvisoryCalculator };
