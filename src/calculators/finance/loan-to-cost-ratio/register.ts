import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { loanToCostRatioCalculator } from './LoanToCostRatioCalculator';

export function registerLoanToCostRatioCalculator(): void {
  calculatorRegistry.register(loanToCostRatioCalculator);
}
