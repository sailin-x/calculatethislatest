import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialStabilityCalculator } from './FinancialStabilityCalculator';

export function registerFinancialStabilityCalculator(): void {
  calculatorRegistry.register(FinancialStabilityCalculator);
}

export { FinancialStabilityCalculator };
