import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PlantSpacingCalculator } from './PlantSpacingCalculator';

export function registerPlantSpacingCalculator(): void {
  calculatorRegistry.register(PlantSpacingCalculator);
}

export { PlantSpacingCalculator };
