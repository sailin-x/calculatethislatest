import { calculatorRegistry } from '../../data/calculatorRegistry';
import { calculusCalculatorCalculator } from './calculusCalculatorCalculator';

export function registercalculusCalculatorCalculator(): void {
  calculatorRegistry.register(new calculusCalculatorCalculator());
}
