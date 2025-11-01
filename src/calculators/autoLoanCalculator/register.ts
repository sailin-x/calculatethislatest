import { calculatorRegistry } from '../../data/calculatorRegistry';
import { autoLoanCalculator } from './autoLoanCalculator';

export function registerautoLoanCalculator(): void {
  calculatorRegistry.register(new autoLoanCalculator());
}
