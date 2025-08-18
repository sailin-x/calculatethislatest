import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { ConstructionLoanCalculator } from './ConstructionLoanCalculator';

export function registerConstructionLoanCalculator(registry: CalculatorRegistry): void {
  registry.register(ConstructionLoanCalculator);
}

export { ConstructionLoanCalculator };
