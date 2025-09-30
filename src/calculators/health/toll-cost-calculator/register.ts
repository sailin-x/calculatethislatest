import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TollCostCalculator } from './TollCostCalculator';

export function registerTollCostCalculator(): void {
  calculatorRegistry.register(TollCostCalculator);
}

export { TollCostCalculator };
