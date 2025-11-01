import { calculatorRegistry } from '../../data/calculatorRegistry';
import { personalLoanCalculator } from './personalLoanCalculator';

export function registerpersonalLoanCalculator(): void {
  calculatorRegistry.register(new personalLoanCalculator());
}
