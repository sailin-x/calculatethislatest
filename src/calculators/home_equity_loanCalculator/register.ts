import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_equity_loanCalculatorCalculator } from './home_equity_loanCalculatorCalculator';

export function registerhome_equity_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new home_equity_loanCalculatorCalculator());
}
