import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VitaminSupplementCostCalculator } from './VitaminSupplementCostCalculator';

export function registerVitaminSupplementCostCalculator(): void {
  calculatorRegistry.register(VitaminSupplementCostCalculator);
}

export { VitaminSupplementCostCalculator };
