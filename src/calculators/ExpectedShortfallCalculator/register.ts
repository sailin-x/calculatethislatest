import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ExpectedShortfallCalculator } from './ExpectedShortfallCalculator';

export function registerExpectedShortfallCalculator(): void {
  calculatorRegistry.register(new ExpectedShortfallCalculator());
}
