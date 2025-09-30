import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialCoachingCalculator } from './FinancialCoachingCalculator';

export function registerFinancialCoachingCalculator(): void {
  calculatorRegistry.register(FinancialCoachingCalculator);
}

export { FinancialCoachingCalculator };
