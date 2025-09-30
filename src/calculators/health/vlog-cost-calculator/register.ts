import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VlogCostCalculator } from './VlogCostCalculator';

export function registerVlogCostCalculator(): void {
  calculatorRegistry.register(VlogCostCalculator);
}

export { VlogCostCalculator };
