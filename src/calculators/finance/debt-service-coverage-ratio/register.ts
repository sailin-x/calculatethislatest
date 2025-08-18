import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { DebtServiceCoverageRatioCalculator } from './DebtServiceCoverageRatioCalculator';

export function registerDebtServiceCoverageRatioCalculator(registry: CalculatorRegistry): void {
  registry.register(DebtServiceCoverageRatioCalculator);
}

export { DebtServiceCoverageRatioCalculator };
