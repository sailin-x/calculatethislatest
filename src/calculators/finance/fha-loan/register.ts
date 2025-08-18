import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { FHALoanCalculator } from './FHALoanCalculator';

export function registerFHALoanCalculator(registry: CalculatorRegistry): void {
  registry.register(FHALoanCalculator);
}

export { FHALoanCalculator };
