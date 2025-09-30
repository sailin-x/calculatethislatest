import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SeedStartingCalculator } from './SeedStartingCalculator';

export function registerSeedStartingCalculator(): void {
  calculatorRegistry.register(SeedStartingCalculator);
}

export { SeedStartingCalculator };
