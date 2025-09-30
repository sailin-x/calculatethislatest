import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HotelCostCalculator } from './HotelCostCalculator';

export function registerHotelCostCalculator(): void {
  calculatorRegistry.register(HotelCostCalculator);
}

export { HotelCostCalculator };
