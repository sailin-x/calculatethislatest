import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSimpleIRACalculator } from './registerSimpleIRACalculator';

export function registerregisterSimpleIRACalculator(): void {
  calculatorRegistry.register(new registerSimpleIRACalculator());
}
