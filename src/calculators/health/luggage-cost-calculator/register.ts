import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LuggageCostCalculator } from './LuggageCostCalculator';

export function registerLuggageCostCalculator(): void {
  calculatorRegistry.register(LuggageCostCalculator);
}

export { LuggageCostCalculator };
