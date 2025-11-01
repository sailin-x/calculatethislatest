import { calculatorRegistry } from '../../data/calculatorRegistry';
import { earthquake_insuranceCalculator } from './earthquake_insuranceCalculator';

export function registerearthquake_insuranceCalculator(): void {
  calculatorRegistry.register(new earthquake_insuranceCalculator());
}
