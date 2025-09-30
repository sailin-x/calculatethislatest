import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loan_to_costCalculatorCalculator } from './loan_to_costCalculatorCalculator';

export function registerloan_to_costCalculatorCalculator(): void {
  calculatorRegistry.register(new loan_to_costCalculatorCalculator());
}
