import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_service_coverage_ratioCalculatorCalculator } from './debt_service_coverage_ratioCalculatorCalculator';

export function registerdebt_service_coverage_ratioCalculatorCalculator(): void {
  calculatorRegistry.register(new debt_service_coverage_ratioCalculatorCalculator());
}
