import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialIntelligenceCalculator } from './FinancialIntelligenceCalculator';

export function registerFinancialIntelligenceCalculator(): void {
  calculatorRegistry.register(FinancialIntelligenceCalculator);
}

export { FinancialIntelligenceCalculator };
