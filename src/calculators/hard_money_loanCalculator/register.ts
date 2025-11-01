import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hard_money_loanCalculator } from './hard_money_loanCalculator';

export function registerhard_money_loanCalculator(): void {
  calculatorRegistry.register(new hard_money_loanCalculator());
}
