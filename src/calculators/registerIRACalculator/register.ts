import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerIRACalculator } from './registerIRACalculator';

export function registerregisterIRACalculator(): void {
  calculatorRegistry.register(new registerIRACalculator());
}
