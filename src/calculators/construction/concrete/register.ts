import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { concreteCalculator } from './ConcreteCalculator';

export function registerConcreteCalculator() {
  calculatorRegistry.register(ConcreteCalculator);
}
