import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { JumboLoanCalculator } from './JumboLoanCalculator';

export function registerJumboLoanCalculator(registry: CalculatorRegistry): void {
  registry.register(JumboLoanCalculator);
}

export { JumboLoanCalculator };
