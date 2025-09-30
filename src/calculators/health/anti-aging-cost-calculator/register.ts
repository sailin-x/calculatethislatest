import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AntiAgingCostCalculator } from './AntiAgingCostCalculator';

export function registerAntiAgingCostCalculator(): void {
  calculatorRegistry.register(AntiAgingCostCalculator);
}

export { AntiAgingCostCalculator };
