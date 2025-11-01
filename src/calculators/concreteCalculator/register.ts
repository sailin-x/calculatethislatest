import { calculatorRegistry } from '../../data/calculatorRegistry';
import { concreteCalculator } from './concreteCalculator';

export function registerconcreteCalculator(): void {
  calculatorRegistry.register(new concreteCalculator());
}
