import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStretchIRACalculator } from './registerStretchIRACalculator';

export function registerregisterStretchIRACalculator(): void {
  calculatorRegistry.register(new registerStretchIRACalculator());
}
