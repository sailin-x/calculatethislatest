import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bmrCalculator } from './bmrCalculator';

export function registerbmrCalculator(): void {
  calculatorRegistry.register(new bmrCalculator());
}
