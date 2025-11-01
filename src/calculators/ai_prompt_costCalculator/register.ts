import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ai_prompt_costCalculator } from './ai_prompt_costCalculator';

export function registerai_prompt_costCalculator(): void {
  calculatorRegistry.register(new ai_prompt_costCalculator());
}
