import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialRiskCalculator } from './FinancialRiskCalculator';

export function registerFinancialRiskCalculator(): void {
  calculatorRegistry.register(FinancialRiskCalculator);
}

export { FinancialRiskCalculator };
