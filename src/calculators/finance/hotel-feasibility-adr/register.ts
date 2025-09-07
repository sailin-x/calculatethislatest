import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HotelFeasibilityADRCalculator } from './HotelFeasibilityADRCalculator';

export function registerHotelFeasibilityADRCalculator(registry: CalculatorRegistry): void {
  registry.register(HotelFeasibilityADRCalculator);
}

export { HotelFeasibilityADRCalculator };