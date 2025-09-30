import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IncomeCalculator } from './IncomeCalculator';

export function registerIncomeCalculator(): void {
  calculatorRegistry.register(IncomeCalculator);
}

export { IncomeCalculator };
