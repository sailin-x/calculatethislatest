import { calculatorRegistry } from '../../data/calculatorRegistry';
import { renters_insuranceCalculator } from './renters_insuranceCalculator';

export function registerrenters_insuranceCalculator(): void {
  calculatorRegistry.register(new renters_insuranceCalculator());
}
