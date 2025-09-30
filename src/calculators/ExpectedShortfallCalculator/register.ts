import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ExpectedShortfallCalculatorCalculator } from './ExpectedShortfallCalculatorCalculator';

export function registerExpectedShortfallCalculatorCalculator(): void {
  calculatorRegistry.register(new ExpectedShortfallCalculatorCalculator());
}
