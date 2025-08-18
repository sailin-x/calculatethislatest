import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HardMoneyLoanCalculator } from './HardMoneyLoanCalculator';

export function registerHardMoneyLoanCalculator(registry: CalculatorRegistry): void {
  registry.register(HardMoneyLoanCalculator);
}

export { HardMoneyLoanCalculator };
