import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ConcreteCalculator } from './ConcreteCalculator';

export function registerConcreteCalculator(): void {
  calculatorRegistry.register(ConcreteCalculator);
}

export { ConcreteCalculator };
