import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hard_money_loanCalculatorCalculator } from './hard_money_loanCalculatorCalculator';

export function registerhard_money_loanCalculatorCalculator(): void {
  calculatorRegistry.register(new hard_money_loanCalculatorCalculator());
}
