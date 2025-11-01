import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StretchIRACalculator } from './StretchIRACalculator';

export function registerStretchIRACalculator(): void {
  calculatorRegistry.register(new StretchIRACalculator());
}
