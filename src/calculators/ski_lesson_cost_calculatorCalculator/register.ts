import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ski_lesson_cost_calculatorCalculatorCalculator } from './ski_lesson_cost_calculatorCalculatorCalculator';

export function registerski_lesson_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new ski_lesson_cost_calculatorCalculatorCalculator());
}
