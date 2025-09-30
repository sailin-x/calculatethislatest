import { calculatorRegistry } from '../../data/calculatorRegistry';
import { tennis_lesson_cost_calculatorCalculatorCalculator } from './tennis_lesson_cost_calculatorCalculatorCalculator';

export function registertennis_lesson_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new tennis_lesson_cost_calculatorCalculatorCalculator());
}
