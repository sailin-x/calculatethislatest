import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IncomeBasedRepaymentCalculator } from './IncomeBasedRepaymentCalculator';

export function registerIncomeBasedRepaymentCalculator(): void {
  calculatorRegistry.register(IncomeBasedRepaymentCalculator);
}

export { IncomeBasedRepaymentCalculator };
