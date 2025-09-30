import { calculatorRegistry } from '../../data/calculatorRegistry';
import { aiPromptCostCalculatorCalculator } from './aiPromptCostCalculatorCalculator';

export function registeraiPromptCostCalculatorCalculator(): void {
  calculatorRegistry.register(new aiPromptCostCalculatorCalculator());
}
