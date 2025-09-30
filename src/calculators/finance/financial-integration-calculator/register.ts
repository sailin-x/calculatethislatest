import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialIntegrationCalculator } from './FinancialIntegrationCalculator';

export function registerFinancialIntegrationCalculator(): void {
  calculatorRegistry.register(FinancialIntegrationCalculator);
}

export { FinancialIntegrationCalculator };
