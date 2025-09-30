import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CarpetCleaningCostCalculator } from './CarpetCleaningCostCalculator';

export function registerCarpetCleaningCostCalculator(): void {
  calculatorRegistry.register(CarpetCleaningCostCalculator);
}

export { CarpetCleaningCostCalculator };
