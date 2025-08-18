import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { DebtYieldRatioCalculator } from './DebtYieldRatioCalculator';

export function registerDebtYieldRatioCalculator(registry: CalculatorRegistry): void {
  registry.register(DebtYieldRatioCalculator);
}

export { DebtYieldRatioCalculator };
