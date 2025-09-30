import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CarRentalCostCalculator } from './CarRentalCostCalculator';

export function registerCarRentalCostCalculator(): void {
  calculatorRegistry.register(CarRentalCostCalculator);
}

export { CarRentalCostCalculator };
