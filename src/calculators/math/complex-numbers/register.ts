import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ComplexNumberCalculator } from './ComplexNumberCalculator';

export function registerComplexNumberCalculator() {
  calculatorRegistry.register(ComplexNumberCalculator);
}
