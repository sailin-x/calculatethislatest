import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BMRCalculator } from './BMRCalculator';

export function registerBMRCalculator() {
  calculatorRegistry.register(BMRCalculator);
}
