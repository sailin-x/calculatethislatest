import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fha_loanCalculatorCalculator } from './fha_loanCalculatorCalculator';

export function registerfha_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new fha_loanCalculatorCalculator());
}
