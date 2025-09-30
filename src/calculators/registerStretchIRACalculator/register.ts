import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerStretchIRACalculatorCalculator } from './registerStretchIRACalculatorCalculator';

export function registerregisterStretchIRACalculatorCalculator(): void {
  calculatorRegistry.register(new registerStretchIRACalculatorCalculator());
}
