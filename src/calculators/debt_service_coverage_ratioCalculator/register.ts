import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debt_service_coverage_ratioCalculator } from './debt_service_coverage_ratioCalculator';

export function registerdebt_service_coverage_ratioCalculator(): void {
  calculatorRegistry.register(new debt_service_coverage_ratioCalculator());
}
