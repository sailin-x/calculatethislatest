import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TreeTrimmingCostCalculator } from './TreeTrimmingCostCalculator';

export function registerTreeTrimmingCostCalculator(): void {
  calculatorRegistry.register(TreeTrimmingCostCalculator);
}

export { TreeTrimmingCostCalculator };
