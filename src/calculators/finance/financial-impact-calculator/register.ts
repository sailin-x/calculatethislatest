import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialImpactCalculator } from './FinancialImpactCalculator';

export function registerFinancialImpactCalculator(): void {
  calculatorRegistry.register(FinancialImpactCalculator);
}

export { FinancialImpactCalculator };
