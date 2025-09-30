import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialInnovationCalculator } from './FinancialInnovationCalculator';

export function registerFinancialInnovationCalculator(): void {
  calculatorRegistry.register(FinancialInnovationCalculator);
}

export { FinancialInnovationCalculator };
