import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AmusementParkCostCalculator } from './AmusementParkCostCalculator';

export function registerAmusementParkCostCalculator(): void {
  calculatorRegistry.register(AmusementParkCostCalculator);
}

export { AmusementParkCostCalculator };
