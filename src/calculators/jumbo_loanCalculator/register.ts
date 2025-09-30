import { calculatorRegistry } from '../../data/calculatorRegistry';
import { jumbo_loanCalculatorCalculator } from './jumbo_loanCalculatorCalculator';

export function registerjumbo_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new jumbo_loanCalculatorCalculator());
}
