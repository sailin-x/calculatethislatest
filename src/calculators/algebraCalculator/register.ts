import { calculatorRegistry } from '../../data/calculatorRegistry';
import { algebraCalculator } from './algebraCalculator';

export function registeralgebraCalculator(): void {
  calculatorRegistry.register(new algebraCalculator());
}
