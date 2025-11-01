import { calculatorRegistry } from '../../data/calculatorRegistry';
import { complexNumberCalculator } from './complexNumberCalculator';

export function registercomplexNumberCalculator(): void {
  calculatorRegistry.register(new complexNumberCalculator());
}
