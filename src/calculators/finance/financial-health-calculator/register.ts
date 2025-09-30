import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialHealthCalculator } from './FinancialHealthCalculator';

export function registerFinancialHealthCalculator(): void {
  calculatorRegistry.register(FinancialHealthCalculator);
}

export { FinancialHealthCalculator };
