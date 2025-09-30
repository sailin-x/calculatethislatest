import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NationalParkCostCalculator } from './NationalParkCostCalculator';

export function registerNationalParkCostCalculator(): void {
  calculatorRegistry.register(NationalParkCostCalculator);
}

export { NationalParkCostCalculator };
