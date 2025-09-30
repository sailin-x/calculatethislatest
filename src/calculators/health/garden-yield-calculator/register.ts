import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GardenYieldCalculator } from './GardenYieldCalculator';

export function registerGardenYieldCalculator(): void {
  calculatorRegistry.register(GardenYieldCalculator);
}

export { GardenYieldCalculator };
