import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ai_prompt_cost_calculatorCalculatorCalculator } from './ai_prompt_cost_calculatorCalculatorCalculator';

export function registerai_prompt_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new ai_prompt_cost_calculatorCalculatorCalculator());
}
