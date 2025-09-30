import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ParkingCostCalculator } from './ParkingCostCalculator';

export function registerParkingCostCalculator(): void {
  calculatorRegistry.register(ParkingCostCalculator);
}

export { ParkingCostCalculator };
