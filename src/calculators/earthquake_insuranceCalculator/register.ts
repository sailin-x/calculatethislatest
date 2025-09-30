import { calculatorRegistry } from '../../data/calculatorRegistry';
import { earthquake_insuranceCalculatorCalculator } from './earthquake_insuranceCalculatorCalculator';

export function registerearthquake_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new earthquake_insuranceCalculatorCalculator());
}
