import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { calculusCalculator } from './CalculusCalculator';

export function registerCalculusCalculator() {
  calculatorRegistry.register(CalculusCalculator);
}
