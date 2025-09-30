import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ai_prompt_costCalculatorCalculator } from './ai_prompt_costCalculatorCalculator';

export function registerai_prompt_costCalculatorCalculator(): void {
  calculatorRegistry.register(new ai_prompt_costCalculatorCalculator());
}
