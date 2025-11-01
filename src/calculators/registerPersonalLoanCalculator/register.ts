import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPersonalLoanCalculator } from './registerPersonalLoanCalculator';

export function registerregisterPersonalLoanCalculator(): void {
  calculatorRegistry.register(new registerPersonalLoanCalculator());
}
