import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ComplexNumberCalculator } from './ComplexNumberCalculator';

export function registerComplexNumberCalculator(): void {
  calculatorRegistry.register(ComplexNumberCalculator);
}

export { ComplexNumberCalculator };
