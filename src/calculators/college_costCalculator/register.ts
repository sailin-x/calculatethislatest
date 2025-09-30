import { calculatorRegistry } from '../../data/calculatorRegistry';
import { college_costCalculatorCalculator } from './college_costCalculatorCalculator';

export function registercollege_costCalculatorCalculator(): void {
  calculatorRegistry.register(new college_costCalculatorCalculator());
}
