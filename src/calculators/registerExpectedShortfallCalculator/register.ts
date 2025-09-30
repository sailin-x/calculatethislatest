import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerExpectedShortfallCalculatorCalculator } from './registerExpectedShortfallCalculatorCalculator';

export function registerregisterExpectedShortfallCalculatorCalculator(): void {
  calculatorRegistry.register(new registerExpectedShortfallCalculatorCalculator());
}
