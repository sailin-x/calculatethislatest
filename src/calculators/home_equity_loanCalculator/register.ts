import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_equity_loanCalculator } from './home_equity_loanCalculator';

export function registerhome_equity_loanCalculator(): void {
  calculatorRegistry.register(new home_equity_loanCalculator());
}
