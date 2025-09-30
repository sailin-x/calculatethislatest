import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialLegacyCalculator } from './FinancialLegacyCalculator';

export function registerFinancialLegacyCalculator(): void {
  calculatorRegistry.register(FinancialLegacyCalculator);
}

export { FinancialLegacyCalculator };
