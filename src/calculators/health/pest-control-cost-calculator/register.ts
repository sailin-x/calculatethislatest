import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PestControlCostCalculator } from './PestControlCostCalculator';

export function registerPestControlCostCalculator(): void {
  calculatorRegistry.register(PestControlCostCalculator);
}

export { PestControlCostCalculator };
