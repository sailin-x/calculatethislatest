import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BreakevenPointCalculator } from './BreakevenPointCalculator';

export function registerBreakevenPointCalculator(): void {
  calculatorRegistry.register(BreakevenPointCalculator);
}

export { BreakevenPointCalculator };
