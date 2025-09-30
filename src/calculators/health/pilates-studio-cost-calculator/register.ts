import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PilatesStudioCostCalculator } from './PilatesStudioCostCalculator';

export function registerPilatesStudioCostCalculator(): void {
  calculatorRegistry.register(PilatesStudioCostCalculator);
}

export { PilatesStudioCostCalculator };
