import { calculatorRegistry } from '../../data/calculatorRegistry';
import { construction_loanCalculator } from './construction_loanCalculator';

export function registerconstruction_loanCalculator(): void {
  calculatorRegistry.register(new construction_loanCalculator());
}
