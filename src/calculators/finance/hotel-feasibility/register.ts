import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HotelFeasibilityCalculator } from './HotelFeasibilityCalculator';

export function registerHotelFeasibilityCalculator(registry: CalculatorRegistry): void {
  registry.register(HotelFeasibilityCalculator);
}

export { HotelFeasibilityCalculator };
