import { calculatorRegistry } from '../../data/calculatorRegistry';
import { chapter_11_bankruptcy_plan_valuationCalculatorCalculator } from './chapter_11_bankruptcy_plan_valuationCalculatorCalculator';

export function registerchapter_11_bankruptcy_plan_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new chapter_11_bankruptcy_plan_valuationCalculatorCalculator());
}
