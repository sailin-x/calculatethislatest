import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fha_loanCalculator } from './fha_loanCalculator';

export function registerfha_loanCalculator(): void {
  calculatorRegistry.register(new fha_loanCalculator());
}
