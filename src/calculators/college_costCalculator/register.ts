import { calculatorRegistry } from '../../data/calculatorRegistry';
import { college_costCalculator } from './college_costCalculator';

export function registercollege_costCalculator(): void {
  calculatorRegistry.register(new college_costCalculator());
}
