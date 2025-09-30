import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtPayoffCalculatorCalculator } from './registerDebtPayoffCalculatorCalculator';

export function registerregisterDebtPayoffCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDebtPayoffCalculatorCalculator());
}
