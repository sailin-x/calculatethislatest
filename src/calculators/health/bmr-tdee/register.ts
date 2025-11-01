import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { bmrCalculator } from './BMRCalculator';

export function registerBMRCalculator() {
  calculatorRegistry.register(BMRCalculator);
}
