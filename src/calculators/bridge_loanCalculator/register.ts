import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bridge_loanCalculatorCalculator } from './bridge_loanCalculatorCalculator';

export function registerbridge_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new bridge_loanCalculatorCalculator());
}
