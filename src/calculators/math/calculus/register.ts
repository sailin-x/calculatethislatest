import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CalculusCalculator } from './CalculusCalculator';

export function registerCalculusCalculator() {
  calculatorRegistry.register(CalculusCalculator);
}
