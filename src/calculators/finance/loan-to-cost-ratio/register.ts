import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { LoanToCostRatioCalculator } from './LoanToCostRatioCalculator';

export function registerLoanToCostRatioCalculator(registry: CalculatorRegistry): void {
  registry.register(LoanToCostRatioCalculator);
}

export { LoanToCostRatioCalculator };
