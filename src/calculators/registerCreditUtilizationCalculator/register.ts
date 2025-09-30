import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCreditUtilizationCalculatorCalculator } from './registerCreditUtilizationCalculatorCalculator';

export function registerregisterCreditUtilizationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCreditUtilizationCalculatorCalculator());
}
