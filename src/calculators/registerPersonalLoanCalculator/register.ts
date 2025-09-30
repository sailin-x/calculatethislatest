import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPersonalLoanCalculatorCalculator } from './registerPersonalLoanCalculatorCalculator';

export function registerregisterPersonalLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new registerPersonalLoanCalculatorCalculator());
}
