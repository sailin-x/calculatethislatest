import { calculatorRegistry } from '../../data/calculatorRegistry';
import { algebraCalculatorCalculator } from './algebraCalculatorCalculator';

export function registeralgebraCalculatorCalculator(): void {
  calculatorRegistry.register(new algebraCalculatorCalculator());
}
