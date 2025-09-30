import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BarreClassCostCalculator } from './BarreClassCostCalculator';

export function registerBarreClassCostCalculator(): void {
  calculatorRegistry.register(BarreClassCostCalculator);
}

export { BarreClassCostCalculator };
