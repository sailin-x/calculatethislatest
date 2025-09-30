import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VacationRentalCostCalculator } from './VacationRentalCostCalculator';

export function registerVacationRentalCostCalculator(): void {
  calculatorRegistry.register(VacationRentalCostCalculator);
}

export { VacationRentalCostCalculator };
