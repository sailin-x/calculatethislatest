import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerExpectedShortfallCalculator } from './registerExpectedShortfallCalculator';

export function registerregisterExpectedShortfallCalculator(): void {
  calculatorRegistry.register(new registerExpectedShortfallCalculator());
}
