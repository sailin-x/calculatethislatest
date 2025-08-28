import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ConcreteCalculator } from './ConcreteCalculator';

export function registerConcreteCalculator() {
  calculatorRegistry.register(ConcreteCalculator);
}
