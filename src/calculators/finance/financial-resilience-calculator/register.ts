import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialResilienceCalculator } from './FinancialResilienceCalculator';

export function registerFinancialResilienceCalculator(): void {
  calculatorRegistry.register(FinancialResilienceCalculator);
}

export { FinancialResilienceCalculator };
