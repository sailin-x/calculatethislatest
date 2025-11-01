import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loan_to_costCalculator } from './loan_to_costCalculator';

export function registerloan_to_costCalculator(): void {
  calculatorRegistry.register(new loan_to_costCalculator());
}
