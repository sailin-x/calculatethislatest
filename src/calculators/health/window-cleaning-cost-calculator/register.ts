import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WindowCleaningCostCalculator } from './WindowCleaningCostCalculator';

export function registerWindowCleaningCostCalculator(): void {
  calculatorRegistry.register(WindowCleaningCostCalculator);
}

export { WindowCleaningCostCalculator };
