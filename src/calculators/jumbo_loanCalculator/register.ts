import { calculatorRegistry } from '../../data/calculatorRegistry';
import { jumbo_loanCalculator } from './jumbo_loanCalculator';

export function registerjumbo_loanCalculator(): void {
  calculatorRegistry.register(new jumbo_loanCalculator());
}
