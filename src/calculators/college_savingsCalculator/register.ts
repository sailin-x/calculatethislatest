import { calculatorRegistry } from '../../data/calculatorRegistry';
import { college_savingsCalculatorCalculator } from './college_savingsCalculatorCalculator';

export function registercollege_savingsCalculatorCalculator(): void {
  calculatorRegistry.register(new college_savingsCalculatorCalculator());
}
