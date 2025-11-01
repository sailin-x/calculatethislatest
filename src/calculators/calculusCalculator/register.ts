import { calculatorRegistry } from '../../data/calculatorRegistry';
import { calculusCalculator } from './calculusCalculator';

export function registercalculusCalculator(): void {
  calculatorRegistry.register(new calculusCalculator());
}
