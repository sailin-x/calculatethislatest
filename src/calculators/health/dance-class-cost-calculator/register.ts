import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DanceClassCostCalculator } from './DanceClassCostCalculator';

export function registerDanceClassCostCalculator(): void {
  calculatorRegistry.register(DanceClassCostCalculator);
}

export { DanceClassCostCalculator };
