import { calculatorRegistry } from '../../data/calculatorRegistry';
import { aiPromptCostCalculator } from './aiPromptCostCalculator';

export function registeraiPromptCostCalculator(): void {
  calculatorRegistry.register(new aiPromptCostCalculator());
}
