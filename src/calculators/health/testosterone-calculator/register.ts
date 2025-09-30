import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TestosteroneCalculator } from './TestosteroneCalculator';

export function registerTestosteroneCalculator(): void {
  calculatorRegistry.register(TestosteroneCalculator);
}

export { TestosteroneCalculator };
