import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CreditUtilizationCalculatorCalculator } from './CreditUtilizationCalculatorCalculator';

export function registerCreditUtilizationCalculatorCalculator(): void {
  calculatorRegistry.register(new CreditUtilizationCalculatorCalculator());
}
