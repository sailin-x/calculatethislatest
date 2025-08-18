import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HomeEquityLoanCalculator } from './HomeEquityLoanCalculator';

export function registerHomeEquityLoanCalculator(registry: CalculatorRegistry): void {
  registry.register(HomeEquityLoanCalculator);
}

export { HomeEquityLoanCalculator };
