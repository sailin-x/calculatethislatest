import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BreakevenPointCalculator } from './BreakevenPointCalculator';

export function registerBreakevenPointCalculator() {
  calculatorRegistry.register(BreakevenPointCalculator);
}
