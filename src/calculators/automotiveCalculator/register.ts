import { calculatorRegistry } from '../../data/calculatorRegistry';
import { automotiveCalculator } from './automotiveCalculator';

export function registerautomotiveCalculator(): void {
  calculatorRegistry.register(new automotiveCalculator());
}
