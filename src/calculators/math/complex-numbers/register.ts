import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { complexNumberCalculator } from './ComplexNumberCalculator';

export function registerComplexNumberCalculator() {
  calculatorRegistry.register(ComplexNumberCalculator);
}
