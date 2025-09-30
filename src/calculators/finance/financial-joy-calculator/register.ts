import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialJoyCalculator } from './FinancialJoyCalculator';

export function registerFinancialJoyCalculator(): void {
  calculatorRegistry.register(FinancialJoyCalculator);
}

export { FinancialJoyCalculator };
