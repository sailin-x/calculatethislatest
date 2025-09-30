import { calculatorRegistry } from '../../data/calculatorRegistry';
import { StretchIRACalculatorCalculator } from './StretchIRACalculatorCalculator';

export function registerStretchIRACalculatorCalculator(): void {
  calculatorRegistry.register(new StretchIRACalculatorCalculator());
}
