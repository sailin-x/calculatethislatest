import { calculatorRegistry } from '../../data/calculatorRegistry';
import { college_savingsCalculator } from './college_savingsCalculator';

export function registercollege_savingsCalculator(): void {
  calculatorRegistry.register(new college_savingsCalculator());
}
