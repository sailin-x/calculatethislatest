import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SkydivingCostCalculator } from './SkydivingCostCalculator';

export function registerSkydivingCostCalculator(): void {
  calculatorRegistry.register(SkydivingCostCalculator);
}

export { SkydivingCostCalculator };
