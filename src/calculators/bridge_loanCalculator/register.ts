import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bridge_loanCalculator } from './bridge_loanCalculator';

export function registerbridge_loanCalculator(): void {
  calculatorRegistry.register(new bridge_loanCalculator());
}
