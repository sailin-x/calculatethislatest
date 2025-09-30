import { calculatorRegistry } from '../../data/calculatorRegistry';
import { construction_loanCalculatorCalculator } from './construction_loanCalculatorCalculator';

export function registerconstruction_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new construction_loanCalculatorCalculator());
}
