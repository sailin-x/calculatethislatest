import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSepIRACalculator } from './registerSepIRACalculator';

export function registerregisterSepIRACalculator(): void {
  calculatorRegistry.register(new registerSepIRACalculator());
}
