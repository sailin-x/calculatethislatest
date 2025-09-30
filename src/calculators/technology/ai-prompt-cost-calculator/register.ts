import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AiPromptCostCalculator } from './AiPromptCostCalculator';

export function registerAiPromptCostCalculator(): void {
  calculatorRegistry.register(AiPromptCostCalculator);
}

export { AiPromptCostCalculator };
