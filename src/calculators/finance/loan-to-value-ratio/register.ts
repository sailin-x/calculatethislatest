import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { LoanToValueRatioCalculator } from './LoanToValueRatioCalculator';

export function registerLoanToValueRatioCalculator(registry: CalculatorRegistry): void {
  registry.register(LoanToValueRatioCalculator);
}

export { LoanToValueRatioCalculator };
